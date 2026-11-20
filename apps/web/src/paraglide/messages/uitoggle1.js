/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Uitoggle1Inputs */



/**
* | output |
* | --- |
* | "Toggle" |
*
* @param {Uitoggle1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const uitoggle1 = /** @type {((inputs?: Uitoggle1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Uitoggle1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Alternar")
	if (locale === "zh") return /** @type {LocalizedString} */ ("切换")
	if (locale === "ja") return /** @type {LocalizedString} */ ("トグル")
	if (locale === "ko") return /** @type {LocalizedString} */ ("전환")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("切換")
	if (locale === "de") return /** @type {LocalizedString} */ ("Umschalten")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Basculer")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Перемикач")
	return /** @type {LocalizedString} */ ("Toggle")
});
export { uitoggle1 as "uiToggle" }