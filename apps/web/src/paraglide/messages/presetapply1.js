/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presetapply1Inputs */



/**
* | output |
* | --- |
* | "Apply" |
*
* @param {Presetapply1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const presetapply1 = /** @type {((inputs?: Presetapply1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presetapply1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Aplicar")
	if (locale === "zh") return /** @type {LocalizedString} */ ("应用")
	if (locale === "ja") return /** @type {LocalizedString} */ ("適用する")
	if (locale === "ko") return /** @type {LocalizedString} */ ("적용")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("應用")
	if (locale === "de") return /** @type {LocalizedString} */ ("Anwenden")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Appliquer")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Застосувати")
	return /** @type {LocalizedString} */ ("Apply")
});
export { presetapply1 as "presetApply" }