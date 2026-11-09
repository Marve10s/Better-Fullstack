/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homeaifewertokens3Inputs */



/**
* | output |
* | --- |
* | "fewer tokens to pay for" |
*
* @param {Homeaifewertokens3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homeaifewertokens3 = /** @type {((inputs?: Homeaifewertokens3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homeaifewertokens3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("menos tokens que pagar")
	if (locale === "zh") return /** @type {LocalizedString} */ ("需要付费的 token 更少")
	if (locale === "ja") return /** @type {LocalizedString} */ ("支払うトークンが減る")
	if (locale === "ko") return /** @type {LocalizedString} */ ("지불할 토큰은 더 적게")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("需要付費的 token 更少")
	if (locale === "de") return /** @type {LocalizedString} */ ("weniger Tokens zu bezahlen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("moins de tokens à payer")
	if (locale === "uk") return /** @type {LocalizedString} */ ("менше токенів до оплати")
	return /** @type {LocalizedString} */ ("fewer tokens to pay for")
});
export { homeaifewertokens3 as "homeAiFewerTokens" }