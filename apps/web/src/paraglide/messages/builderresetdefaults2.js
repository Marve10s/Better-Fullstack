/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderresetdefaults2Inputs */



/**
* | output |
* | --- |
* | "Reset to defaults" |
*
* @param {Builderresetdefaults2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderresetdefaults2 = /** @type {((inputs?: Builderresetdefaults2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderresetdefaults2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Restablecer valores")
	if (locale === "zh") return /** @type {LocalizedString} */ ("重置为默认值")
	if (locale === "ja") return /** @type {LocalizedString} */ ("デフォルトにリセットする")
	if (locale === "ko") return /** @type {LocalizedString} */ ("기본값으로 재설정")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("重設為預設值")
	if (locale === "de") return /** @type {LocalizedString} */ ("Auf Standardeinstellungen zurücksetzen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Réinitialiser aux valeurs par défaut")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Відновити налаштування за замовчуванням")
	return /** @type {LocalizedString} */ ("Reset to defaults")
});
export { builderresetdefaults2 as "builderResetDefaults" }