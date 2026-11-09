/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderlegacy1Inputs */



/**
* | output |
* | --- |
* | "Legacy" |
*
* @param {Builderlegacy1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderlegacy1 = /** @type {((inputs?: Builderlegacy1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderlegacy1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Legacy")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Legacy")
	if (locale === "ja") return /** @type {LocalizedString} */ ("レガシー")
	if (locale === "ko") return /** @type {LocalizedString} */ ("레거시")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Legacy")
	if (locale === "de") return /** @type {LocalizedString} */ ("Legacy")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Legacy")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Застаріле")
	return /** @type {LocalizedString} */ ("Legacy")
});
export { builderlegacy1 as "builderLegacy" }