/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryshadcnshadcnradius5Inputs */



/**
* | output |
* | --- |
* | "Corner radius scale." |
*
* @param {Docsclisummaryshadcnshadcnradius5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryshadcnshadcnradius5 = /** @type {((inputs?: Docsclisummaryshadcnshadcnradius5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryshadcnshadcnradius5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Escala del radio de las esquinas.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("圆角尺寸。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("角丸のスケール。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("모서리 반경 스케일.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("圓角尺寸。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Skala für den Eckenradius.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Échelle des rayons des coins.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Шкала радіусів заокруглення кутів.")
	return /** @type {LocalizedString} */ ("Corner radius scale.")
});
export { docsclisummaryshadcnshadcnradius5 as "docsCliSummaryShadcnShadcnRadius" }