/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homelikedonx3Inputs */



/**
* | output |
* | --- |
* | "liked on x" |
*
* @param {Homelikedonx3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homelikedonx3 = /** @type {((inputs?: Homelikedonx3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homelikedonx3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("likes en x")
	if (locale === "zh") return /** @type {LocalizedString} */ ("X 上的点赞")
	if (locale === "ja") return /** @type {LocalizedString} */ ("X で「いいね」")
	if (locale === "ko") return /** @type {LocalizedString} */ ("x에 좋아요를 표시했습니다")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("X 上的讚")
	if (locale === "de") return /** @type {LocalizedString} */ ("Likes auf X")
	if (locale === "fr") return /** @type {LocalizedString} */ ("aimé sur x")
	if (locale === "uk") return /** @type {LocalizedString} */ ("лайків на X")
	return /** @type {LocalizedString} */ ("liked on x")
});
export { homelikedonx3 as "homeLikedOnX" }