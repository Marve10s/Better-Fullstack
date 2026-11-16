/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarycrystalcrystalcache5Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Almacén de caché experimental de Crystal.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("实验性 Crystal 缓存存储。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("実験的な Crystal キャッシュストア。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("실험적인 Crystal 캐시 저장소입니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("實驗性 Crystal 快取儲存。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Experimenteller Crystal-Cache-Speicher.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Magasin de cache expérimental pour Crystal.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Експериментальне сховище кешу Crystal.")
	return /** @type {LocalizedString} */ ("Experimental Crystal cache store.")
});
export { docsclisummarycrystalcrystalcache5 as "docsCliSummaryCrystalCrystalCache" }