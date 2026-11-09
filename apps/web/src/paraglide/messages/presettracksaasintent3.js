/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presettracksaasintent3Inputs */



/**
* | output |
* | --- |
* | "Sell subscriptions" |
*
* @param {Presettracksaasintent3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const presettracksaasintent3 = /** @type {((inputs?: Presettracksaasintent3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presettracksaasintent3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Vender suscripciones")
	if (locale === "zh") return /** @type {LocalizedString} */ ("销售订阅")
	if (locale === "ja") return /** @type {LocalizedString} */ ("サブスクリプションを販売する")
	if (locale === "ko") return /** @type {LocalizedString} */ ("구독 판매")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("銷售訂閱")
	if (locale === "de") return /** @type {LocalizedString} */ ("Abonnements verkaufen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Vendre des abonnements")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Продавати підписки")
	return /** @type {LocalizedString} */ ("Sell subscriptions")
});
export { presettracksaasintent3 as "presetTrackSaasIntent" }