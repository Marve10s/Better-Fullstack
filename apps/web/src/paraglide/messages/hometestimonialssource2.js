/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Hometestimonialssource2Inputs */



/**
* | output |
* | --- |
* | "Comments from daily.dev" |
*
* @param {Hometestimonialssource2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const hometestimonialssource2 = /** @type {((inputs?: Hometestimonialssource2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Hometestimonialssource2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Comentarios de daily.dev")
	if (locale === "zh") return /** @type {LocalizedString} */ ("来自 daily.dev 的评论")
	if (locale === "ja") return /** @type {LocalizedString} */ ("daily.dev のコメント")
	if (locale === "ko") return /** @type {LocalizedString} */ ("daily.dev 댓글")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("來自 daily.dev 的留言")
	if (locale === "de") return /** @type {LocalizedString} */ ("Kommentare von daily.dev")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Commentaires de daily.dev")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Коментарі з daily.dev")
	return /** @type {LocalizedString} */ ("Comments from daily.dev")
});
export { hometestimonialssource2 as "homeTestimonialsSource" }