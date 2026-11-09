/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Stackcopy1Inputs */



/**
* | output |
* | --- |
* | "Copy" |
*
* @param {Stackcopy1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const stackcopy1 = /** @type {((inputs?: Stackcopy1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Stackcopy1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Copiar")
	if (locale === "zh") return /** @type {LocalizedString} */ ("复制")
	if (locale === "ja") return /** @type {LocalizedString} */ ("コピー")
	if (locale === "ko") return /** @type {LocalizedString} */ ("복사")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("複製")
	if (locale === "de") return /** @type {LocalizedString} */ ("Kopieren")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Copier")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Копіювати")
	return /** @type {LocalizedString} */ ("Copy")
});
export { stackcopy1 as "stackCopy" }