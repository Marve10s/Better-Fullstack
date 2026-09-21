/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Hometestimonialssource2Inputs */

const en_hometestimonialssource2 = /** @type {(inputs: Hometestimonialssource2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Comments from daily.dev`)
};

const es_hometestimonialssource2 = /** @type {(inputs: Hometestimonialssource2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Comentarios de daily.dev`)
};

const zh_hometestimonialssource2 = /** @type {(inputs: Hometestimonialssource2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`来自 daily.dev 的评论`)
};

const ja_hometestimonialssource2 = /** @type {(inputs: Hometestimonialssource2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`daily.dev のコメント`)
};

const ko_hometestimonialssource2 = /** @type {(inputs: Hometestimonialssource2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`daily.dev 댓글`)
};

const zh_hant1_hometestimonialssource2 = /** @type {(inputs: Hometestimonialssource2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`來自 daily.dev 的留言`)
};

const de_hometestimonialssource2 = /** @type {(inputs: Hometestimonialssource2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Kommentare von daily.dev`)
};

const fr_hometestimonialssource2 = /** @type {(inputs: Hometestimonialssource2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Commentaires de daily.dev`)
};

const uk_hometestimonialssource2 = /** @type {(inputs: Hometestimonialssource2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Коментарі з daily.dev`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_hometestimonialssource2(inputs)
	if (locale === "zh") return zh_hometestimonialssource2(inputs)
	if (locale === "ja") return ja_hometestimonialssource2(inputs)
	if (locale === "ko") return ko_hometestimonialssource2(inputs)
	if (locale === "zh-Hant") return zh_hant1_hometestimonialssource2(inputs)
	if (locale === "de") return de_hometestimonialssource2(inputs)
	if (locale === "fr") return fr_hometestimonialssource2(inputs)
	if (locale === "uk") return uk_hometestimonialssource2(inputs)
	return en_hometestimonialssource2(inputs)
});
export { hometestimonialssource2 as "homeTestimonialsSource" }