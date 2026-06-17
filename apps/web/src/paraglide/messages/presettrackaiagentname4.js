/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presettrackaiagentname4Inputs */

const en_presettrackaiagentname4 = /** @type {(inputs: Presettrackaiagentname4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`AI Agent App`)
};

const es_presettrackaiagentname4 = /** @type {(inputs: Presettrackaiagentname4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`App de agente de IA`)
};

const zh_presettrackaiagentname4 = /** @type {(inputs: Presettrackaiagentname4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`AI 代理应用`)
};

const ja_presettrackaiagentname4 = /** @type {(inputs: Presettrackaiagentname4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`AI エージェント アプリ`)
};

const ko_presettrackaiagentname4 = /** @type {(inputs: Presettrackaiagentname4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`AI 에이전트 앱`)
};

const zh_hant1_presettrackaiagentname4 = /** @type {(inputs: Presettrackaiagentname4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`AI 代理應用`)
};

const de_presettrackaiagentname4 = /** @type {(inputs: Presettrackaiagentname4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`AI Agent-App`)
};

const fr_presettrackaiagentname4 = /** @type {(inputs: Presettrackaiagentname4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`AI Application d'agent`)
};

/**
* | output |
* | --- |
* | "AI Agent App" |
*
* @param {Presettrackaiagentname4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const presettrackaiagentname4 = /** @type {((inputs?: Presettrackaiagentname4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presettrackaiagentname4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_presettrackaiagentname4(inputs)
	if (locale === "es") return es_presettrackaiagentname4(inputs)
	if (locale === "zh") return zh_presettrackaiagentname4(inputs)
	if (locale === "ja") return ja_presettrackaiagentname4(inputs)
	if (locale === "ko") return ko_presettrackaiagentname4(inputs)
	if (locale === "zh-Hant") return zh_hant1_presettrackaiagentname4(inputs)
	if (locale === "de") return de_presettrackaiagentname4(inputs)
	return fr_presettrackaiagentname4(inputs)
});
export { presettrackaiagentname4 as "presetTrackAiAgentName" }