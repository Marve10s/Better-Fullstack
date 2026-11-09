/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homecontributorseyebrow2Inputs */



/**
* | output |
* | --- |
* | "contributors" |
*
* @param {Homecontributorseyebrow2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homecontributorseyebrow2 = /** @type {((inputs?: Homecontributorseyebrow2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homecontributorseyebrow2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("contribuidores")
	if (locale === "zh") return /** @type {LocalizedString} */ ("贡献者")
	if (locale === "ja") return /** @type {LocalizedString} */ ("貢献者")
	if (locale === "ko") return /** @type {LocalizedString} */ ("기여자")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("貢獻者")
	if (locale === "de") return /** @type {LocalizedString} */ ("Mitwirkende")
	if (locale === "fr") return /** @type {LocalizedString} */ ("contributeurs")
	if (locale === "uk") return /** @type {LocalizedString} */ ("контриб’ютори")
	return /** @type {LocalizedString} */ ("contributors")
});
export { homecontributorseyebrow2 as "homeContributorsEyebrow" }