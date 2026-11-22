/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclimultiple2Inputs */



/**
* | output |
* | --- |
* | "multiple" |
*
* @param {Docsclimultiple2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclimultiple2 = /** @type {((inputs?: Docsclimultiple2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclimultiple2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("varios valores")
	if (locale === "zh") return /** @type {LocalizedString} */ ("可接受多个值")
	if (locale === "ja") return /** @type {LocalizedString} */ ("複数指定可")
	if (locale === "ko") return /** @type {LocalizedString} */ ("여러 값 허용")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("可接受多個值")
	if (locale === "de") return /** @type {LocalizedString} */ ("mehrere Werte")
	if (locale === "fr") return /** @type {LocalizedString} */ ("plusieurs valeurs")
	if (locale === "uk") return /** @type {LocalizedString} */ ("кілька значень")
	return /** @type {LocalizedString} */ ("multiple")
});
export { docsclimultiple2 as "docsCliMultiple" }