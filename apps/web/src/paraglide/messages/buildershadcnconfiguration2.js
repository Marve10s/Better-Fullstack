/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildershadcnconfiguration2Inputs */



/**
* | output |
* | --- |
* | "shadcn/ui Configuration" |
*
* @param {Buildershadcnconfiguration2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildershadcnconfiguration2 = /** @type {((inputs?: Buildershadcnconfiguration2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildershadcnconfiguration2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Configuración de shadcn/ui")
	if (locale === "zh") return /** @type {LocalizedString} */ ("shadcn/ui 配置")
	if (locale === "ja") return /** @type {LocalizedString} */ ("shadcn/ui 構成")
	if (locale === "ko") return /** @type {LocalizedString} */ ("shadcn/ui 구성")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("shadcn/ui 配置")
	if (locale === "de") return /** @type {LocalizedString} */ ("shadcn/ui Konfiguration")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Configuration shadcn/ui")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Налаштування shadcn/ui")
	return /** @type {LocalizedString} */ ("shadcn/ui Configuration")
});
export { buildershadcnconfiguration2 as "builderShadcnConfiguration" }