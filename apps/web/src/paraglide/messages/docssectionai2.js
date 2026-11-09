/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docssectionai2Inputs */



/**
* | output |
* | --- |
* | "AI Agents" |
*
* @param {Docssectionai2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docssectionai2 = /** @type {((inputs?: Docssectionai2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docssectionai2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Agentes de IA")
	if (locale === "zh") return /** @type {LocalizedString} */ ("AI 代理")
	if (locale === "ja") return /** @type {LocalizedString} */ ("AI エージェント")
	if (locale === "ko") return /** @type {LocalizedString} */ ("AI 에이전트")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("AI 代理")
	if (locale === "de") return /** @type {LocalizedString} */ ("AI Agenten")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Agents AI")
	if (locale === "uk") return /** @type {LocalizedString} */ ("AI-агенти")
	return /** @type {LocalizedString} */ ("AI Agents")
});
export { docssectionai2 as "docsSectionAi" }