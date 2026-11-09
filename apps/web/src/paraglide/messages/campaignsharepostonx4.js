/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaignsharepostonx4Inputs */



/**
* | output |
* | --- |
* | "Post on X" |
*
* @param {Campaignsharepostonx4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaignsharepostonx4 = /** @type {((inputs?: Campaignsharepostonx4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaignsharepostonx4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Publicar en X")
	if (locale === "zh") return /** @type {LocalizedString} */ ("发布到 X")
	if (locale === "ja") return /** @type {LocalizedString} */ ("X に投稿")
	if (locale === "ko") return /** @type {LocalizedString} */ ("X에 게시")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("發布到 X")
	if (locale === "de") return /** @type {LocalizedString} */ ("Auf X posten")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Publier sur X")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Опублікувати в X")
	return /** @type {LocalizedString} */ ("Post on X")
});
export { campaignsharepostonx4 as "campaignSharePostOnX" }