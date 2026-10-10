/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarypythonpythonwebframework6Inputs */

const en_docsclisummarypythonpythonwebframework6 = /** @type {(inputs: Docsclisummarypythonpythonwebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python web framework.`)
};

const es_docsclisummarypythonpythonwebframework6 = /** @type {(inputs: Docsclisummarypythonpythonwebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Framework web Python.`)
};

const zh_docsclisummarypythonpythonwebframework6 = /** @type {(inputs: Docsclisummarypythonpythonwebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python Web 框架。`)
};

const ja_docsclisummarypythonpythonwebframework6 = /** @type {(inputs: Docsclisummarypythonpythonwebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python の Web フレームワーク。`)
};

const ko_docsclisummarypythonpythonwebframework6 = /** @type {(inputs: Docsclisummarypythonpythonwebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python 웹 프레임워크.`)
};

const zh_hant1_docsclisummarypythonpythonwebframework6 = /** @type {(inputs: Docsclisummarypythonpythonwebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python Web 框架。`)
};

const de_docsclisummarypythonpythonwebframework6 = /** @type {(inputs: Docsclisummarypythonpythonwebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Web-Framework für Python.`)
};

const fr_docsclisummarypythonpythonwebframework6 = /** @type {(inputs: Docsclisummarypythonpythonwebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Framework web Python.`)
};

const uk_docsclisummarypythonpythonwebframework6 = /** @type {(inputs: Docsclisummarypythonpythonwebframework6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Вебфреймворк Python.`)
};

/**
* | output |
* | --- |
* | "Python web framework." |
*
* @param {Docsclisummarypythonpythonwebframework6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarypythonpythonwebframework6 = /** @type {((inputs?: Docsclisummarypythonpythonwebframework6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarypythonpythonwebframework6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarypythonpythonwebframework6(inputs)
	if (locale === "zh") return zh_docsclisummarypythonpythonwebframework6(inputs)
	if (locale === "ja") return ja_docsclisummarypythonpythonwebframework6(inputs)
	if (locale === "ko") return ko_docsclisummarypythonpythonwebframework6(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarypythonpythonwebframework6(inputs)
	if (locale === "de") return de_docsclisummarypythonpythonwebframework6(inputs)
	if (locale === "fr") return fr_docsclisummarypythonpythonwebframework6(inputs)
	if (locale === "uk") return uk_docsclisummarypythonpythonwebframework6(inputs)
	return en_docsclisummarypythonpythonwebframework6(inputs)
});
export { docsclisummarypythonpythonwebframework6 as "docsCliSummaryPythonPythonWebFramework" }