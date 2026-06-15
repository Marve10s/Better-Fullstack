/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Llmmostefficient2Inputs */

const en_llmmostefficient2 = /** @type {(inputs: Llmmostefficient2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`most efficient ↗`)
};

const es_llmmostefficient2 = /** @type {(inputs: Llmmostefficient2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`más eficiente ↗`)
};

const zh_llmmostefficient2 = /** @type {(inputs: Llmmostefficient2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最高效 ↗`)
};

/**
* | output |
* | --- |
* | "most efficient ↗" |
*
* @param {Llmmostefficient2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const llmmostefficient2 = /** @type {((inputs?: Llmmostefficient2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Llmmostefficient2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_llmmostefficient2(inputs)
	if (locale === "es") return es_llmmostefficient2(inputs)
	return zh_llmmostefficient2(inputs)
});
export { llmmostefficient2 as "llmMostEfficient" }