/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryrubyrubycache5Inputs */

const en_docsclisummaryrubyrubycache5 = /** @type {(inputs: Docsclisummaryrubyrubycache5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ruby cache store.`)
};

const es_docsclisummaryrubyrubycache5 = /** @type {(inputs: Docsclisummaryrubyrubycache5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Almacén de caché de Ruby.`)
};

const zh_docsclisummaryrubyrubycache5 = /** @type {(inputs: Docsclisummaryrubyrubycache5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ruby 缓存存储。`)
};

const ja_docsclisummaryrubyrubycache5 = /** @type {(inputs: Docsclisummaryrubyrubycache5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ruby のキャッシュストア。`)
};

const ko_docsclisummaryrubyrubycache5 = /** @type {(inputs: Docsclisummaryrubyrubycache5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ruby 캐시 저장소.`)
};

const zh_hant1_docsclisummaryrubyrubycache5 = /** @type {(inputs: Docsclisummaryrubyrubycache5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ruby 快取儲存。`)
};

const de_docsclisummaryrubyrubycache5 = /** @type {(inputs: Docsclisummaryrubyrubycache5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ruby-Cache-Speicher.`)
};

const fr_docsclisummaryrubyrubycache5 = /** @type {(inputs: Docsclisummaryrubyrubycache5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Stockage de cache Ruby.`)
};

const uk_docsclisummaryrubyrubycache5 = /** @type {(inputs: Docsclisummaryrubyrubycache5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Сховище кешу Ruby.`)
};

/**
* | output |
* | --- |
* | "Ruby cache store." |
*
* @param {Docsclisummaryrubyrubycache5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryrubyrubycache5 = /** @type {((inputs?: Docsclisummaryrubyrubycache5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryrubyrubycache5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryrubyrubycache5(inputs)
	if (locale === "zh") return zh_docsclisummaryrubyrubycache5(inputs)
	if (locale === "ja") return ja_docsclisummaryrubyrubycache5(inputs)
	if (locale === "ko") return ko_docsclisummaryrubyrubycache5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryrubyrubycache5(inputs)
	if (locale === "de") return de_docsclisummaryrubyrubycache5(inputs)
	if (locale === "fr") return fr_docsclisummaryrubyrubycache5(inputs)
	if (locale === "uk") return uk_docsclisummaryrubyrubycache5(inputs)
	return en_docsclisummaryrubyrubycache5(inputs)
});
export { docsclisummaryrubyrubycache5 as "docsCliSummaryRubyRubyCache" }