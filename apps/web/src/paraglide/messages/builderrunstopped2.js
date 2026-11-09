/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderrunstopped2Inputs */



/**
* | output |
* | --- |
* | "Runtime stopped" |
*
* @param {Builderrunstopped2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderrunstopped2 = /** @type {((inputs?: Builderrunstopped2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderrunstopped2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Entorno detenido")
	if (locale === "zh") return /** @type {LocalizedString} */ ("运行时已停止")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ランタイムを停止しました")
	if (locale === "ko") return /** @type {LocalizedString} */ ("런타임 중지됨")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("執行階段已停止")
	if (locale === "de") return /** @type {LocalizedString} */ ("Laufzeit gestoppt")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Environnement arrêté")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Середовище зупинено")
	return /** @type {LocalizedString} */ ("Runtime stopped")
});
export { builderrunstopped2 as "builderRunStopped" }