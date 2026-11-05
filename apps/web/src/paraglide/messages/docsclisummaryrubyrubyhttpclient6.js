/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryrubyrubyhttpclient6Inputs */

const en_docsclisummaryrubyrubyhttpclient6 = /** @type {(inputs: Docsclisummaryrubyrubyhttpclient6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ruby HTTP client.`)
};

const es_docsclisummaryrubyrubyhttpclient6 = /** @type {(inputs: Docsclisummaryrubyrubyhttpclient6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cliente HTTP de Ruby.`)
};

const zh_docsclisummaryrubyrubyhttpclient6 = /** @type {(inputs: Docsclisummaryrubyrubyhttpclient6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ruby HTTP 客户端。`)
};

const ja_docsclisummaryrubyrubyhttpclient6 = /** @type {(inputs: Docsclisummaryrubyrubyhttpclient6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ruby の HTTP クライアント。`)
};

const ko_docsclisummaryrubyrubyhttpclient6 = /** @type {(inputs: Docsclisummaryrubyrubyhttpclient6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ruby HTTP 클라이언트.`)
};

const zh_hant1_docsclisummaryrubyrubyhttpclient6 = /** @type {(inputs: Docsclisummaryrubyrubyhttpclient6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ruby HTTP 用戶端。`)
};

const de_docsclisummaryrubyrubyhttpclient6 = /** @type {(inputs: Docsclisummaryrubyrubyhttpclient6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ruby-HTTP-Client.`)
};

const fr_docsclisummaryrubyrubyhttpclient6 = /** @type {(inputs: Docsclisummaryrubyrubyhttpclient6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Client HTTP Ruby.`)
};

const uk_docsclisummaryrubyrubyhttpclient6 = /** @type {(inputs: Docsclisummaryrubyrubyhttpclient6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`HTTP-клієнт Ruby.`)
};

/**
* | output |
* | --- |
* | "Ruby HTTP client." |
*
* @param {Docsclisummaryrubyrubyhttpclient6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryrubyrubyhttpclient6 = /** @type {((inputs?: Docsclisummaryrubyrubyhttpclient6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryrubyrubyhttpclient6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryrubyrubyhttpclient6(inputs)
	if (locale === "zh") return zh_docsclisummaryrubyrubyhttpclient6(inputs)
	if (locale === "ja") return ja_docsclisummaryrubyrubyhttpclient6(inputs)
	if (locale === "ko") return ko_docsclisummaryrubyrubyhttpclient6(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryrubyrubyhttpclient6(inputs)
	if (locale === "de") return de_docsclisummaryrubyrubyhttpclient6(inputs)
	if (locale === "fr") return fr_docsclisummaryrubyrubyhttpclient6(inputs)
	if (locale === "uk") return uk_docsclisummaryrubyrubyhttpclient6(inputs)
	return en_docsclisummaryrubyrubyhttpclient6(inputs)
});
export { docsclisummaryrubyrubyhttpclient6 as "docsCliSummaryRubyRubyHttpClient" }