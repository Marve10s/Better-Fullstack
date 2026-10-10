/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarypythonpythonmedia5Inputs */

const en_docsclisummarypythonpythonmedia5 = /** @type {(inputs: Docsclisummarypythonpythonmedia5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python media library.`)
};

const es_docsclisummarypythonpythonmedia5 = /** @type {(inputs: Docsclisummarypythonpythonmedia5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Biblioteca multimedia Python.`)
};

const zh_docsclisummarypythonpythonmedia5 = /** @type {(inputs: Docsclisummarypythonpythonmedia5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python 媒体库。`)
};

const ja_docsclisummarypythonpythonmedia5 = /** @type {(inputs: Docsclisummarypythonpythonmedia5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python のメディアライブラリ。`)
};

const ko_docsclisummarypythonpythonmedia5 = /** @type {(inputs: Docsclisummarypythonpythonmedia5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python 미디어 라이브러리.`)
};

const zh_hant1_docsclisummarypythonpythonmedia5 = /** @type {(inputs: Docsclisummarypythonpythonmedia5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python 媒體函式庫。`)
};

const de_docsclisummarypythonpythonmedia5 = /** @type {(inputs: Docsclisummarypythonpythonmedia5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Medienbibliothek für Python.`)
};

const fr_docsclisummarypythonpythonmedia5 = /** @type {(inputs: Docsclisummarypythonpythonmedia5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bibliothèque multimédia Python.`)
};

const uk_docsclisummarypythonpythonmedia5 = /** @type {(inputs: Docsclisummarypythonpythonmedia5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Медіабібліотека Python.`)
};

/**
* | output |
* | --- |
* | "Python media library." |
*
* @param {Docsclisummarypythonpythonmedia5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarypythonpythonmedia5 = /** @type {((inputs?: Docsclisummarypythonpythonmedia5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarypythonpythonmedia5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarypythonpythonmedia5(inputs)
	if (locale === "zh") return zh_docsclisummarypythonpythonmedia5(inputs)
	if (locale === "ja") return ja_docsclisummarypythonpythonmedia5(inputs)
	if (locale === "ko") return ko_docsclisummarypythonpythonmedia5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarypythonpythonmedia5(inputs)
	if (locale === "de") return de_docsclisummarypythonpythonmedia5(inputs)
	if (locale === "fr") return fr_docsclisummarypythonpythonmedia5(inputs)
	if (locale === "uk") return uk_docsclisummarypythonpythonmedia5(inputs)
	return en_docsclisummarypythonpythonmedia5(inputs)
});
export { docsclisummarypythonpythonmedia5 as "docsCliSummaryPythonPythonMedia" }