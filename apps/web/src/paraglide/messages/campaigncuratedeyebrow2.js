/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaigncuratedeyebrow2Inputs */

const en_campaigncuratedeyebrow2 = /** @type {(inputs: Campaigncuratedeyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Five places to start`)
};

const es_campaigncuratedeyebrow2 = /** @type {(inputs: Campaigncuratedeyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cinco puntos de partida`)
};

const zh_campaigncuratedeyebrow2 = /** @type {(inputs: Campaigncuratedeyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`五个起点`)
};

const ja_campaigncuratedeyebrow2 = /** @type {(inputs: Campaigncuratedeyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`5つのスタート地点`)
};

const ko_campaigncuratedeyebrow2 = /** @type {(inputs: Campaigncuratedeyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`다섯 가지 시작점`)
};

const zh_hant1_campaigncuratedeyebrow2 = /** @type {(inputs: Campaigncuratedeyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`五個起點`)
};

const de_campaigncuratedeyebrow2 = /** @type {(inputs: Campaigncuratedeyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fünf Startpunkte`)
};

const fr_campaigncuratedeyebrow2 = /** @type {(inputs: Campaigncuratedeyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cinq points de départ`)
};

const uk_campaigncuratedeyebrow2 = /** @type {(inputs: Campaigncuratedeyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Пʼять точок старту`)
};

/**
* | output |
* | --- |
* | "Five places to start" |
*
* @param {Campaigncuratedeyebrow2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaigncuratedeyebrow2 = /** @type {((inputs?: Campaigncuratedeyebrow2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaigncuratedeyebrow2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_campaigncuratedeyebrow2(inputs)
	if (locale === "es") return es_campaigncuratedeyebrow2(inputs)
	if (locale === "zh") return zh_campaigncuratedeyebrow2(inputs)
	if (locale === "ja") return ja_campaigncuratedeyebrow2(inputs)
	if (locale === "ko") return ko_campaigncuratedeyebrow2(inputs)
	if (locale === "zh-Hant") return zh_hant1_campaigncuratedeyebrow2(inputs)
	if (locale === "de") return de_campaigncuratedeyebrow2(inputs)
	if (locale === "fr") return fr_campaigncuratedeyebrow2(inputs)
	return uk_campaigncuratedeyebrow2(inputs)
});
export { campaigncuratedeyebrow2 as "campaignCuratedEyebrow" }