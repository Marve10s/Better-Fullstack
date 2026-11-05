/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryphpphphttpclient6Inputs */

const en_docsclisummaryphpphphttpclient6 = /** @type {(inputs: Docsclisummaryphpphphttpclient6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PHP HTTP client.`)
};

const es_docsclisummaryphpphphttpclient6 = /** @type {(inputs: Docsclisummaryphpphphttpclient6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cliente HTTP de PHP.`)
};

const zh_docsclisummaryphpphphttpclient6 = /** @type {(inputs: Docsclisummaryphpphphttpclient6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PHP HTTP 客户端。`)
};

const ja_docsclisummaryphpphphttpclient6 = /** @type {(inputs: Docsclisummaryphpphphttpclient6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PHP の HTTP クライアント。`)
};

const ko_docsclisummaryphpphphttpclient6 = /** @type {(inputs: Docsclisummaryphpphphttpclient6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PHP HTTP 클라이언트.`)
};

const zh_hant1_docsclisummaryphpphphttpclient6 = /** @type {(inputs: Docsclisummaryphpphphttpclient6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PHP HTTP 用戶端。`)
};

const de_docsclisummaryphpphphttpclient6 = /** @type {(inputs: Docsclisummaryphpphphttpclient6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PHP-HTTP-Client.`)
};

const fr_docsclisummaryphpphphttpclient6 = /** @type {(inputs: Docsclisummaryphpphphttpclient6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Client HTTP PHP.`)
};

const uk_docsclisummaryphpphphttpclient6 = /** @type {(inputs: Docsclisummaryphpphphttpclient6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`HTTP-клієнт PHP.`)
};

/**
* | output |
* | --- |
* | "PHP HTTP client." |
*
* @param {Docsclisummaryphpphphttpclient6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryphpphphttpclient6 = /** @type {((inputs?: Docsclisummaryphpphphttpclient6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryphpphphttpclient6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryphpphphttpclient6(inputs)
	if (locale === "zh") return zh_docsclisummaryphpphphttpclient6(inputs)
	if (locale === "ja") return ja_docsclisummaryphpphphttpclient6(inputs)
	if (locale === "ko") return ko_docsclisummaryphpphphttpclient6(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryphpphphttpclient6(inputs)
	if (locale === "de") return de_docsclisummaryphpphphttpclient6(inputs)
	if (locale === "fr") return fr_docsclisummaryphpphphttpclient6(inputs)
	if (locale === "uk") return uk_docsclisummaryphpphphttpclient6(inputs)
	return en_docsclisummaryphpphphttpclient6(inputs)
});
export { docsclisummaryphpphphttpclient6 as "docsCliSummaryPhpPhpHttpClient" }