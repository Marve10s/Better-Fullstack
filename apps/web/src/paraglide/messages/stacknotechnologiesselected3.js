/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Stacknotechnologiesselected3Inputs */

const en_stacknotechnologiesselected3 = /** @type {(inputs: Stacknotechnologiesselected3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No technologies selected`)
};

const es_stacknotechnologiesselected3 = /** @type {(inputs: Stacknotechnologiesselected3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No hay tecnologías seleccionadas`)
};

const zh_stacknotechnologiesselected3 = /** @type {(inputs: Stacknotechnologiesselected3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未选择技术`)
};

/**
* | output |
* | --- |
* | "No technologies selected" |
*
* @param {Stacknotechnologiesselected3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const stacknotechnologiesselected3 = /** @type {((inputs?: Stacknotechnologiesselected3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Stacknotechnologiesselected3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_stacknotechnologiesselected3(inputs)
	if (locale === "es") return es_stacknotechnologiesselected3(inputs)
	return zh_stacknotechnologiesselected3(inputs)
});
export { stacknotechnologiesselected3 as "stackNoTechnologiesSelected" }