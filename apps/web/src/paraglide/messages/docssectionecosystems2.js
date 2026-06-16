/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docssectionecosystems2Inputs */

const en_docssectionecosystems2 = /** @type {(inputs: Docssectionecosystems2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ecosystems`)
};

const es_docssectionecosystems2 = /** @type {(inputs: Docssectionecosystems2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ecosistemas`)
};

const zh_docssectionecosystems2 = /** @type {(inputs: Docssectionecosystems2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`生态系统`)
};

/**
* | output |
* | --- |
* | "Ecosystems" |
*
* @param {Docssectionecosystems2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const docssectionecosystems2 = /** @type {((inputs?: Docssectionecosystems2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docssectionecosystems2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_docssectionecosystems2(inputs)
	if (locale === "es") return es_docssectionecosystems2(inputs)
	return zh_docssectionecosystems2(inputs)
});
export { docssectionecosystems2 as "docsSectionEcosystems" }