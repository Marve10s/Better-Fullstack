/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Comparegroupdataapis3Inputs */

const en_comparegroupdataapis3 = /** @type {(inputs: Comparegroupdataapis3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Data & APIs`)
};

const es_comparegroupdataapis3 = /** @type {(inputs: Comparegroupdataapis3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Datos y APIs`)
};

const zh_comparegroupdataapis3 = /** @type {(inputs: Comparegroupdataapis3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`数据与 API`)
};

/**
* | output |
* | --- |
* | "Data & APIs" |
*
* @param {Comparegroupdataapis3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const comparegroupdataapis3 = /** @type {((inputs?: Comparegroupdataapis3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comparegroupdataapis3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_comparegroupdataapis3(inputs)
	if (locale === "es") return es_comparegroupdataapis3(inputs)
	return zh_comparegroupdataapis3(inputs)
});
export { comparegroupdataapis3 as "compareGroupDataApis" }