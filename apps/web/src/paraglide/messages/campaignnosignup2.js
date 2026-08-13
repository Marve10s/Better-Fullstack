/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaignnosignup2Inputs */

const en_campaignnosignup2 = /** @type {(inputs: Campaignnosignup2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No signup`)
};

const es_campaignnosignup2 = /** @type {(inputs: Campaignnosignup2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sin registro`)
};

const zh_campaignnosignup2 = /** @type {(inputs: Campaignnosignup2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`无需注册`)
};

const ja_campaignnosignup2 = /** @type {(inputs: Campaignnosignup2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`登録不要`)
};

const ko_campaignnosignup2 = /** @type {(inputs: Campaignnosignup2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`가입 불필요`)
};

const zh_hant1_campaignnosignup2 = /** @type {(inputs: Campaignnosignup2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`無需註冊`)
};

const de_campaignnosignup2 = /** @type {(inputs: Campaignnosignup2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Keine Anmeldung`)
};

const fr_campaignnosignup2 = /** @type {(inputs: Campaignnosignup2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sans inscription`)
};

const uk_campaignnosignup2 = /** @type {(inputs: Campaignnosignup2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Без реєстрації`)
};

/**
* | output |
* | --- |
* | "No signup" |
*
* @param {Campaignnosignup2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaignnosignup2 = /** @type {((inputs?: Campaignnosignup2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaignnosignup2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_campaignnosignup2(inputs)
	if (locale === "zh") return zh_campaignnosignup2(inputs)
	if (locale === "ja") return ja_campaignnosignup2(inputs)
	if (locale === "ko") return ko_campaignnosignup2(inputs)
	if (locale === "zh-Hant") return zh_hant1_campaignnosignup2(inputs)
	if (locale === "de") return de_campaignnosignup2(inputs)
	if (locale === "fr") return fr_campaignnosignup2(inputs)
	if (locale === "uk") return uk_campaignnosignup2(inputs)
	return en_campaignnosignup2(inputs)
});
export { campaignnosignup2 as "campaignNoSignup" }