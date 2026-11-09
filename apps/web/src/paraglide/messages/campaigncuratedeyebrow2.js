/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaigncuratedeyebrow2Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Cinco puntos de partida")
	if (locale === "zh") return /** @type {LocalizedString} */ ("五个起点")
	if (locale === "ja") return /** @type {LocalizedString} */ ("5つのスタート地点")
	if (locale === "ko") return /** @type {LocalizedString} */ ("다섯 가지 시작점")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("五個起點")
	if (locale === "de") return /** @type {LocalizedString} */ ("Fünf Startpunkte")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Cinq points de départ")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Пʼять точок старту")
	return /** @type {LocalizedString} */ ("Five places to start")
});
export { campaigncuratedeyebrow2 as "campaignCuratedEyebrow" }