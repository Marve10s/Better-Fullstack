/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpreaddocs2Inputs */

const en_mcpreaddocs2 = /** @type {(inputs: Mcpreaddocs2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Read MCP docs`)
};

const es_mcpreaddocs2 = /** @type {(inputs: Mcpreaddocs2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Leer docs MCP`)
};

const zh_mcpreaddocs2 = /** @type {(inputs: Mcpreaddocs2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`阅读 MCP 文档`)
};

/**
* | output |
* | --- |
* | "Read MCP docs" |
*
* @param {Mcpreaddocs2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const mcpreaddocs2 = /** @type {((inputs?: Mcpreaddocs2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpreaddocs2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpreaddocs2(inputs)
	if (locale === "es") return es_mcpreaddocs2(inputs)
	return zh_mcpreaddocs2(inputs)
});
export { mcpreaddocs2 as "mcpReadDocs" }