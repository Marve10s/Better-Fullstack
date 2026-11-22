/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presetcustomize1Inputs */



/**
* | output |
* | --- |
* | "Customize preset" |
*
* @param {Presetcustomize1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const presetcustomize1 = /** @type {((inputs?: Presetcustomize1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presetcustomize1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Personalizar plantilla")
	if (locale === "zh") return /** @type {LocalizedString} */ ("自定义预设")
	if (locale === "ja") return /** @type {LocalizedString} */ ("プリセットをカスタマイズする")
	if (locale === "ko") return /** @type {LocalizedString} */ ("사전 설정 사용자 정의")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("自訂預設")
	if (locale === "de") return /** @type {LocalizedString} */ ("Voreinstellung anpassen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Personnaliser le préréglage")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Налаштувати пресет")
	return /** @type {LocalizedString} */ ("Customize preset")
});
export { presetcustomize1 as "presetCustomize" }