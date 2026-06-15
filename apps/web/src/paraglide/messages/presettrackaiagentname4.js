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

/**
* | output |
* | --- |
* | "AI Agent App" |
*
* @param {Presettrackaiagentname4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const presettrackaiagentname4 = /** @type {((inputs?: Presettrackaiagentname4Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presettrackaiagentname4Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_presettrackaiagentname4(inputs)
	if (locale === "es") return es_presettrackaiagentname4(inputs)
	return zh_presettrackaiagentname4(inputs)
});
export { presettrackaiagentname4 as "presetTrackAiAgentName" }