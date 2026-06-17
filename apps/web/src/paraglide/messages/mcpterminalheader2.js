/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpterminalheader2Inputs */

const en_mcpterminalheader2 = /** @type {(inputs: Mcpterminalheader2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`agent session`)
};

const es_mcpterminalheader2 = /** @type {(inputs: Mcpterminalheader2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`sesión del agente`)
};

const zh_mcpterminalheader2 = /** @type {(inputs: Mcpterminalheader2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`代理会话`)
};

const ja_mcpterminalheader2 = /** @type {(inputs: Mcpterminalheader2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`エージェントセッション`)
};

const ko_mcpterminalheader2 = /** @type {(inputs: Mcpterminalheader2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`에이전트 세션`)
};

const zh_hant1_mcpterminalheader2 = /** @type {(inputs: Mcpterminalheader2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`代理會話`)
};

const de_mcpterminalheader2 = /** @type {(inputs: Mcpterminalheader2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Agentensitzung`)
};

const fr_mcpterminalheader2 = /** @type {(inputs: Mcpterminalheader2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`session d'agent`)
};

/**
* | output |
* | --- |
* | "agent session" |
*
* @param {Mcpterminalheader2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const mcpterminalheader2 = /** @type {((inputs?: Mcpterminalheader2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpterminalheader2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpterminalheader2(inputs)
	if (locale === "es") return es_mcpterminalheader2(inputs)
	if (locale === "zh") return zh_mcpterminalheader2(inputs)
	if (locale === "ja") return ja_mcpterminalheader2(inputs)
	if (locale === "ko") return ko_mcpterminalheader2(inputs)
	if (locale === "zh-Hant") return zh_hant1_mcpterminalheader2(inputs)
	if (locale === "de") return de_mcpterminalheader2(inputs)
	return fr_mcpterminalheader2(inputs)
});
export { mcpterminalheader2 as "mcpTerminalHeader" }