/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Savedpresetnamerequired3Inputs */



/**
* | output |
* | --- |
* | "Preset name cannot be empty" |
*
* @param {Savedpresetnamerequired3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const savedpresetnamerequired3 = /** @type {((inputs?: Savedpresetnamerequired3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Savedpresetnamerequired3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("El nombre de la plantilla no puede estar vacío")
	if (locale === "zh") return /** @type {LocalizedString} */ ("预设名称不能为空")
	if (locale === "ja") return /** @type {LocalizedString} */ ("プリセット名を空にすることはできません")
	if (locale === "ko") return /** @type {LocalizedString} */ ("사전 설정 이름은 비워둘 수 없습니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("預設名稱不能為空")
	if (locale === "de") return /** @type {LocalizedString} */ ("Der Name der Voreinstellung darf nicht leer sein")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Le nom du préréglage ne peut pas être vide")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Назва пресету не може бути порожньою")
	return /** @type {LocalizedString} */ ("Preset name cannot be empty")
});
export { savedpresetnamerequired3 as "savedPresetNameRequired" }