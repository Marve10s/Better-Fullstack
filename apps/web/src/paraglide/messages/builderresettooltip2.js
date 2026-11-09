/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderresettooltip2Inputs */



/**
* | output |
* | --- |
* | "Reset all builder options to defaults" |
*
* @param {Builderresettooltip2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderresettooltip2 = /** @type {((inputs?: Builderresettooltip2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderresettooltip2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Restablecer todas las opciones del constructor")
	if (locale === "zh") return /** @type {LocalizedString} */ ("重置构建器的所有选项")
	if (locale === "ja") return /** @type {LocalizedString} */ ("すべてのビルダー オプションをデフォルトにリセットします")
	if (locale === "ko") return /** @type {LocalizedString} */ ("모든 빌더 옵션을 기본값으로 재설정")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("重置建構器的所有選項")
	if (locale === "de") return /** @type {LocalizedString} */ ("Setzen Sie alle Builder-Optionen auf die Standardeinstellungen zurück")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Réinitialiser toutes les options du générateur aux valeurs par défaut")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Скинути всі параметри конструктора до значень за замовчуванням")
	return /** @type {LocalizedString} */ ("Reset all builder options to defaults")
});
export { builderresettooltip2 as "builderResetTooltip" }