/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ name: NonNullable<unknown> }} Savedpresetupdated2Inputs */



/**
* | output |
* | --- |
* | "Updated preset: {name}" |
*
* @param {Savedpresetupdated2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const savedpresetupdated2 = /** @type {((inputs: Savedpresetupdated2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Savedpresetupdated2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((i, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ (`Plantilla actualizada: ${i?.name}`)
	if (locale === "zh") return /** @type {LocalizedString} */ (`已更新预设：${i?.name}`)
	if (locale === "ja") return /** @type {LocalizedString} */ (`更新されたプリセット: ${i?.name}`)
	if (locale === "ko") return /** @type {LocalizedString} */ (`업데이트된 사전 설정: ${i?.name}`)
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ (`已更新預設：${i?.name}`)
	if (locale === "de") return /** @type {LocalizedString} */ (`Aktualisierte Voreinstellung: ${i?.name}`)
	if (locale === "fr") return /** @type {LocalizedString} */ (`Préréglage mis à jour : ${i?.name}`)
	if (locale === "uk") return /** @type {LocalizedString} */ (`Пресет оновлено: ${i?.name}`)
	return /** @type {LocalizedString} */ (`Updated preset: ${i?.name}`)
});
export { savedpresetupdated2 as "savedPresetUpdated" }