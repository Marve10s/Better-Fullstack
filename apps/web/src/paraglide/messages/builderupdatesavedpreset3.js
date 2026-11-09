/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderupdatesavedpreset3Inputs */



/**
* | output |
* | --- |
* | "Update Saved Preset" |
*
* @param {Builderupdatesavedpreset3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderupdatesavedpreset3 = /** @type {((inputs?: Builderupdatesavedpreset3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderupdatesavedpreset3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Actualizar plantilla guardada")
	if (locale === "zh") return /** @type {LocalizedString} */ ("更新已保存预设")
	if (locale === "ja") return /** @type {LocalizedString} */ ("保存されたプリセットを更新する")
	if (locale === "ko") return /** @type {LocalizedString} */ ("저장된 사전 설정 업데이트")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("更新已儲存預設")
	if (locale === "de") return /** @type {LocalizedString} */ ("Gespeicherte Voreinstellung aktualisieren")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Mettre à jour le préréglage enregistré")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Оновити збережений пресет")
	return /** @type {LocalizedString} */ ("Update Saved Preset")
});
export { builderupdatesavedpreset3 as "builderUpdateSavedPreset" }