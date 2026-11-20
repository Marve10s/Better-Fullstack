/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homeaipauseclip3Inputs */



/**
* | output |
* | --- |
* | "Pause the clip" |
*
* @param {Homeaipauseclip3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homeaipauseclip3 = /** @type {((inputs?: Homeaipauseclip3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homeaipauseclip3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Pausar el clip")
	if (locale === "zh") return /** @type {LocalizedString} */ ("暂停片段")
	if (locale === "ja") return /** @type {LocalizedString} */ ("クリップを一時停止")
	if (locale === "ko") return /** @type {LocalizedString} */ ("클립 일시정지")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("暫停片段")
	if (locale === "de") return /** @type {LocalizedString} */ ("Clip pausieren")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Mettre le clip en pause")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Призупинити кліп")
	return /** @type {LocalizedString} */ ("Pause the clip")
});
export { homeaipauseclip3 as "homeAiPauseClip" }