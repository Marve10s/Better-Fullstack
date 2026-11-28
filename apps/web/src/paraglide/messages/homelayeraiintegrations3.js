/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homelayeraiintegrations3Inputs */



/**
* | output |
* | --- |
* | "AI integrations" |
*
* @param {Homelayeraiintegrations3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homelayeraiintegrations3 = /** @type {((inputs?: Homelayeraiintegrations3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homelayeraiintegrations3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Integraciones de IA")
	if (locale === "zh") return /** @type {LocalizedString} */ ("AI 集成")
	if (locale === "ja") return /** @type {LocalizedString} */ ("AI 統合")
	if (locale === "ko") return /** @type {LocalizedString} */ ("AI 통합")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("AI 集成")
	if (locale === "de") return /** @type {LocalizedString} */ ("AI-Integrationen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Intégrations AI")
	if (locale === "uk") return /** @type {LocalizedString} */ ("AI-інтеграції")
	return /** @type {LocalizedString} */ ("AI integrations")
});
export { homelayeraiintegrations3 as "homeLayerAiIntegrations" }