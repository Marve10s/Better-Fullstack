/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclibooleanflag3Inputs */



/**
* | output |
* | --- |
* | "boolean flag" |
*
* @param {Docsclibooleanflag3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclibooleanflag3 = /** @type {((inputs?: Docsclibooleanflag3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclibooleanflag3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("flag booleano")
	if (locale === "zh") return /** @type {LocalizedString} */ ("布尔参数")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ブール型フラグ")
	if (locale === "ko") return /** @type {LocalizedString} */ ("불리언 플래그")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("布林旗標")
	if (locale === "de") return /** @type {LocalizedString} */ ("boolesches Flag")
	if (locale === "fr") return /** @type {LocalizedString} */ ("option booléenne")
	if (locale === "uk") return /** @type {LocalizedString} */ ("булевий прапорець")
	return /** @type {LocalizedString} */ ("boolean flag")
});
export { docsclibooleanflag3 as "docsCliBooleanFlag" }