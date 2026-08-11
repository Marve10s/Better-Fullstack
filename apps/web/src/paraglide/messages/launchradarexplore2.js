/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Launchradarexplore2Inputs */

const en_launchradarexplore2 = /** @type {(inputs: Launchradarexplore2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`See what landed`)
};

const es_launchradarexplore2 = /** @type {(inputs: Launchradarexplore2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ver lo nuevo`)
};

const zh_launchradarexplore2 = /** @type {(inputs: Launchradarexplore2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`看看新内容`)
};

const ja_launchradarexplore2 = /** @type {(inputs: Launchradarexplore2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`新着を見る`)
};

const ko_launchradarexplore2 = /** @type {(inputs: Launchradarexplore2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`새 항목 보기`)
};

const zh_hant1_launchradarexplore2 = /** @type {(inputs: Launchradarexplore2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`看看新內容`)
};

const de_launchradarexplore2 = /** @type {(inputs: Launchradarexplore2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Neuerungen ansehen`)
};

const fr_launchradarexplore2 = /** @type {(inputs: Launchradarexplore2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Voir les nouveautés`)
};

const uk_launchradarexplore2 = /** @type {(inputs: Launchradarexplore2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Подивитися новинки`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_launchradarexplore2(inputs)
	if (locale === "zh") return zh_launchradarexplore2(inputs)
	if (locale === "ja") return ja_launchradarexplore2(inputs)
	if (locale === "ko") return ko_launchradarexplore2(inputs)
	if (locale === "zh-Hant") return zh_hant1_launchradarexplore2(inputs)
	if (locale === "de") return de_launchradarexplore2(inputs)
	if (locale === "fr") return fr_launchradarexplore2(inputs)
	if (locale === "uk") return uk_launchradarexplore2(inputs)
	return en_launchradarexplore2(inputs)
});
export { launchradarexplore2 as "launchRadarExplore" }