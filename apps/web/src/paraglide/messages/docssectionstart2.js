/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docssectionstart2Inputs */

const en_docssectionstart2 = /** @type {(inputs: Docssectionstart2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Start`)
};

const es_docssectionstart2 = /** @type {(inputs: Docssectionstart2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Empezar`)
};

const zh_docssectionstart2 = /** @type {(inputs: Docssectionstart2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`开始`)
};

const ja_docssectionstart2 = /** @type {(inputs: Docssectionstart2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`はじめる`)
};

const ko_docssectionstart2 = /** @type {(inputs: Docssectionstart2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`시작`)
};

const zh_hant1_docssectionstart2 = /** @type {(inputs: Docssectionstart2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`開始`)
};

const de_docssectionstart2 = /** @type {(inputs: Docssectionstart2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Start`)
};

const fr_docssectionstart2 = /** @type {(inputs: Docssectionstart2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Démarrer`)
};

const uk_docssectionstart2 = /** @type {(inputs: Docssectionstart2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Початок`)
};

/**
* | output |
* | --- |
* | "Start" |
*
* @param {Docssectionstart2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docssectionstart2 = /** @type {((inputs?: Docssectionstart2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docssectionstart2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docssectionstart2(inputs)
	if (locale === "zh") return zh_docssectionstart2(inputs)
	if (locale === "ja") return ja_docssectionstart2(inputs)
	if (locale === "ko") return ko_docssectionstart2(inputs)
	if (locale === "zh-Hant") return zh_hant1_docssectionstart2(inputs)
	if (locale === "de") return de_docssectionstart2(inputs)
	if (locale === "fr") return fr_docssectionstart2(inputs)
	if (locale === "uk") return uk_docssectionstart2(inputs)
	return en_docssectionstart2(inputs)
});
export { docssectionstart2 as "docsSectionStart" }