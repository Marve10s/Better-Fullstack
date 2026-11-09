/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compareaiintegrations2Inputs */



/**
* | output |
* | --- |
* | "AI / LLM integrations" |
*
* @param {Compareaiintegrations2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const compareaiintegrations2 = /** @type {((inputs?: Compareaiintegrations2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compareaiintegrations2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Integraciones de IA / LLM")
	if (locale === "zh") return /** @type {LocalizedString} */ ("AI / LLM 集成")
	if (locale === "ja") return /** @type {LocalizedString} */ ("AI / LLM 統合")
	if (locale === "ko") return /** @type {LocalizedString} */ ("AI / LLM 통합")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("AI / LLM 整合")
	if (locale === "de") return /** @type {LocalizedString} */ ("AI / LLM-Integrationen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("AI / Intégrations LLM")
	if (locale === "uk") return /** @type {LocalizedString} */ ("AI / LLM-інтеграції")
	return /** @type {LocalizedString} */ ("AI / LLM integrations")
});
export { compareaiintegrations2 as "compareAiIntegrations" }