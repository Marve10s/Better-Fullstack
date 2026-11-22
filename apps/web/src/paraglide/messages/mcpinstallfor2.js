/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpinstallfor2Inputs */



/**
* | output |
* | --- |
* | "Install for" |
*
* @param {Mcpinstallfor2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const mcpinstallfor2 = /** @type {((inputs?: Mcpinstallfor2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpinstallfor2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Instalar para")
	if (locale === "zh") return /** @type {LocalizedString} */ ("安装到")
	if (locale === "ja") return /** @type {LocalizedString} */ ("インストール対象")
	if (locale === "ko") return /** @type {LocalizedString} */ ("설치 대상")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("安裝到")
	if (locale === "de") return /** @type {LocalizedString} */ ("Installieren für")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Installer pour")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Встановити для")
	return /** @type {LocalizedString} */ ("Install for")
});
export { mcpinstallfor2 as "mcpInstallFor" }