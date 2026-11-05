/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarycrystalcrystalcache5Inputs */

const en_docsclisummarycrystalcrystalcache5 = /** @type {(inputs: Docsclisummarycrystalcrystalcache5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Experimental Crystal cache store.`)
};

const es_docsclisummarycrystalcrystalcache5 = /** @type {(inputs: Docsclisummarycrystalcrystalcache5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Almacén de caché experimental de Crystal.`)
};

const zh_docsclisummarycrystalcrystalcache5 = /** @type {(inputs: Docsclisummarycrystalcrystalcache5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`实验性 Crystal 缓存存储。`)
};

const ja_docsclisummarycrystalcrystalcache5 = /** @type {(inputs: Docsclisummarycrystalcrystalcache5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`実験的な Crystal キャッシュストア。`)
};

const ko_docsclisummarycrystalcrystalcache5 = /** @type {(inputs: Docsclisummarycrystalcrystalcache5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`실험적인 Crystal 캐시 저장소입니다.`)
};

const zh_hant1_docsclisummarycrystalcrystalcache5 = /** @type {(inputs: Docsclisummarycrystalcrystalcache5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`實驗性 Crystal 快取儲存。`)
};

const de_docsclisummarycrystalcrystalcache5 = /** @type {(inputs: Docsclisummarycrystalcrystalcache5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Experimenteller Crystal-Cache-Speicher.`)
};

const fr_docsclisummarycrystalcrystalcache5 = /** @type {(inputs: Docsclisummarycrystalcrystalcache5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Magasin de cache expérimental pour Crystal.`)
};

const uk_docsclisummarycrystalcrystalcache5 = /** @type {(inputs: Docsclisummarycrystalcrystalcache5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Експериментальне сховище кешу Crystal.`)
};

/**
* | output |
* | --- |
* | "Experimental Crystal cache store." |
*
* @param {Docsclisummarycrystalcrystalcache5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarycrystalcrystalcache5 = /** @type {((inputs?: Docsclisummarycrystalcrystalcache5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarycrystalcrystalcache5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarycrystalcrystalcache5(inputs)
	if (locale === "zh") return zh_docsclisummarycrystalcrystalcache5(inputs)
	if (locale === "ja") return ja_docsclisummarycrystalcrystalcache5(inputs)
	if (locale === "ko") return ko_docsclisummarycrystalcrystalcache5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarycrystalcrystalcache5(inputs)
	if (locale === "de") return de_docsclisummarycrystalcrystalcache5(inputs)
	if (locale === "fr") return fr_docsclisummarycrystalcrystalcache5(inputs)
	if (locale === "uk") return uk_docsclisummarycrystalcrystalcache5(inputs)
	return en_docsclisummarycrystalcrystalcache5(inputs)
});
export { docsclisummarycrystalcrystalcache5 as "docsCliSummaryCrystalCrystalCache" }