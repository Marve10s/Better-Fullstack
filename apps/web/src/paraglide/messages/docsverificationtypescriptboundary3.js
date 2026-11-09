/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationtypescriptboundary3Inputs */



/**
* | output |
* | --- |
* | "Exercises the generated Hono process and HTTP boundary, not browser rendering." |
*
* @param {Docsverificationtypescriptboundary3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationtypescriptboundary3 = /** @type {((inputs?: Docsverificationtypescriptboundary3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationtypescriptboundary3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Prueba el proceso Hono generado y el límite HTTP, no el renderizado en el navegador.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("测试生成的 Hono 进程和 HTTP 边界，不包括浏览器渲染。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("生成された Hono プロセスと HTTP 境界をテストします。ブラウザーでのレンダリングは対象外です。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("생성된 Hono 프로세스와 HTTP 경계를 테스트하며, 브라우저 렌더링은 테스트하지 않습니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("測試產生的 Hono 程序與 HTTP 邊界，不包含瀏覽器渲染。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Testet den generierten Hono-Prozess und die HTTP-Grenze, nicht das Rendering im Browser.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Teste le processus Hono généré et la frontière HTTP, pas le rendu dans le navigateur.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Перевіряє згенерований процес Hono і межу HTTP, а не рендеринг у браузері.")
	return /** @type {LocalizedString} */ ("Exercises the generated Hono process and HTTP boundary, not browser rendering.")
});
export { docsverificationtypescriptboundary3 as "docsVerificationTypescriptBoundary" }