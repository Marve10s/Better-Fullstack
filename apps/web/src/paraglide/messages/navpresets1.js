/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navpresets1Inputs */



/**
* | output |
* | --- |
* | "Presets" |
*
* @param {Navpresets1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const navpresets1 = /** @type {((inputs?: Navpresets1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navpresets1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Plantillas")
	if (locale === "zh") return /** @type {LocalizedString} */ ("预设")
	if (locale === "ja") return /** @type {LocalizedString} */ ("プリセット")
	if (locale === "ko") return /** @type {LocalizedString} */ ("사전 설정")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("預設")
	if (locale === "de") return /** @type {LocalizedString} */ ("Voreinstellungen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Préréglages")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Пресети")
	return /** @type {LocalizedString} */ ("Presets")
});
export { navpresets1 as "navPresets" }