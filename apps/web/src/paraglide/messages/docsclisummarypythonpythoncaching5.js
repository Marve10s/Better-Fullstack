/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarypythonpythoncaching5Inputs */

const en_docsclisummarypythonpythoncaching5 = /** @type {(inputs: Docsclisummarypythonpythoncaching5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python caching.`)
};

const es_docsclisummarypythonpythoncaching5 = /** @type {(inputs: Docsclisummarypythonpythoncaching5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Caché en Python.`)
};

const zh_docsclisummarypythonpythoncaching5 = /** @type {(inputs: Docsclisummarypythonpythoncaching5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python 缓存。`)
};

const ja_docsclisummarypythonpythoncaching5 = /** @type {(inputs: Docsclisummarypythonpythoncaching5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python のキャッシュ。`)
};

const ko_docsclisummarypythonpythoncaching5 = /** @type {(inputs: Docsclisummarypythonpythoncaching5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python 캐싱.`)
};

const zh_hant1_docsclisummarypythonpythoncaching5 = /** @type {(inputs: Docsclisummarypythonpythoncaching5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python 快取。`)
};

const de_docsclisummarypythonpythoncaching5 = /** @type {(inputs: Docsclisummarypythonpythoncaching5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Caching für Python.`)
};

const fr_docsclisummarypythonpythoncaching5 = /** @type {(inputs: Docsclisummarypythonpythoncaching5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Mise en cache Python.`)
};

const uk_docsclisummarypythonpythoncaching5 = /** @type {(inputs: Docsclisummarypythonpythoncaching5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Кешування в Python.`)
};

/**
* | output |
* | --- |
* | "Python caching." |
*
* @param {Docsclisummarypythonpythoncaching5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarypythonpythoncaching5 = /** @type {((inputs?: Docsclisummarypythonpythoncaching5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarypythonpythoncaching5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarypythonpythoncaching5(inputs)
	if (locale === "zh") return zh_docsclisummarypythonpythoncaching5(inputs)
	if (locale === "ja") return ja_docsclisummarypythonpythoncaching5(inputs)
	if (locale === "ko") return ko_docsclisummarypythonpythoncaching5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarypythonpythoncaching5(inputs)
	if (locale === "de") return de_docsclisummarypythonpythoncaching5(inputs)
	if (locale === "fr") return fr_docsclisummarypythonpythoncaching5(inputs)
	if (locale === "uk") return uk_docsclisummarypythonpythoncaching5(inputs)
	return en_docsclisummarypythonpythoncaching5(inputs)
});
export { docsclisummarypythonpythoncaching5 as "docsCliSummaryPythonPythonCaching" }