/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaignsharetitle2Inputs */



/**
* | output |
* | --- |
* | "This stack is ready to share" |
*
* @param {Campaignsharetitle2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaignsharetitle2 = /** @type {((inputs?: Campaignsharetitle2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaignsharetitle2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Este stack está listo para compartir")
	if (locale === "zh") return /** @type {LocalizedString} */ ("这个技术栈已可分享")
	if (locale === "ja") return /** @type {LocalizedString} */ ("このスタックを共有できます")
	if (locale === "ko") return /** @type {LocalizedString} */ ("이 스택을 공유할 준비가 되었습니다")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("這個技術棧已可分享")
	if (locale === "de") return /** @type {LocalizedString} */ ("Dieser Stack ist bereit zum Teilen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Ce stack est prêt à être partagé")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Цей стек готовий, щоб ним поділитися")
	return /** @type {LocalizedString} */ ("This stack is ready to share")
});
export { campaignsharetitle2 as "campaignShareTitle" }