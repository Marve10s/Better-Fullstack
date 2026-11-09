/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presettrackrustbackendintent4Inputs */



/**
* | output |
* | --- |
* | "Prefer systems-grade APIs" |
*
* @param {Presettrackrustbackendintent4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const presettrackrustbackendintent4 = /** @type {((inputs?: Presettrackrustbackendintent4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presettrackrustbackendintent4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Preferir APIs de nivel de sistemas")
	if (locale === "zh") return /** @type {LocalizedString} */ ("构建系统级服务")
	if (locale === "ja") return /** @type {LocalizedString} */ ("システムグレードの API を優先する")
	if (locale === "ko") return /** @type {LocalizedString} */ ("시스템 등급 APIs 선호")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("建構系統級服務")
	if (locale === "de") return /** @type {LocalizedString} */ ("Bevorzugen Sie APIs in Systemqualität")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Préférez les API de qualité système")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Обрати API системного класу")
	return /** @type {LocalizedString} */ ("Prefer systems-grade APIs")
});
export { presettrackrustbackendintent4 as "presetTrackRustBackendIntent" }