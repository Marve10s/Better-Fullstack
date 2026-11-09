/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docssearchnavigate2Inputs */



/**
* | output |
* | --- |
* | "Navigate" |
*
* @param {Docssearchnavigate2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docssearchnavigate2 = /** @type {((inputs?: Docssearchnavigate2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docssearchnavigate2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Navegar")
	if (locale === "zh") return /** @type {LocalizedString} */ ("导航")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ナビゲート")
	if (locale === "ko") return /** @type {LocalizedString} */ ("탐색")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("導航")
	if (locale === "de") return /** @type {LocalizedString} */ ("Navigieren")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Naviguer")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Навігація")
	return /** @type {LocalizedString} */ ("Navigate")
});
export { docssearchnavigate2 as "docsSearchNavigate" }