/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationecosystems2Inputs */



/**
* | output |
* | --- |
* | "Ecosystems" |
*
* @param {Docsverificationecosystems2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationecosystems2 = /** @type {((inputs?: Docsverificationecosystems2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationecosystems2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Ecosistemas")
	if (locale === "zh") return /** @type {LocalizedString} */ ("生态")
	if (locale === "ja") return /** @type {LocalizedString} */ ("エコシステム")
	if (locale === "ko") return /** @type {LocalizedString} */ ("생태계")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("生態系")
	if (locale === "de") return /** @type {LocalizedString} */ ("Ökosysteme")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Écosystèmes")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Екосистеми")
	return /** @type {LocalizedString} */ ("Ecosystems")
});
export { docsverificationecosystems2 as "docsVerificationEcosystems" }