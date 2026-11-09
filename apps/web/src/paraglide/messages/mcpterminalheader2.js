/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpterminalheader2Inputs */



/**
* | output |
* | --- |
* | "agent session" |
*
* @param {Mcpterminalheader2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const mcpterminalheader2 = /** @type {((inputs?: Mcpterminalheader2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpterminalheader2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("sesión del agente")
	if (locale === "zh") return /** @type {LocalizedString} */ ("代理会话")
	if (locale === "ja") return /** @type {LocalizedString} */ ("エージェントセッション")
	if (locale === "ko") return /** @type {LocalizedString} */ ("에이전트 세션")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("代理會話")
	if (locale === "de") return /** @type {LocalizedString} */ ("Agentensitzung")
	if (locale === "fr") return /** @type {LocalizedString} */ ("session d'agent")
	if (locale === "uk") return /** @type {LocalizedString} */ ("сесія агента")
	return /** @type {LocalizedString} */ ("agent session")
});
export { mcpterminalheader2 as "mcpTerminalHeader" }