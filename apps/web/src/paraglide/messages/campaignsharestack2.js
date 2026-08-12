/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaignsharestack2Inputs */

const en_campaignsharestack2 = /** @type {(inputs: Campaignsharestack2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Share this stack`)
};

const es_campaignsharestack2 = /** @type {(inputs: Campaignsharestack2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Compartir este stack`)
};

const zh_campaignsharestack2 = /** @type {(inputs: Campaignsharestack2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`分享这个技术栈`)
};

const ja_campaignsharestack2 = /** @type {(inputs: Campaignsharestack2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`このスタックを共有`)
};

const ko_campaignsharestack2 = /** @type {(inputs: Campaignsharestack2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`이 스택 공유하기`)
};

const zh_hant1_campaignsharestack2 = /** @type {(inputs: Campaignsharestack2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`分享這個技術棧`)
};

const de_campaignsharestack2 = /** @type {(inputs: Campaignsharestack2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Diesen Stack teilen`)
};

const fr_campaignsharestack2 = /** @type {(inputs: Campaignsharestack2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Partager ce stack`)
};

const uk_campaignsharestack2 = /** @type {(inputs: Campaignsharestack2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Поділитися цим стеком`)
};

/**
* | output |
* | --- |
* | "Share this stack" |
*
* @param {Campaignsharestack2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaignsharestack2 = /** @type {((inputs?: Campaignsharestack2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaignsharestack2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_campaignsharestack2(inputs)
	if (locale === "zh") return zh_campaignsharestack2(inputs)
	if (locale === "ja") return ja_campaignsharestack2(inputs)
	if (locale === "ko") return ko_campaignsharestack2(inputs)
	if (locale === "zh-Hant") return zh_hant1_campaignsharestack2(inputs)
	if (locale === "de") return de_campaignsharestack2(inputs)
	if (locale === "fr") return fr_campaignsharestack2(inputs)
	if (locale === "uk") return uk_campaignsharestack2(inputs)
	return en_campaignsharestack2(inputs)
});
export { campaignsharestack2 as "campaignShareStack" }