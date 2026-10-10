/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryreactnativemobilepush6Inputs */

const en_docsclisummaryreactnativemobilepush6 = /** @type {(inputs: Docsclisummaryreactnativemobilepush6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Push notifications.`)
};

const es_docsclisummaryreactnativemobilepush6 = /** @type {(inputs: Docsclisummaryreactnativemobilepush6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Notificaciones push.`)
};

const zh_docsclisummaryreactnativemobilepush6 = /** @type {(inputs: Docsclisummaryreactnativemobilepush6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`推送通知。`)
};

const ja_docsclisummaryreactnativemobilepush6 = /** @type {(inputs: Docsclisummaryreactnativemobilepush6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`プッシュ通知。`)
};

const ko_docsclisummaryreactnativemobilepush6 = /** @type {(inputs: Docsclisummaryreactnativemobilepush6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`푸시 알림.`)
};

const zh_hant1_docsclisummaryreactnativemobilepush6 = /** @type {(inputs: Docsclisummaryreactnativemobilepush6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`推播通知。`)
};

const de_docsclisummaryreactnativemobilepush6 = /** @type {(inputs: Docsclisummaryreactnativemobilepush6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Push-Benachrichtigungen.`)
};

const fr_docsclisummaryreactnativemobilepush6 = /** @type {(inputs: Docsclisummaryreactnativemobilepush6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Notifications push.`)
};

const uk_docsclisummaryreactnativemobilepush6 = /** @type {(inputs: Docsclisummaryreactnativemobilepush6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Push-сповіщення.`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryreactnativemobilepush6(inputs)
	if (locale === "zh") return zh_docsclisummaryreactnativemobilepush6(inputs)
	if (locale === "ja") return ja_docsclisummaryreactnativemobilepush6(inputs)
	if (locale === "ko") return ko_docsclisummaryreactnativemobilepush6(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryreactnativemobilepush6(inputs)
	if (locale === "de") return de_docsclisummaryreactnativemobilepush6(inputs)
	if (locale === "fr") return fr_docsclisummaryreactnativemobilepush6(inputs)
	if (locale === "uk") return uk_docsclisummaryreactnativemobilepush6(inputs)
	return en_docsclisummaryreactnativemobilepush6(inputs)
});
export { docsclisummaryreactnativemobilepush6 as "docsCliSummaryReactNativeMobilePush" }