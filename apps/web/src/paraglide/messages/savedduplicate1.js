/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Savedduplicate1Inputs */



/**
* | output |
* | --- |
* | "Duplicate" |
*
* @param {Savedduplicate1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const savedduplicate1 = /** @type {((inputs?: Savedduplicate1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Savedduplicate1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Duplicar")
	if (locale === "zh") return /** @type {LocalizedString} */ ("复制一份")
	if (locale === "ja") return /** @type {LocalizedString} */ ("複製")
	if (locale === "ko") return /** @type {LocalizedString} */ ("복제")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("複製一份")
	if (locale === "de") return /** @type {LocalizedString} */ ("Duplizieren")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Dupliquer")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Дублювати")
	return /** @type {LocalizedString} */ ("Duplicate")
});
export { savedduplicate1 as "savedDuplicate" }