/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Savedpresetfallback2Inputs */



/**
* | output |
* | --- |
* | "Saved preset" |
*
* @param {Savedpresetfallback2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const savedpresetfallback2 = /** @type {((inputs?: Savedpresetfallback2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Savedpresetfallback2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Plantilla guardada")
	if (locale === "zh") return /** @type {LocalizedString} */ ("已保存预设")
	if (locale === "ja") return /** @type {LocalizedString} */ ("保存されたプリセット")
	if (locale === "ko") return /** @type {LocalizedString} */ ("저장된 사전 설정")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("已儲存預設")
	if (locale === "de") return /** @type {LocalizedString} */ ("Voreinstellung gespeichert")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Préréglage enregistré")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Збережений пресет")
	return /** @type {LocalizedString} */ ("Saved preset")
});
export { savedpresetfallback2 as "savedPresetFallback" }