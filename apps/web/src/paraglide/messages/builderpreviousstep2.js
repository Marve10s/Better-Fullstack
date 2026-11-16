/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderpreviousstep2Inputs */



/**
* | output |
* | --- |
* | "Previous step" |
*
* @param {Builderpreviousstep2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderpreviousstep2 = /** @type {((inputs?: Builderpreviousstep2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderpreviousstep2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Paso anterior")
	if (locale === "zh") return /** @type {LocalizedString} */ ("上一步")
	if (locale === "ja") return /** @type {LocalizedString} */ ("前のステップ")
	if (locale === "ko") return /** @type {LocalizedString} */ ("이전 단계")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("上一步")
	if (locale === "de") return /** @type {LocalizedString} */ ("Vorheriger Schritt")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Étape précédente")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Попередній крок")
	return /** @type {LocalizedString} */ ("Previous step")
});
export { builderpreviousstep2 as "builderPreviousStep" }