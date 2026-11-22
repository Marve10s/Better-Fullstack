/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposergenerates2Inputs */



/**
* | output |
* | --- |
* | "Generates" |
*
* @param {Buildercomposergenerates2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposergenerates2 = /** @type {((inputs?: Buildercomposergenerates2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposergenerates2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Genera")
	if (locale === "zh") return /** @type {LocalizedString} */ ("生成")
	if (locale === "ja") return /** @type {LocalizedString} */ ("生成")
	if (locale === "ko") return /** @type {LocalizedString} */ ("생성")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("產生")
	if (locale === "de") return /** @type {LocalizedString} */ ("Erzeugt")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Génère")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Створює")
	return /** @type {LocalizedString} */ ("Generates")
});
export { buildercomposergenerates2 as "builderComposerGenerates" }