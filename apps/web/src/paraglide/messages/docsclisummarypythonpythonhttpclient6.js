/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarypythonpythonhttpclient6Inputs */

const en_docsclisummarypythonpythonhttpclient6 = /** @type {(inputs: Docsclisummarypythonpythonhttpclient6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python HTTP client.`)
};

const es_docsclisummarypythonpythonhttpclient6 = /** @type {(inputs: Docsclisummarypythonpythonhttpclient6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cliente HTTP Python.`)
};

const zh_docsclisummarypythonpythonhttpclient6 = /** @type {(inputs: Docsclisummarypythonpythonhttpclient6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python HTTP 客户端。`)
};

const ja_docsclisummarypythonpythonhttpclient6 = /** @type {(inputs: Docsclisummarypythonpythonhttpclient6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python の HTTP クライアント。`)
};

const ko_docsclisummarypythonpythonhttpclient6 = /** @type {(inputs: Docsclisummarypythonpythonhttpclient6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python HTTP 클라이언트.`)
};

const zh_hant1_docsclisummarypythonpythonhttpclient6 = /** @type {(inputs: Docsclisummarypythonpythonhttpclient6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python HTTP 用戶端。`)
};

const de_docsclisummarypythonpythonhttpclient6 = /** @type {(inputs: Docsclisummarypythonpythonhttpclient6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`HTTP-Client für Python.`)
};

const fr_docsclisummarypythonpythonhttpclient6 = /** @type {(inputs: Docsclisummarypythonpythonhttpclient6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Client HTTP Python.`)
};

const uk_docsclisummarypythonpythonhttpclient6 = /** @type {(inputs: Docsclisummarypythonpythonhttpclient6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`HTTP-клієнт Python.`)
};

/**
* | output |
* | --- |
* | "Python HTTP client." |
*
* @param {Docsclisummarypythonpythonhttpclient6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarypythonpythonhttpclient6 = /** @type {((inputs?: Docsclisummarypythonpythonhttpclient6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarypythonpythonhttpclient6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarypythonpythonhttpclient6(inputs)
	if (locale === "zh") return zh_docsclisummarypythonpythonhttpclient6(inputs)
	if (locale === "ja") return ja_docsclisummarypythonpythonhttpclient6(inputs)
	if (locale === "ko") return ko_docsclisummarypythonpythonhttpclient6(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarypythonpythonhttpclient6(inputs)
	if (locale === "de") return de_docsclisummarypythonpythonhttpclient6(inputs)
	if (locale === "fr") return fr_docsclisummarypythonpythonhttpclient6(inputs)
	if (locale === "uk") return uk_docsclisummarypythonpythonhttpclient6(inputs)
	return en_docsclisummarypythonpythonhttpclient6(inputs)
});
export { docsclisummarypythonpythonhttpclient6 as "docsCliSummaryPythonPythonHttpClient" }