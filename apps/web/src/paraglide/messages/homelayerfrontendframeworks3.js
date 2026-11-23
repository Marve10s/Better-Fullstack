/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homelayerfrontendframeworks3Inputs */



/**
* | output |
* | --- |
* | "Frontend frameworks" |
*
* @param {Homelayerfrontendframeworks3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homelayerfrontendframeworks3 = /** @type {((inputs?: Homelayerfrontendframeworks3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homelayerfrontendframeworks3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Frameworks frontend")
	if (locale === "zh") return /** @type {LocalizedString} */ ("前端框架")
	if (locale === "ja") return /** @type {LocalizedString} */ ("フロントエンドフレームワーク")
	if (locale === "ko") return /** @type {LocalizedString} */ ("프런트엔드 프레임워크")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("前端框架")
	if (locale === "de") return /** @type {LocalizedString} */ ("Frontend-Frameworks")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Frameworks frontend")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Фронтенд-фреймворки")
	return /** @type {LocalizedString} */ ("Frontend frameworks")
});
export { homelayerfrontendframeworks3 as "homeLayerFrontendFrameworks" }