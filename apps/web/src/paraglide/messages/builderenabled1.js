/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderenabled1Inputs */



/**
* | output |
* | --- |
* | "Enabled" |
*
* @param {Builderenabled1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderenabled1 = /** @type {((inputs?: Builderenabled1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderenabled1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Activado")
	if (locale === "zh") return /** @type {LocalizedString} */ ("已启用")
	if (locale === "ja") return /** @type {LocalizedString} */ ("有効")
	if (locale === "ko") return /** @type {LocalizedString} */ ("활성화됨")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("已啟用")
	if (locale === "de") return /** @type {LocalizedString} */ ("Aktiviert")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Activé")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Увімкнено")
	return /** @type {LocalizedString} */ ("Enabled")
});
export { builderenabled1 as "builderEnabled" }