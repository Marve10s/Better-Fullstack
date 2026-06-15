/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Llmallsupportedclients3Inputs */

const en_llmallsupportedclients3 = /** @type {(inputs: Llmallsupportedclients3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`all supported clients`)
};

const es_llmallsupportedclients3 = /** @type {(inputs: Llmallsupportedclients3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`todos los clientes soportados`)
};

const zh_llmallsupportedclients3 = /** @type {(inputs: Llmallsupportedclients3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`所有支持的客户端`)
};

/**
* | output |
* | --- |
* | "all supported clients" |
*
* @param {Llmallsupportedclients3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const llmallsupportedclients3 = /** @type {((inputs?: Llmallsupportedclients3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Llmallsupportedclients3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_llmallsupportedclients3(inputs)
	if (locale === "es") return es_llmallsupportedclients3(inputs)
	return zh_llmallsupportedclients3(inputs)
});
export { llmallsupportedclients3 as "llmAllSupportedClients" }