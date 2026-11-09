/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryreactnativemobilepush6Inputs */



/**
* | output |
* | --- |
* | "Push notifications." |
*
* @param {Docsclisummaryreactnativemobilepush6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryreactnativemobilepush6 = /** @type {((inputs?: Docsclisummaryreactnativemobilepush6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryreactnativemobilepush6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Notificaciones push.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("推送通知。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("プッシュ通知。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("푸시 알림.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("推播通知。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Push-Benachrichtigungen.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Notifications push.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Push-сповіщення.")
	return /** @type {LocalizedString} */ ("Push notifications.")
});
export { docsclisummaryreactnativemobilepush6 as "docsCliSummaryReactNativeMobilePush" }