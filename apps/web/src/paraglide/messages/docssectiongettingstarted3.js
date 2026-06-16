/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docssectiongettingstarted3Inputs */

const en_docssectiongettingstarted3 = /** @type {(inputs: Docssectiongettingstarted3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Getting Started`)
};

const es_docssectiongettingstarted3 = /** @type {(inputs: Docssectiongettingstarted3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Primeros pasos`)
};

const zh_docssectiongettingstarted3 = /** @type {(inputs: Docssectiongettingstarted3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`入门`)
};

/**
* | output |
* | --- |
* | "Getting Started" |
*
* @param {Docssectiongettingstarted3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const docssectiongettingstarted3 = /** @type {((inputs?: Docssectiongettingstarted3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docssectiongettingstarted3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_docssectiongettingstarted3(inputs)
	if (locale === "es") return es_docssectiongettingstarted3(inputs)
	return zh_docssectiongettingstarted3(inputs)
});
export { docssectiongettingstarted3 as "docsSectionGettingStarted" }