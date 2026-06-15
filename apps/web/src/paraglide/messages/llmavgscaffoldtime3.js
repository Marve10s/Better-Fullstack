/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Llmavgscaffoldtime3Inputs */

const en_llmavgscaffoldtime3 = /** @type {(inputs: Llmavgscaffoldtime3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Avg scaffold time`)
};

const es_llmavgscaffoldtime3 = /** @type {(inputs: Llmavgscaffoldtime3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tiempo medio de scaffold`)
};

const zh_llmavgscaffoldtime3 = /** @type {(inputs: Llmavgscaffoldtime3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`平均 scaffold 时间`)
};

/**
* | output |
* | --- |
* | "Avg scaffold time" |
*
* @param {Llmavgscaffoldtime3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const llmavgscaffoldtime3 = /** @type {((inputs?: Llmavgscaffoldtime3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Llmavgscaffoldtime3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_llmavgscaffoldtime3(inputs)
	if (locale === "es") return es_llmavgscaffoldtime3(inputs)
	return zh_llmavgscaffoldtime3(inputs)
});
export { llmavgscaffoldtime3 as "llmAvgScaffoldTime" }