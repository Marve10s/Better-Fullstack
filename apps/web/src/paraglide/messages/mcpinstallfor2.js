/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpinstallfor2Inputs */

const en_mcpinstallfor2 = /** @type {(inputs: Mcpinstallfor2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Install for`)
};

const es_mcpinstallfor2 = /** @type {(inputs: Mcpinstallfor2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Instalar para`)
};

const zh_mcpinstallfor2 = /** @type {(inputs: Mcpinstallfor2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`安装到`)
};

const ja_mcpinstallfor2 = /** @type {(inputs: Mcpinstallfor2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`インストール対象`)
};

const ko_mcpinstallfor2 = /** @type {(inputs: Mcpinstallfor2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`설치 대상`)
};

const zh_hant1_mcpinstallfor2 = /** @type {(inputs: Mcpinstallfor2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`安裝到`)
};

const de_mcpinstallfor2 = /** @type {(inputs: Mcpinstallfor2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Installieren für`)
};

const fr_mcpinstallfor2 = /** @type {(inputs: Mcpinstallfor2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Installer pour`)
};

/**
* | output |
* | --- |
* | "Install for" |
*
* @param {Mcpinstallfor2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const mcpinstallfor2 = /** @type {((inputs?: Mcpinstallfor2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpinstallfor2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpinstallfor2(inputs)
	if (locale === "es") return es_mcpinstallfor2(inputs)
	if (locale === "zh") return zh_mcpinstallfor2(inputs)
	if (locale === "ja") return ja_mcpinstallfor2(inputs)
	if (locale === "ko") return ko_mcpinstallfor2(inputs)
	if (locale === "zh-Hant") return zh_hant1_mcpinstallfor2(inputs)
	if (locale === "de") return de_mcpinstallfor2(inputs)
	return fr_mcpinstallfor2(inputs)
});
export { mcpinstallfor2 as "mcpInstallFor" }