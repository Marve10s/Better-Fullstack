/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docssearchactions2Inputs */

const en_docssearchactions2 = /** @type {(inputs: Docssearchactions2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Actions`)
};

const es_docssearchactions2 = /** @type {(inputs: Docssearchactions2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Acciones`)
};

const zh_docssearchactions2 = /** @type {(inputs: Docssearchactions2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`操作`)
};

const ja_docssearchactions2 = /** @type {(inputs: Docssearchactions2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`アクション`)
};

const ko_docssearchactions2 = /** @type {(inputs: Docssearchactions2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`작업`)
};

const zh_hant1_docssearchactions2 = /** @type {(inputs: Docssearchactions2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`操作`)
};

const de_docssearchactions2 = /** @type {(inputs: Docssearchactions2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Aktionen`)
};

const fr_docssearchactions2 = /** @type {(inputs: Docssearchactions2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Actions`)
};

const uk_docssearchactions2 = /** @type {(inputs: Docssearchactions2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Дії`)
};

/**
* | output |
* | --- |
* | "Actions" |
*
* @param {Docssearchactions2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docssearchactions2 = /** @type {((inputs?: Docssearchactions2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docssearchactions2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docssearchactions2(inputs)
	if (locale === "zh") return zh_docssearchactions2(inputs)
	if (locale === "ja") return ja_docssearchactions2(inputs)
	if (locale === "ko") return ko_docssearchactions2(inputs)
	if (locale === "zh-Hant") return zh_hant1_docssearchactions2(inputs)
	if (locale === "de") return de_docssearchactions2(inputs)
	if (locale === "fr") return fr_docssearchactions2(inputs)
	if (locale === "uk") return uk_docssearchactions2(inputs)
	return en_docssearchactions2(inputs)
});
export { docssearchactions2 as "docsSearchActions" }