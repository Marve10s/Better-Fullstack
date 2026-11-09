/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaignsharestack2Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Compartir este stack")
	if (locale === "zh") return /** @type {LocalizedString} */ ("分享这个技术栈")
	if (locale === "ja") return /** @type {LocalizedString} */ ("このスタックを共有")
	if (locale === "ko") return /** @type {LocalizedString} */ ("이 스택 공유하기")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("分享這個技術棧")
	if (locale === "de") return /** @type {LocalizedString} */ ("Diesen Stack teilen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Partager ce stack")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Поділитися цим стеком")
	return /** @type {LocalizedString} */ ("Share this stack")
});
export { campaignsharestack2 as "campaignShareStack" }