/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docssectionreference2Inputs */

const en_docssectionreference2 = /** @type {(inputs: Docssectionreference2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Reference`)
};

const es_docssectionreference2 = /** @type {(inputs: Docssectionreference2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Referencia`)
};

const zh_docssectionreference2 = /** @type {(inputs: Docssectionreference2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`参考`)
};

/**
* | output |
* | --- |
* | "Reference" |
*
* @param {Docssectionreference2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const docssectionreference2 = /** @type {((inputs?: Docssectionreference2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docssectionreference2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_docssectionreference2(inputs)
	if (locale === "es") return es_docssectionreference2(inputs)
	return zh_docssectionreference2(inputs)
});
export { docssectionreference2 as "docsSectionReference" }