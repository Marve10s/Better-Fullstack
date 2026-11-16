/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navsectionresources2Inputs */



/**
* | output |
* | --- |
* | "Resources" |
*
* @param {Navsectionresources2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const navsectionresources2 = /** @type {((inputs?: Navsectionresources2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navsectionresources2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Recursos")
	if (locale === "zh") return /** @type {LocalizedString} */ ("资源")
	if (locale === "ja") return /** @type {LocalizedString} */ ("リソース")
	if (locale === "ko") return /** @type {LocalizedString} */ ("리소스")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("資源")
	if (locale === "de") return /** @type {LocalizedString} */ ("Ressourcen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Ressources")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Ресурси")
	return /** @type {LocalizedString} */ ("Resources")
});
export { navsectionresources2 as "navSectionResources" }