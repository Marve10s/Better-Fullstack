/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Stackloaded1Inputs */



/**
* | output |
* | --- |
* | "Stack loaded successfully" |
*
* @param {Stackloaded1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const stackloaded1 = /** @type {((inputs?: Stackloaded1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Stackloaded1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Stack cargado correctamente")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Stack 加载成功")
	if (locale === "ja") return /** @type {LocalizedString} */ ("スタックが正常にロードされました")
	if (locale === "ko") return /** @type {LocalizedString} */ ("스택이 성공적으로 로드되었습니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Stack 載入成功")
	if (locale === "de") return /** @type {LocalizedString} */ ("Stack erfolgreich geladen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Pile chargée avec succès")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Стек завантажено")
	return /** @type {LocalizedString} */ ("Stack loaded successfully")
});
export { stackloaded1 as "stackLoaded" }