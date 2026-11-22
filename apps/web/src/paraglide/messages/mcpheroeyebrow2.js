/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpheroeyebrow2Inputs */



/**
* | output |
* | --- |
* | "agent integration" |
*
* @param {Mcpheroeyebrow2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const mcpheroeyebrow2 = /** @type {((inputs?: Mcpheroeyebrow2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpheroeyebrow2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("integración de agentes")
	if (locale === "zh") return /** @type {LocalizedString} */ ("代理集成")
	if (locale === "ja") return /** @type {LocalizedString} */ ("エージェントの統合")
	if (locale === "ko") return /** @type {LocalizedString} */ ("에이전트 통합")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("代理整合")
	if (locale === "de") return /** @type {LocalizedString} */ ("Agentenintegration")
	if (locale === "fr") return /** @type {LocalizedString} */ ("intégration d'agents")
	if (locale === "uk") return /** @type {LocalizedString} */ ("інтеграція агентів")
	return /** @type {LocalizedString} */ ("agent integration")
});
export { mcpheroeyebrow2 as "mcpHeroEyebrow" }