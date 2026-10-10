/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarypythonpythoncli5Inputs */

const en_docsclisummarypythonpythoncli5 = /** @type {(inputs: Docsclisummarypythonpythoncli5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python CLI tooling.`)
};

const es_docsclisummarypythonpythoncli5 = /** @type {(inputs: Docsclisummarypythonpythoncli5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Herramientas CLI Python.`)
};

const zh_docsclisummarypythonpythoncli5 = /** @type {(inputs: Docsclisummarypythonpythoncli5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python CLI 工具。`)
};

const ja_docsclisummarypythonpythoncli5 = /** @type {(inputs: Docsclisummarypythonpythoncli5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python の CLI ツール。`)
};

const ko_docsclisummarypythonpythoncli5 = /** @type {(inputs: Docsclisummarypythonpythoncli5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python CLI 도구.`)
};

const zh_hant1_docsclisummarypythonpythoncli5 = /** @type {(inputs: Docsclisummarypythonpythoncli5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python CLI 工具。`)
};

const de_docsclisummarypythonpythoncli5 = /** @type {(inputs: Docsclisummarypythonpythoncli5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`CLI-Werkzeuge für Python.`)
};

const fr_docsclisummarypythonpythoncli5 = /** @type {(inputs: Docsclisummarypythonpythoncli5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Outils CLI Python.`)
};

const uk_docsclisummarypythonpythoncli5 = /** @type {(inputs: Docsclisummarypythonpythoncli5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Інструменти CLI для Python.`)
};

/**
* | output |
* | --- |
* | "Python CLI tooling." |
*
* @param {Docsclisummarypythonpythoncli5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarypythonpythoncli5 = /** @type {((inputs?: Docsclisummarypythonpythoncli5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarypythonpythoncli5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarypythonpythoncli5(inputs)
	if (locale === "zh") return zh_docsclisummarypythonpythoncli5(inputs)
	if (locale === "ja") return ja_docsclisummarypythonpythoncli5(inputs)
	if (locale === "ko") return ko_docsclisummarypythonpythoncli5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarypythonpythoncli5(inputs)
	if (locale === "de") return de_docsclisummarypythonpythoncli5(inputs)
	if (locale === "fr") return fr_docsclisummarypythonpythoncli5(inputs)
	if (locale === "uk") return uk_docsclisummarypythonpythoncli5(inputs)
	return en_docsclisummarypythonpythoncli5(inputs)
});
export { docsclisummarypythonpythoncli5 as "docsCliSummaryPythonPythonCli" }