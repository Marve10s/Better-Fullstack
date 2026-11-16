/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderupdatepreset2Inputs */



/**
* | output |
* | --- |
* | "Update Preset" |
*
* @param {Builderupdatepreset2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderupdatepreset2 = /** @type {((inputs?: Builderupdatepreset2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderupdatepreset2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Actualizar plantilla")
	if (locale === "zh") return /** @type {LocalizedString} */ ("更新预设")
	if (locale === "ja") return /** @type {LocalizedString} */ ("プリセットの更新")
	if (locale === "ko") return /** @type {LocalizedString} */ ("사전 설정 업데이트")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("更新預設")
	if (locale === "de") return /** @type {LocalizedString} */ ("Voreinstellung aktualisieren")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Mettre à jour le préréglage")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Оновити пресет")
	return /** @type {LocalizedString} */ ("Update Preset")
});
export { builderupdatepreset2 as "builderUpdatePreset" }