/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildersavepreset2Inputs */



/**
* | output |
* | --- |
* | "Save preset" |
*
* @param {Buildersavepreset2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildersavepreset2 = /** @type {((inputs?: Buildersavepreset2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildersavepreset2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Guardar plantilla")
	if (locale === "zh") return /** @type {LocalizedString} */ ("保存预设")
	if (locale === "ja") return /** @type {LocalizedString} */ ("プリセットの保存")
	if (locale === "ko") return /** @type {LocalizedString} */ ("사전 설정 저장")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("儲存預設")
	if (locale === "de") return /** @type {LocalizedString} */ ("Voreinstellung speichern")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Enregistrer le préréglage")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Зберегти пресет")
	return /** @type {LocalizedString} */ ("Save preset")
});
export { buildersavepreset2 as "builderSavePreset" }