/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildersavecurrentpreset3Inputs */



/**
* | output |
* | --- |
* | "Save current preset" |
*
* @param {Buildersavecurrentpreset3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildersavecurrentpreset3 = /** @type {((inputs?: Buildersavecurrentpreset3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildersavecurrentpreset3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Guardar plantilla actual")
	if (locale === "zh") return /** @type {LocalizedString} */ ("保存当前预设")
	if (locale === "ja") return /** @type {LocalizedString} */ ("現在のプリセットを保存する")
	if (locale === "ko") return /** @type {LocalizedString} */ ("현재 사전 설정 저장")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("儲存目前預設")
	if (locale === "de") return /** @type {LocalizedString} */ ("Aktuelle Voreinstellung speichern")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Enregistrer le préréglage actuel")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Зберегти поточний пресет")
	return /** @type {LocalizedString} */ ("Save current preset")
});
export { buildersavecurrentpreset3 as "builderSaveCurrentPreset" }