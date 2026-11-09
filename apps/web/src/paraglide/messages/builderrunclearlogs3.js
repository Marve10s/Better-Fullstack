/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderrunclearlogs3Inputs */



/**
* | output |
* | --- |
* | "Clear" |
*
* @param {Builderrunclearlogs3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderrunclearlogs3 = /** @type {((inputs?: Builderrunclearlogs3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderrunclearlogs3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Limpiar")
	if (locale === "zh") return /** @type {LocalizedString} */ ("清除")
	if (locale === "ja") return /** @type {LocalizedString} */ ("クリア")
	if (locale === "ko") return /** @type {LocalizedString} */ ("지우기")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("清除")
	if (locale === "de") return /** @type {LocalizedString} */ ("Leeren")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Effacer")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Очистити")
	return /** @type {LocalizedString} */ ("Clear")
});
export { builderrunclearlogs3 as "builderRunClearLogs" }