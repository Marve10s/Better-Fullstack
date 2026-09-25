/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docssearchjumpto3Inputs */

const en_docssearchjumpto3 = /** @type {(inputs: Docssearchjumpto3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Jump to`)
};

const es_docssearchjumpto3 = /** @type {(inputs: Docssearchjumpto3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ir a`)
};

const zh_docssearchjumpto3 = /** @type {(inputs: Docssearchjumpto3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`跳转到`)
};

const ja_docssearchjumpto3 = /** @type {(inputs: Docssearchjumpto3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`移動`)
};

const ko_docssearchjumpto3 = /** @type {(inputs: Docssearchjumpto3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`이동`)
};

const zh_hant1_docssearchjumpto3 = /** @type {(inputs: Docssearchjumpto3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`跳至`)
};

const de_docssearchjumpto3 = /** @type {(inputs: Docssearchjumpto3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Springen zu`)
};

const fr_docssearchjumpto3 = /** @type {(inputs: Docssearchjumpto3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Aller à`)
};

const uk_docssearchjumpto3 = /** @type {(inputs: Docssearchjumpto3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Перейти до`)
};

/**
* | output |
* | --- |
* | "Jump to" |
*
* @param {Docssearchjumpto3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docssearchjumpto3 = /** @type {((inputs?: Docssearchjumpto3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docssearchjumpto3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docssearchjumpto3(inputs)
	if (locale === "zh") return zh_docssearchjumpto3(inputs)
	if (locale === "ja") return ja_docssearchjumpto3(inputs)
	if (locale === "ko") return ko_docssearchjumpto3(inputs)
	if (locale === "zh-Hant") return zh_hant1_docssearchjumpto3(inputs)
	if (locale === "de") return de_docssearchjumpto3(inputs)
	if (locale === "fr") return fr_docssearchjumpto3(inputs)
	if (locale === "uk") return uk_docssearchjumpto3(inputs)
	return en_docssearchjumpto3(inputs)
});
export { docssearchjumpto3 as "docsSearchJumpTo" }