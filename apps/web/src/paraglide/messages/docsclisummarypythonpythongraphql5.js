/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarypythonpythongraphql5Inputs */

const en_docsclisummarypythonpythongraphql5 = /** @type {(inputs: Docsclisummarypythonpythongraphql5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python GraphQL.`)
};

const es_docsclisummarypythonpythongraphql5 = /** @type {(inputs: Docsclisummarypythonpythongraphql5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`GraphQL en Python.`)
};

const zh_docsclisummarypythonpythongraphql5 = /** @type {(inputs: Docsclisummarypythonpythongraphql5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python GraphQL。`)
};

const ja_docsclisummarypythonpythongraphql5 = /** @type {(inputs: Docsclisummarypythonpythongraphql5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python の GraphQL。`)
};

const ko_docsclisummarypythonpythongraphql5 = /** @type {(inputs: Docsclisummarypythonpythongraphql5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python GraphQL.`)
};

const zh_hant1_docsclisummarypythonpythongraphql5 = /** @type {(inputs: Docsclisummarypythonpythongraphql5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python GraphQL。`)
};

const de_docsclisummarypythonpythongraphql5 = /** @type {(inputs: Docsclisummarypythonpythongraphql5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`GraphQL für Python.`)
};

const fr_docsclisummarypythonpythongraphql5 = /** @type {(inputs: Docsclisummarypythonpythongraphql5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`GraphQL Python.`)
};

const uk_docsclisummarypythonpythongraphql5 = /** @type {(inputs: Docsclisummarypythonpythongraphql5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`GraphQL для Python.`)
};

/**
* | output |
* | --- |
* | "Python GraphQL." |
*
* @param {Docsclisummarypythonpythongraphql5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarypythonpythongraphql5 = /** @type {((inputs?: Docsclisummarypythonpythongraphql5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarypythonpythongraphql5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarypythonpythongraphql5(inputs)
	if (locale === "zh") return zh_docsclisummarypythonpythongraphql5(inputs)
	if (locale === "ja") return ja_docsclisummarypythonpythongraphql5(inputs)
	if (locale === "ko") return ko_docsclisummarypythonpythongraphql5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarypythonpythongraphql5(inputs)
	if (locale === "de") return de_docsclisummarypythonpythongraphql5(inputs)
	if (locale === "fr") return fr_docsclisummarypythonpythongraphql5(inputs)
	if (locale === "uk") return uk_docsclisummarypythonpythongraphql5(inputs)
	return en_docsclisummarypythonpythongraphql5(inputs)
});
export { docsclisummarypythonpythongraphql5 as "docsCliSummaryPythonPythonGraphql" }