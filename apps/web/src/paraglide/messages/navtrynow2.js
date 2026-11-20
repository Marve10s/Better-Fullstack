/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navtrynow2Inputs */



/**
* | output |
* | --- |
* | "Try now" |
*
* @param {Navtrynow2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const navtrynow2 = /** @type {((inputs?: Navtrynow2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navtrynow2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Probar ahora")
	if (locale === "zh") return /** @type {LocalizedString} */ ("立即试用")
	if (locale === "ja") return /** @type {LocalizedString} */ ("今すぐ試す")
	if (locale === "ko") return /** @type {LocalizedString} */ ("지금 사용해 보세요")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("立即試用")
	if (locale === "de") return /** @type {LocalizedString} */ ("Jetzt ausprobieren")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Essayez maintenant")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Спробувати")
	return /** @type {LocalizedString} */ ("Try now")
});
export { navtrynow2 as "navTryNow" }