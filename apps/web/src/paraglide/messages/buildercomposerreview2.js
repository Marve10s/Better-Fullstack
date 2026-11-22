/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposerreview2Inputs */



/**
* | output |
* | --- |
* | "Review" |
*
* @param {Buildercomposerreview2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposerreview2 = /** @type {((inputs?: Buildercomposerreview2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposerreview2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Revisar")
	if (locale === "zh") return /** @type {LocalizedString} */ ("检查")
	if (locale === "ja") return /** @type {LocalizedString} */ ("確認")
	if (locale === "ko") return /** @type {LocalizedString} */ ("검토")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("檢查")
	if (locale === "de") return /** @type {LocalizedString} */ ("Überprüfen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Vérifier")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Перевірка")
	return /** @type {LocalizedString} */ ("Review")
});
export { buildercomposerreview2 as "builderComposerReview" }