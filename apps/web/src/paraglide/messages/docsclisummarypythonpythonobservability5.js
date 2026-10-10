/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarypythonpythonobservability5Inputs */

const en_docsclisummarypythonpythonobservability5 = /** @type {(inputs: Docsclisummarypythonpythonobservability5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python observability.`)
};

const es_docsclisummarypythonpythonobservability5 = /** @type {(inputs: Docsclisummarypythonpythonobservability5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Observabilidad en Python.`)
};

const zh_docsclisummarypythonpythonobservability5 = /** @type {(inputs: Docsclisummarypythonpythonobservability5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python 可观测性。`)
};

const ja_docsclisummarypythonpythonobservability5 = /** @type {(inputs: Docsclisummarypythonpythonobservability5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python のオブザーバビリティ。`)
};

const ko_docsclisummarypythonpythonobservability5 = /** @type {(inputs: Docsclisummarypythonpythonobservability5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python 관측성.`)
};

const zh_hant1_docsclisummarypythonpythonobservability5 = /** @type {(inputs: Docsclisummarypythonpythonobservability5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python 可觀測性。`)
};

const de_docsclisummarypythonpythonobservability5 = /** @type {(inputs: Docsclisummarypythonpythonobservability5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Observability für Python.`)
};

const fr_docsclisummarypythonpythonobservability5 = /** @type {(inputs: Docsclisummarypythonpythonobservability5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Observabilité Python.`)
};

const uk_docsclisummarypythonpythonobservability5 = /** @type {(inputs: Docsclisummarypythonpythonobservability5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Спостережуваність у Python.`)
};

/**
* | output |
* | --- |
* | "Python observability." |
*
* @param {Docsclisummarypythonpythonobservability5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarypythonpythonobservability5 = /** @type {((inputs?: Docsclisummarypythonpythonobservability5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarypythonpythonobservability5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarypythonpythonobservability5(inputs)
	if (locale === "zh") return zh_docsclisummarypythonpythonobservability5(inputs)
	if (locale === "ja") return ja_docsclisummarypythonpythonobservability5(inputs)
	if (locale === "ko") return ko_docsclisummarypythonpythonobservability5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarypythonpythonobservability5(inputs)
	if (locale === "de") return de_docsclisummarypythonpythonobservability5(inputs)
	if (locale === "fr") return fr_docsclisummarypythonpythonobservability5(inputs)
	if (locale === "uk") return uk_docsclisummarypythonpythonobservability5(inputs)
	return en_docsclisummarypythonpythonobservability5(inputs)
});
export { docsclisummarypythonpythonobservability5 as "docsCliSummaryPythonPythonObservability" }