/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presetstartertracks2Inputs */



/**
* | output |
* | --- |
* | "Starter tracks" |
*
* @param {Presetstartertracks2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const presetstartertracks2 = /** @type {((inputs?: Presetstartertracks2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presetstartertracks2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Rutas iniciales")
	if (locale === "zh") return /** @type {LocalizedString} */ ("入门路线")
	if (locale === "ja") return /** @type {LocalizedString} */ ("スタータートラック")
	if (locale === "ko") return /** @type {LocalizedString} */ ("스타터 트랙")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("入門路線")
	if (locale === "de") return /** @type {LocalizedString} */ ("Starter-Tracks")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Pistes de démarrage")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Starter tracks")
	return /** @type {LocalizedString} */ ("Starter tracks")
});
export { presetstartertracks2 as "presetStarterTracks" }