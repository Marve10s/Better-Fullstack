/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docssectionsections2Inputs */

const en_docssectionsections2 = /** @type {(inputs: Docssectionsections2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sections`)
};

const es_docssectionsections2 = /** @type {(inputs: Docssectionsections2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Secciones`)
};

const zh_docssectionsections2 = /** @type {(inputs: Docssectionsections2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`功能分区`)
};

/**
* | output |
* | --- |
* | "Sections" |
*
* @param {Docssectionsections2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const docssectionsections2 = /** @type {((inputs?: Docssectionsections2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docssectionsections2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_docssectionsections2(inputs)
	if (locale === "es") return es_docssectionsections2(inputs)
	return zh_docssectionsections2(inputs)
});
export { docssectionsections2 as "docsSectionSections" }