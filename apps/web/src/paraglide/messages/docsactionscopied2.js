/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsactionscopied2Inputs */

const en_docsactionscopied2 = /** @type {(inputs: Docsactionscopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copied`)
};

const es_docsactionscopied2 = /** @type {(inputs: Docsactionscopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copiado`)
};

const zh_docsactionscopied2 = /** @type {(inputs: Docsactionscopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已复制`)
};

const ja_docsactionscopied2 = /** @type {(inputs: Docsactionscopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`コピーしました`)
};

const ko_docsactionscopied2 = /** @type {(inputs: Docsactionscopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`복사됨`)
};

const zh_hant1_docsactionscopied2 = /** @type {(inputs: Docsactionscopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已複製`)
};

const de_docsactionscopied2 = /** @type {(inputs: Docsactionscopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Kopiert`)
};

const fr_docsactionscopied2 = /** @type {(inputs: Docsactionscopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copié`)
};

const uk_docsactionscopied2 = /** @type {(inputs: Docsactionscopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Скопійовано`)
};

/**
* | output |
* | --- |
* | "Copied" |
*
* @param {Docsactionscopied2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsactionscopied2 = /** @type {((inputs?: Docsactionscopied2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsactionscopied2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsactionscopied2(inputs)
	if (locale === "zh") return zh_docsactionscopied2(inputs)
	if (locale === "ja") return ja_docsactionscopied2(inputs)
	if (locale === "ko") return ko_docsactionscopied2(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsactionscopied2(inputs)
	if (locale === "de") return de_docsactionscopied2(inputs)
	if (locale === "fr") return fr_docsactionscopied2(inputs)
	if (locale === "uk") return uk_docsactionscopied2(inputs)
	return en_docsactionscopied2(inputs)
});
export { docsactionscopied2 as "docsActionsCopied" }