/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderloading1Inputs */



/**
* | output |
* | --- |
* | "Loading..." |
*
* @param {Builderloading1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderloading1 = /** @type {((inputs?: Builderloading1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderloading1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Cargando...")
	if (locale === "zh") return /** @type {LocalizedString} */ ("加载中...")
	if (locale === "ja") return /** @type {LocalizedString} */ ("読み込み中...")
	if (locale === "ko") return /** @type {LocalizedString} */ ("로드 중...")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("載入中...")
	if (locale === "de") return /** @type {LocalizedString} */ ("Laden...")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Chargement...")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Завантаження...")
	return /** @type {LocalizedString} */ ("Loading...")
});
export { builderloading1 as "builderLoading" }