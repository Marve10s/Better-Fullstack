/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ name: NonNullable<unknown> }} Savedpresetloaded2Inputs */



/**
* | output |
* | --- |
* | "Loaded preset: {name}" |
*
* @param {Savedpresetloaded2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const savedpresetloaded2 = /** @type {((inputs: Savedpresetloaded2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Savedpresetloaded2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((i, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ (`Plantilla cargada: ${i?.name}`)
	if (locale === "zh") return /** @type {LocalizedString} */ (`已加载预设：${i?.name}`)
	if (locale === "ja") return /** @type {LocalizedString} */ (`ロードされたプリセット: ${i?.name}`)
	if (locale === "ko") return /** @type {LocalizedString} */ (`로드된 사전 설정: ${i?.name}`)
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ (`已載入預設：${i?.name}`)
	if (locale === "de") return /** @type {LocalizedString} */ (`Geladene Voreinstellung: ${i?.name}`)
	if (locale === "fr") return /** @type {LocalizedString} */ (`Préréglage chargé : ${i?.name}`)
	if (locale === "uk") return /** @type {LocalizedString} */ (`Пресет завантажено: ${i?.name}`)
	return /** @type {LocalizedString} */ (`Loaded preset: ${i?.name}`)
});
export { savedpresetloaded2 as "savedPresetLoaded" }