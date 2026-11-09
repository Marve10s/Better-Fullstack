/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpstatconfigurableoptions3Inputs */



/**
* | output |
* | --- |
* | "configurable options" |
*
* @param {Mcpstatconfigurableoptions3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const mcpstatconfigurableoptions3 = /** @type {((inputs?: Mcpstatconfigurableoptions3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpstatconfigurableoptions3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("opciones configurables")
	if (locale === "zh") return /** @type {LocalizedString} */ ("可配置选项")
	if (locale === "ja") return /** @type {LocalizedString} */ ("構成可能なオプション")
	if (locale === "ko") return /** @type {LocalizedString} */ ("구성 가능한 옵션")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("可配置選項")
	if (locale === "de") return /** @type {LocalizedString} */ ("konfigurierbare Optionen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("options configurables")
	if (locale === "uk") return /** @type {LocalizedString} */ ("настроювані параметри")
	return /** @type {LocalizedString} */ ("configurable options")
});
export { mcpstatconfigurableoptions3 as "mcpStatConfigurableOptions" }