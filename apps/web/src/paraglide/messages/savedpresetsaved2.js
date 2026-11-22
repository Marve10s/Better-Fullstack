/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ name: NonNullable<unknown> }} Savedpresetsaved2Inputs */



/**
* | output |
* | --- |
* | "Saved preset: {name}" |
*
* @param {Savedpresetsaved2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const savedpresetsaved2 = /** @type {((inputs: Savedpresetsaved2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Savedpresetsaved2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((i, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ (`Plantilla guardada: ${i?.name}`)
	if (locale === "zh") return /** @type {LocalizedString} */ (`已保存预设：${i?.name}`)
	if (locale === "ja") return /** @type {LocalizedString} */ (`保存されたプリセット: ${i?.name}`)
	if (locale === "ko") return /** @type {LocalizedString} */ (`저장된 사전 설정: ${i?.name}`)
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ (`已儲存預設：${i?.name}`)
	if (locale === "de") return /** @type {LocalizedString} */ (`Gespeicherte Voreinstellung: ${i?.name}`)
	if (locale === "fr") return /** @type {LocalizedString} */ (`Préréglage enregistré : ${i?.name}`)
	if (locale === "uk") return /** @type {LocalizedString} */ (`Пресет збережено: ${i?.name}`)
	return /** @type {LocalizedString} */ (`Saved preset: ${i?.name}`)
});
export { savedpresetsaved2 as "savedPresetSaved" }