/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpterminalexample2Inputs */

const en_mcpterminalexample2 = /** @type {(inputs: Mcpterminalexample2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Create a fullstack TypeScript app with Next.js, Hono, Drizzle, and PostgreSQL.`)
};

const es_mcpterminalexample2 = /** @type {(inputs: Mcpterminalexample2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Crea una app fullstack TypeScript con Next.js, Hono, Drizzle y PostgreSQL.`)
};

const zh_mcpterminalexample2 = /** @type {(inputs: Mcpterminalexample2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`创建一个使用 Next.js、Hono、Drizzle 和 PostgreSQL 的 fullstack TypeScript 应用。`)
};

/**
* | output |
* | --- |
* | "Create a fullstack TypeScript app with Next.js, Hono, Drizzle, and PostgreSQL." |
*
* @param {Mcpterminalexample2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const mcpterminalexample2 = /** @type {((inputs?: Mcpterminalexample2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpterminalexample2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpterminalexample2(inputs)
	if (locale === "es") return es_mcpterminalexample2(inputs)
	return zh_mcpterminalexample2(inputs)
});
export { mcpterminalexample2 as "mcpTerminalExample" }