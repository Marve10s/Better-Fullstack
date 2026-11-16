/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homeaiskepticgloss3Inputs */



/**
* | output |
* | --- |
* | "(because of AI)" |
*
* @param {Homeaiskepticgloss3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homeaiskepticgloss3 = /** @type {((inputs?: Homeaiskepticgloss3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homeaiskepticgloss3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("(por la IA)")
	if (locale === "zh") return /** @type {LocalizedString} */ ("（因为 AI）")
	if (locale === "ja") return /** @type {LocalizedString} */ ("（AI のために）")
	if (locale === "ko") return /** @type {LocalizedString} */ ("(AI 때문에)")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("（因為 AI）")
	if (locale === "de") return /** @type {LocalizedString} */ ("(wegen KI)")
	if (locale === "fr") return /** @type {LocalizedString} */ ("(à cause de l'IA)")
	if (locale === "uk") return /** @type {LocalizedString} */ ("(через ШІ)")
	return /** @type {LocalizedString} */ ("(because of AI)")
});
export { homeaiskepticgloss3 as "homeAiSkepticGloss" }