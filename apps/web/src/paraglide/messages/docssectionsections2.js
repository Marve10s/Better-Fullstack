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

const ja_docssectionsections2 = /** @type {(inputs: Docssectionsections2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`セクション`)
};

const ko_docssectionsections2 = /** @type {(inputs: Docssectionsections2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`섹션`)
};

const zh_hant1_docssectionsections2 = /** @type {(inputs: Docssectionsections2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`功能分區`)
};

const de_docssectionsections2 = /** @type {(inputs: Docssectionsections2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Abschnitte`)
};

const fr_docssectionsections2 = /** @type {(inputs: Docssectionsections2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sections`)
};

const uk_docssectionsections2 = /** @type {(inputs: Docssectionsections2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Розділи`)
};

/**
* | output |
* | --- |
* | "Sections" |
*
* @param {Docssectionsections2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docssectionsections2 = /** @type {((inputs?: Docssectionsections2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docssectionsections2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_docssectionsections2(inputs)
	if (locale === "es") return es_docssectionsections2(inputs)
	if (locale === "zh") return zh_docssectionsections2(inputs)
	if (locale === "ja") return ja_docssectionsections2(inputs)
	if (locale === "ko") return ko_docssectionsections2(inputs)
	if (locale === "zh-Hant") return zh_hant1_docssectionsections2(inputs)
	if (locale === "de") return de_docssectionsections2(inputs)
	if (locale === "fr") return fr_docssectionsections2(inputs)
	return uk_docssectionsections2(inputs)
});
export { docssectionsections2 as "docsSectionSections" }