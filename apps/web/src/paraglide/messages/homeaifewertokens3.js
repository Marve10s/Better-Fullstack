/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homeaifewertokens3Inputs */

const en_homeaifewertokens3 = /** @type {(inputs: Homeaifewertokens3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`fewer tokens to pay for`)
};

const es_homeaifewertokens3 = /** @type {(inputs: Homeaifewertokens3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`menos tokens que pagar`)
};

const zh_homeaifewertokens3 = /** @type {(inputs: Homeaifewertokens3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`需要付费的 token 更少`)
};

const ja_homeaifewertokens3 = /** @type {(inputs: Homeaifewertokens3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`支払うトークンが減る`)
};

const ko_homeaifewertokens3 = /** @type {(inputs: Homeaifewertokens3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`지불할 토큰은 더 적게`)
};

const zh_hant1_homeaifewertokens3 = /** @type {(inputs: Homeaifewertokens3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`需要付費的 token 更少`)
};

const de_homeaifewertokens3 = /** @type {(inputs: Homeaifewertokens3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`weniger Tokens zu bezahlen`)
};

const fr_homeaifewertokens3 = /** @type {(inputs: Homeaifewertokens3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`moins de tokens à payer`)
};

const uk_homeaifewertokens3 = /** @type {(inputs: Homeaifewertokens3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`менше токенів до оплати`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_homeaifewertokens3(inputs)
	if (locale === "zh") return zh_homeaifewertokens3(inputs)
	if (locale === "ja") return ja_homeaifewertokens3(inputs)
	if (locale === "ko") return ko_homeaifewertokens3(inputs)
	if (locale === "zh-Hant") return zh_hant1_homeaifewertokens3(inputs)
	if (locale === "de") return de_homeaifewertokens3(inputs)
	if (locale === "fr") return fr_homeaifewertokens3(inputs)
	if (locale === "uk") return uk_homeaifewertokens3(inputs)
	return en_homeaifewertokens3(inputs)
});
export { homeaifewertokens3 as "homeAiFewerTokens" }