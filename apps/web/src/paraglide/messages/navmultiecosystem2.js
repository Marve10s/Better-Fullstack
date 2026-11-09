/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navmultiecosystem2Inputs */



/**
* | output |
* | --- |
* | "Multi-Ecosystem" |
*
* @param {Navmultiecosystem2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const navmultiecosystem2 = /** @type {((inputs?: Navmultiecosystem2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navmultiecosystem2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Multi-ecosistema")
	if (locale === "zh") return /** @type {LocalizedString} */ ("多生态")
	if (locale === "ja") return /** @type {LocalizedString} */ ("マルチエコシステム")
	if (locale === "ko") return /** @type {LocalizedString} */ ("다중 생태계")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("多元生態")
	if (locale === "de") return /** @type {LocalizedString} */ ("Multi-Ökosystem")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Multi-écosystème")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Кілька екосистем")
	return /** @type {LocalizedString} */ ("Multi-Ecosystem")
});
export { navmultiecosystem2 as "navMultiEcosystem" }