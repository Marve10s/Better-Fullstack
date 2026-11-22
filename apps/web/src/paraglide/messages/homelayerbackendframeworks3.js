/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homelayerbackendframeworks3Inputs */



/**
* | output |
* | --- |
* | "BACKEND FRAMEWORKS" |
*
* @param {Homelayerbackendframeworks3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homelayerbackendframeworks3 = /** @type {((inputs?: Homelayerbackendframeworks3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homelayerbackendframeworks3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("FRAMEWORKS BACKEND")
	if (locale === "zh") return /** @type {LocalizedString} */ ("后端框架")
	if (locale === "ja") return /** @type {LocalizedString} */ ("バックエンドフレームワーク")
	if (locale === "ko") return /** @type {LocalizedString} */ ("백엔드 프레임워크")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("後端框架")
	if (locale === "de") return /** @type {LocalizedString} */ ("BACKEND-FRAMEWORKS")
	if (locale === "fr") return /** @type {LocalizedString} */ ("FRAMEWORKS BACKEND")
	if (locale === "uk") return /** @type {LocalizedString} */ ("БЕКЕНД-ФРЕЙМВОРКИ")
	return /** @type {LocalizedString} */ ("BACKEND FRAMEWORKS")
});
export { homelayerbackendframeworks3 as "homeLayerBackendFrameworks" }