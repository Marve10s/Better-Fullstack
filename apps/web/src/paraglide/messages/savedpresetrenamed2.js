/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Savedpresetrenamed2Inputs */



/**
* | output |
* | --- |
* | "Preset renamed" |
*
* @param {Savedpresetrenamed2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const savedpresetrenamed2 = /** @type {((inputs?: Savedpresetrenamed2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Savedpresetrenamed2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Plantilla renombrada")
	if (locale === "zh") return /** @type {LocalizedString} */ ("预设已重命名")
	if (locale === "ja") return /** @type {LocalizedString} */ ("プリセットの名前が変更されました")
	if (locale === "ko") return /** @type {LocalizedString} */ ("사전 설정 이름이 변경됨")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("預設已重新命名")
	if (locale === "de") return /** @type {LocalizedString} */ ("Voreinstellung umbenannt")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Préréglage renommé")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Пресет перейменовано")
	return /** @type {LocalizedString} */ ("Preset renamed")
});
export { savedpresetrenamed2 as "savedPresetRenamed" }