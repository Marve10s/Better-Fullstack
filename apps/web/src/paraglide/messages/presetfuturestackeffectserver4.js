/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presetfuturestackeffectserver4Inputs */



/**
* | output |
* | --- |
* | "On its own server" |
*
* @param {Presetfuturestackeffectserver4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const presetfuturestackeffectserver4 = /** @type {((inputs?: Presetfuturestackeffectserver4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presetfuturestackeffectserver4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("En su propio servidor")
	if (locale === "zh") return /** @type {LocalizedString} */ ("独立服务器")
	if (locale === "ja") return /** @type {LocalizedString} */ ("専用サーバー")
	if (locale === "ko") return /** @type {LocalizedString} */ ("별도 서버에서")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("獨立伺服器")
	if (locale === "de") return /** @type {LocalizedString} */ ("Auf eigenem Server")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Sur son propre serveur")
	if (locale === "uk") return /** @type {LocalizedString} */ ("На окремому сервері")
	return /** @type {LocalizedString} */ ("On its own server")
});
export { presetfuturestackeffectserver4 as "presetFutureStackEffectServer" }