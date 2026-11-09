/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Launchradarexplore2Inputs */



/**
* | output |
* | --- |
* | "See what landed" |
*
* @param {Launchradarexplore2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const launchradarexplore2 = /** @type {((inputs?: Launchradarexplore2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Launchradarexplore2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Ver lo nuevo")
	if (locale === "zh") return /** @type {LocalizedString} */ ("看看新内容")
	if (locale === "ja") return /** @type {LocalizedString} */ ("新着を見る")
	if (locale === "ko") return /** @type {LocalizedString} */ ("새 항목 보기")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("看看新內容")
	if (locale === "de") return /** @type {LocalizedString} */ ("Neuerungen ansehen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Voir les nouveautés")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Подивитися новинки")
	return /** @type {LocalizedString} */ ("See what landed")
});
export { launchradarexplore2 as "launchRadarExplore" }