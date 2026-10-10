/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarypythonpythonapi5Inputs */

const en_docsclisummarypythonpythonapi5 = /** @type {(inputs: Docsclisummarypythonpythonapi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python API framework.`)
};

const es_docsclisummarypythonpythonapi5 = /** @type {(inputs: Docsclisummarypythonpythonapi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Framework API Python.`)
};

const zh_docsclisummarypythonpythonapi5 = /** @type {(inputs: Docsclisummarypythonpythonapi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python API 框架。`)
};

const ja_docsclisummarypythonpythonapi5 = /** @type {(inputs: Docsclisummarypythonpythonapi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python の API フレームワーク。`)
};

const ko_docsclisummarypythonpythonapi5 = /** @type {(inputs: Docsclisummarypythonpythonapi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python API 프레임워크.`)
};

const zh_hant1_docsclisummarypythonpythonapi5 = /** @type {(inputs: Docsclisummarypythonpythonapi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python API 框架。`)
};

const de_docsclisummarypythonpythonapi5 = /** @type {(inputs: Docsclisummarypythonpythonapi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`API-Framework für Python.`)
};

const fr_docsclisummarypythonpythonapi5 = /** @type {(inputs: Docsclisummarypythonpythonapi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Framework API Python.`)
};

const uk_docsclisummarypythonpythonapi5 = /** @type {(inputs: Docsclisummarypythonpythonapi5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`API-фреймворк Python.`)
};

/**
* | output |
* | --- |
* | "Python API framework." |
*
* @param {Docsclisummarypythonpythonapi5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarypythonpythonapi5 = /** @type {((inputs?: Docsclisummarypythonpythonapi5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarypythonpythonapi5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarypythonpythonapi5(inputs)
	if (locale === "zh") return zh_docsclisummarypythonpythonapi5(inputs)
	if (locale === "ja") return ja_docsclisummarypythonpythonapi5(inputs)
	if (locale === "ko") return ko_docsclisummarypythonpythonapi5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarypythonpythonapi5(inputs)
	if (locale === "de") return de_docsclisummarypythonpythonapi5(inputs)
	if (locale === "fr") return fr_docsclisummarypythonpythonapi5(inputs)
	if (locale === "uk") return uk_docsclisummarypythonpythonapi5(inputs)
	return en_docsclisummarypythonpythonapi5(inputs)
});
export { docsclisummarypythonpythonapi5 as "docsCliSummaryPythonPythonApi" }