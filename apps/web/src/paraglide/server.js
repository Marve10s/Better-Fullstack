/* eslint-disable */

import * as runtime from "./runtime.js";

/**
 * Server middleware that handles locale-based routing and request processing.
 *
 * Configure `disableAsyncLocalStorage` when generating Paraglide with
 * `paraglideVitePlugin()` or `compile()`, not when calling
 * `paraglideMiddleware()`. Keep AsyncLocalStorage enabled by default and
 * only disable it for runtimes that lack `AsyncLocalStorage` support and
 * guarantee request isolation.
 *
 * This middleware performs several key functions:
 *
 * 1. Determines the locale for the incoming request using configured strategies
 * 2. Handles URL localization and redirects (only for document requests by default)
 * 3. Maintains locale state using AsyncLocalStorage to prevent request interference
 *
 * When URL strategy is used:
 *
 * - The locale is extracted from the URL for all request types
 * - If URL doesn't match the determined locale, redirects to localized URL (only for document requests by default)
 * - De-localizes URLs before passing to server (e.g., `/fr/about` → `/about`)
 *
 * @see https://paraglidejs.com/middleware
 *
 * @template T - The return type of the resolve function
 *
 * @param {Request} request - The incoming request object
 * @param {(args: { request: Request, locale: import("./runtime.js").Locale }) => T | Promise<T>} resolve - Function to handle the request. The callback receives:
 *   - `request`: A modified request with a delocalized URL when the URL strategy is used (e.g., `/fr/about` → `/about`).
 *      If your framework handles URL localization itself (e.g., TanStack Router's `rewrite` option), use the original
 *      request instead to avoid redirect loops.
 *   - `locale`: The determined locale for this request.
 * @param {{
 *   effectiveRequestUrl?: string | URL | ((request: Request) => string | URL),
 *   redirect?: "document" | "navigation",
 *   onRedirect?: (response: Response) => void
 * }} [options] - Options to control middleware behavior. `effectiveRequestUrl` sets the effective request URL used for route matching, URL-based locale detection, redirects, and `getUrlOrigin()`.
 *   `redirect` defaults to `"document"`, which requires `Sec-Fetch-Dest: document`.
 *   Unrecognized values keep that default behavior.
 *   `"navigation"` only redirects GET/HEAD requests, accepting either that destination
 *   or an absent destination with an explicit `Accept` header that allows `text/html`.
 * @returns {Promise<Response>}
 *
 * @example
 * ```typescript
 * // Basic usage in metaframeworks like NextJS, SvelteKit, Astro, Nuxt, etc.
 * export const handle = async ({ event, resolve }) => {
 *   return paraglideMiddleware(event.request, ({ request, locale }) => {
 *     // let the framework further resolve the request
 *     return resolve(request);
 *   });
 * };
 * ```
 *
 * @example
 * ```typescript
 * // Usage in a framework like Express JS or Hono
 * app.use(async (req, res, next) => {
 *   const result = await paraglideMiddleware(req, ({ request, locale }) => {
 *     // If a redirect happens this won't be called
 *     return next(request);
 *   });
 * });
 * ```
 *
 * @example
 * ```typescript
 * // Usage with frameworks that handle URL localization/delocalization themselves
 * //
 * // Some frameworks like TanStack Router handle URL localization and delocalization
 * // themselves via their own rewrite APIs (e.g., `rewrite.input`/`rewrite.output`).
 * //
 * // When the framework handles this, the middleware's URL delocalization is not needed.
 * // Using the modified `request` from the callback would cause a redirect loop because
 * // both the middleware and the framework would attempt to delocalize the URL.
 * //
 * // Solution: Pass the original request to the handler instead of the modified one.
 * // The middleware still handles locale detection, cookies, and AsyncLocalStorage context.
 * //
 * // ❌ WRONG - causes redirect loop when framework handles URL rewriting:
 * // paraglideMiddleware(req, ({ request }) => handler.fetch(request))
 * //
 * // ✅ CORRECT - use original request when framework handles URL localization:
 * // paraglideMiddleware(req, () => handler.fetch(req))
 *
 * import { paraglideMiddleware } from './paraglide/server.js'
 * import handler from '@tanstack/react-start/server-entry'
 *
 * export default {
 *   fetch(req: Request): Promise<Response> {
 *     // TanStack Router handles URL rewriting via deLocalizeUrl/localizeUrl
 *     // so we pass the original `req` instead of the modified `request`
 *     return paraglideMiddleware(req, () => handler.fetch(req))
 *   },
 * }
 * ```
 */
export async function paraglideMiddleware(request, resolve, options) {
    let requestAsyncLocalStorage = runtime.serverAsyncLocalStorage;
    requestAsyncLocalStorage = runtime.getServerAsyncLocalStorage();
    if (!runtime.disableAsyncLocalStorage && !requestAsyncLocalStorage) {
      const { AsyncLocalStorage } = await import("async_hooks");
      requestAsyncLocalStorage = runtime.getServerAsyncLocalStorage();
      if (!requestAsyncLocalStorage) {
        requestAsyncLocalStorage = new AsyncLocalStorage();
        runtime.overwriteServerAsyncLocalStorage(requestAsyncLocalStorage);
      }
    }
    if (!requestAsyncLocalStorage) {
      requestAsyncLocalStorage = createMockAsyncLocalStorage();
      runtime.overwriteServerAsyncLocalStorage(requestAsyncLocalStorage);
    }
    const url = resolveMiddlewareUrl(request, options?.effectiveRequestUrl);
    const origin = url.origin;
    if (runtime.isExcludedByRouteStrategy(url.href)) {
        const locale = runtime.baseLocale;
        const newRequest = cloneRequestWithFallback(request, url);
        /** @type {Set<string>} */
        const messageCalls = new Set();
        return /** @type {Response} */ (await requestAsyncLocalStorage?.run({ locale, origin, messageCalls }, () => resolve({ locale, request: newRequest })));
    }
    const strategy = runtime.getStrategyForUrl(url.href);
    const vary = getVaryFields(strategy);
    const decision = await runtime.shouldRedirect({
        request,
        effectiveRequestUrl: url,
    });
    const locale = decision.locale;
    // Custom server strategies run before built-in strategies, regardless of order.
    const hasCustomStrategy = strategy.some((strat) => strat.startsWith("custom-"));
    const urlDecidesLocale = options?.redirect === "navigation" &&
        strategy[0] === "url" &&
        !hasCustomStrategy &&
        runtime.extractLocaleFromUrl(url) !== undefined;
    const navigationVary = options?.redirect === "navigation" ? ["Accept", "Sec-Fetch-Dest"] : [];
    // if the client makes a request to a URL that doesn't match
    // the localizedUrl, redirect the client to the localized URL
    if (shouldRedirectRequest(request, options?.redirect) &&
        decision.shouldRedirect &&
        decision.redirectUrl) {
        /** @type {Record<string, string>} */
        const headers = {};
        const redirectVary = [...(urlDecidesLocale ? [] : vary), ...navigationVary];
        if (redirectVary.length > 0) {
            headers["Vary"] = redirectVary.join(", ");
        }
        const response = new Response(null, {
            status: 307,
            headers: {
                Location: decision.redirectUrl.href,
                ...headers,
            },
        });
        options?.onRedirect?.(response);
        return response;
    }
    // If the strategy includes "url", we need to de-localize the URL
    // before passing it to the server middleware.
    //
    // The middleware is responsible for mapping a localized URL to the
    // de-localized URL e.g. `/en/about` to `/about`. Otherwise,
    // the server can't render the correct page.
    let newRequest;
    if (strategy.includes("url")) {
        newRequest = cloneRequestWithFallback(request, runtime.deLocalizeUrl(url));
    }
    else {
        newRequest = cloneRequestWithFallback(request, url);
    }
    // the message functions that have been called in this request
    /** @type {Set<string>} */
    const messageCalls = new Set();
    let response = await requestAsyncLocalStorage?.run({ locale, origin, messageCalls }, () => resolve({ locale, request: newRequest }));
    if (response instanceof Response) {
        const urlIndex = strategy.indexOf("url");
        const responseVary = urlIndex !== -1 && !hasCustomStrategy && runtime.extractLocaleFromUrl(url)
            ? getVaryFields(strategy.slice(0, urlIndex))
            : [...vary];
        // Classifying navigations can change a cached 200 into a redirect.
        if ((request.method === "GET" || request.method === "HEAD") &&
            urlIndex !== -1 &&
            (!urlDecidesLocale || decision.shouldRedirect)) {
            responseVary.push(...navigationVary);
        }
        response = withVary(response, responseVary);
    }
    // Only modify HTML responses
    if (runtime.experimentalMiddlewareLocaleSplitting &&
        typeof response?.headers?.get === "function" &&
        typeof response.text === "function" &&
        !response.bodyUsed &&
        !response.body?.locked &&
        response.headers.get("Content-Type")?.includes("html")) {
        const body = await response.text();
        const messages = [];
        /** @type {Set<string>} */
        const registryFunctionNames = new Set();
        // using .values() to avoid polyfilling in older projects. else the following error is thrown
        // Type 'Set<string>' can only be iterated through when using the '--downlevelIteration' flag or with a '--target' of 'es2015' or higher.
        for (const messageCall of Array.from(messageCalls)) {
            const [id, locale] = 
            /** @type {[string, import("./runtime.js").Locale]} */ (messageCall.split(":"));
            messages.push(`${id}: ${compiledBundles[id]?.[locale]}`);
            for (const name of compiledRegistry.messages[id]?.[locale] ?? []) {
                registryFunctionNames.add(name);
            }
        }
        // The injected messages run without registry.js. Declare the registry
        // functions they call (including the ones those call) in a closure.
        let ssr = `{ ${messages.join(",")} }`;
        if (registryFunctionNames.size > 0) {
            const names = Array.from(registryFunctionNames);
            ssr = `(() => { ${names
                .map((name) => compiledRegistry.functions[name])
                .join("\n")}\nconst registry = { ${names.join(", ")} };\nreturn ${ssr} })()`;
        }
        // Prevent translated content from terminating the inline script tag.
        const escapedSsr = ssr.replace(/<\/(script)/gi, "<\\/$1");
        // Reuse the request's CSP nonce (if any) so the injected script is allowed under a strict CSP
        const nonce = response.headers
            .get("Content-Security-Policy")
            ?.match(/'nonce-([\w+/=-]+)'/)?.[1];
        const nonceAttr = nonce ? `nonce="${nonce}"` : "";
        const script = `<script ${nonceAttr}>globalThis.__paraglide = globalThis.__paraglide ?? {}; globalThis.__paraglide.ssr = ${escapedSsr}</script>`;
        // Insert the script before the closing head tag
        const newBody = body.replace("</head>", `${script}</head>`);
        // Create a new response with the modified body
        // Clone all headers except Content-Length which will be set automatically
        const newHeaders = new Headers(response.headers);
        newHeaders.delete("Content-Length"); // Let the browser calculate the correct length
        return new Response(newBody, {
            status: response.status,
            statusText: response.statusText,
            headers: newHeaders,
        });
    }
    return response;
}
/**
 * @param {string[]} strategy
 * @returns {string[]}
 */
function getVaryFields(strategy) {
    /** @type {string[]} */
    const vary = [];
    if (strategy.includes("cookie"))
        vary.push("Cookie");
    if (strategy.includes("preferredLanguage"))
        vary.push("Accept-Language");
    return vary;
}
/**
 * @param {Response} response
 * @param {string[]} vary
 * @returns {Response}
 */
function withVary(response, vary) {
    // Network errors and protocol upgrades are not ordinary HTTP responses.
    if (response.status < 200 || response.status > 599)
        return response;
    const existing = response.headers.get("Vary");
    const fields = existing?.split(",").map((field) => field.trim().toLowerCase()) ?? [];
    if (fields.includes("*"))
        return response;
    const missing = vary.filter((field) => !fields.includes(field.toLowerCase()));
    if (missing.length === 0)
        return response;
    const value = [existing, ...missing].filter(Boolean).join(", ");
    try {
        response.headers.set("Vary", value);
        return response;
    }
    catch (error) {
        if (!(error instanceof TypeError))
            throw error;
    }
    // Responses from fetch() or Response.redirect() can have immutable headers.
    try {
        // Preserve runtime-specific response state, including Workers body encoding.
        const copy = new Response(response.body, response);
        copy.headers.set("Vary", value);
        return copyResponseMetadata(copy, response);
    }
    catch {
        // Keep callback responses whose body cannot be reused.
        return response;
    }
}
/**
 * @param {Response} target
 * @param {Response} source
 * @returns {Response}
 */
function copyResponseMetadata(target, source) {
    // ResponseInit omits fetch metadata, so clones need to retain it as well.
    return Object.defineProperties(target, {
        url: { value: source.url, configurable: true },
        redirected: { value: source.redirected, configurable: true },
        type: { value: source.type, configurable: true },
        clone: {
            configurable: true,
            writable: true,
            /** @this {Response} */
            value() {
                return copyResponseMetadata(Response.prototype.clone.call(this), this);
            },
        },
    });
}
/**
 * @param {Request} request
 * @param {"document" | "navigation"} [redirect]
 * @returns {boolean}
 */
function shouldRedirectRequest(request, redirect) {
    const destination = request.headers.get("Sec-Fetch-Dest");
    if (redirect !== "navigation")
        return destination === "document";
    if (request.method !== "GET" && request.method !== "HEAD")
        return false;
    if (destination !== null)
        return destination === "document";
    let specificity = -1;
    let quality = 0;
    for (const range of splitHeaderValue(request.headers.get("Accept") ?? "", ",")) {
        const [type, ...parameters] = splitHeaderValue(range, ";").map((part) => part.trim().toLowerCase());
        const rangeSpecificity = type === "text/html"
            ? 2
            : type === "text/*"
                ? 1
                : type === "*/*"
                    ? 0
                    : -1;
        if (rangeSpecificity < 0 || rangeSpecificity < specificity)
            continue;
        const weight = parameters.find((parameter) => /^q\s*=/.test(parameter));
        const value = weight ? weight.slice(weight.indexOf("=") + 1).trim() : "1";
        const rangeQuality = /^(?:0(?:\.\d{0,3})?|1(?:\.0{0,3})?)$/.test(value)
            ? Number(value)
            : 0;
        // A specific q=0 exclusion takes precedence over an acceptable wildcard.
        quality =
            rangeSpecificity > specificity
                ? rangeQuality
                : Math.max(quality, rangeQuality);
        specificity = rangeSpecificity;
    }
    return quality > 0;
}
/**
 * @param {string} value
 * @param {string} separator
 * @returns {string[]}
 */
function splitHeaderValue(value, separator) {
    const parts = [];
    let start = 0;
    let quoted = false;
    for (let index = 0; index < value.length; index++) {
        const character = value[index];
        if (quoted && character === "\\") {
            index++;
        }
        else if (character === '"') {
            quoted = !quoted;
        }
        else if (!quoted && character === separator) {
            parts.push(value.slice(start, index));
            start = index + 1;
        }
    }
    if (quoted)
        return [];
    parts.push(value.slice(start));
    return parts;
}
/**
 * @param {Request} request
 * @param {string | URL | ((request: Request) => string | URL) | undefined} effectiveRequestUrl
 * @returns {URL}
 */
function resolveMiddlewareUrl(request, effectiveRequestUrl) {
    if (typeof effectiveRequestUrl === "function") {
        return new URL(effectiveRequestUrl(request), request.url);
    }
    if (typeof effectiveRequestUrl === "string" ||
        effectiveRequestUrl instanceof URL) {
        return new URL(effectiveRequestUrl, request.url);
    }
    return new URL(request.url);
}
/**
 * Some metaframeworks (NextJS) require a new Request object.
 * https://github.com/opral/inlang-paraglide-js/issues/411
 *
 * However, some frameworks (TanStack Start 1.143+) use custom Request
 * implementations that cannot be cloned with `new Request(request)`.
 * https://github.com/opral/paraglide-js/issues/573
 *
 * Effective request URL overrides behind proxies:
 * https://github.com/opral/paraglide-js/issues/652
 *
 * @param {Request} request
 * @param {string | URL} [url]
 * @returns {Request}
 */
function cloneRequestWithFallback(request, url = request.url) {
    const targetUrl = typeof url === "string" ? url : url.href;
    if (targetUrl === request.url) {
        try {
            // Clone first so building a new Request does not consume the original body stream.
            return new Request(request.clone());
        }
        catch {
            try {
                return new Request(request);
            }
            catch {
                return request;
            }
        }
    }
    try {
        // Clone first so building a new Request does not consume the original body stream.
        return new Request(targetUrl, request.clone());
    }
    catch {
        try {
            return new Request(targetUrl, request);
        }
        catch {
            return request;
        }
    }
}
/**
 * Creates a mock AsyncLocalStorage implementation for environments where
 * native AsyncLocalStorage is not available or disabled.
 *
 * This mock implementation mimics the behavior of the native AsyncLocalStorage
 * but doesn't require the async_hooks module. It's used as a fallback when
 * the runtime does not expose AsyncLocalStorage or when it has been disabled.
 *
 * @returns {import("./runtime.js").ParaglideAsyncLocalStorage}
 */
function createMockAsyncLocalStorage() {
    /** @type {any} */
    let currentStore = undefined;
    return {
        getStore() {
            return currentStore;
        },
        async run(store, callback) {
            currentStore = store;
            try {
                return await callback();
            }
            finally {
                currentStore = undefined;
            }
        },
    };
}
// Used in generated server.js when async local storage is disabled.
void createMockAsyncLocalStorage;
/**
 * The compiled messages for the server middleware.
 *
 * Only populated if `enableMiddlewareOptimizations` is set to `true`.
 *
 * @type {Record<string, Record<import("./runtime.js").Locale, string>>}
 */
const compiledBundles = {};
/**
 * The registry functions the compiled messages call, for the injected
 * messages that run without registry.js.
 *
 * `messages[id][locale]` lists the registry functions a message calls,
 * including the ones those call. `functions[name]` is the code of a registry
 * function.
 *
 * Only populated if `enableMiddlewareOptimizations` is set to `true`.
 *
 * @type {{ functions: Record<string, string>, messages: Record<string, Record<string, string[]>> }}
 */
const compiledRegistry = { functions: {}, messages: {} };
