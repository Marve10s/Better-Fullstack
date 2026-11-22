/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderrunstop2Inputs */



/**
* | output |
* | --- |
* | "Stop" |
*
* @param {Builderrunstop2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderrunstop2 = /** @type {((inputs?: Builderrunstop2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderrunstop2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Detener")
	if (locale === "zh") return /** @type {LocalizedString} */ ("停止")
	if (locale === "ja") return /** @type {LocalizedString} */ ("停止")
	if (locale === "ko") return /** @type {LocalizedString} */ ("중지")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("停止")
	if (locale === "de") return /** @type {LocalizedString} */ ("Stoppen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Arrêter")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Зупинити")
	return /** @type {LocalizedString} */ ("Stop")
});
export { builderrunstop2 as "builderRunStop" }