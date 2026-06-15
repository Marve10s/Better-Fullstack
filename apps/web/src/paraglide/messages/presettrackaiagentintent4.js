/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presettrackaiagentintent4Inputs */

const en_presettrackaiagentintent4 = /** @type {(inputs: Presettrackaiagentintent4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Build with agents`)
};

const es_presettrackaiagentintent4 = /** @type {(inputs: Presettrackaiagentintent4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Construir con agentes`)
};

const zh_presettrackaiagentintent4 = /** @type {(inputs: Presettrackaiagentintent4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`使用代理构建`)
};

/**
* | output |
* | --- |
* | "Build with agents" |
*
* @param {Presettrackaiagentintent4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const presettrackaiagentintent4 = /** @type {((inputs?: Presettrackaiagentintent4Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presettrackaiagentintent4Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_presettrackaiagentintent4(inputs)
	if (locale === "es") return es_presettrackaiagentintent4(inputs)
	return zh_presettrackaiagentintent4(inputs)
});
export { presettrackaiagentintent4 as "presetTrackAiAgentIntent" }