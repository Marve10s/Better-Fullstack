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

const ja_presettrackaiagentintent4 = /** @type {(inputs: Presettrackaiagentintent4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`エージェントを使用して構築する`)
};

const ko_presettrackaiagentintent4 = /** @type {(inputs: Presettrackaiagentintent4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`에이전트로 구축`)
};

const zh_hant1_presettrackaiagentintent4 = /** @type {(inputs: Presettrackaiagentintent4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`使用代理構建`)
};

const de_presettrackaiagentintent4 = /** @type {(inputs: Presettrackaiagentintent4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bauen Sie mit Agenten`)
};

const fr_presettrackaiagentintent4 = /** @type {(inputs: Presettrackaiagentintent4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Construire avec des agents`)
};

/**
* | output |
* | --- |
* | "Build with agents" |
*
* @param {Presettrackaiagentintent4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const presettrackaiagentintent4 = /** @type {((inputs?: Presettrackaiagentintent4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presettrackaiagentintent4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_presettrackaiagentintent4(inputs)
	if (locale === "es") return es_presettrackaiagentintent4(inputs)
	if (locale === "zh") return zh_presettrackaiagentintent4(inputs)
	if (locale === "ja") return ja_presettrackaiagentintent4(inputs)
	if (locale === "ko") return ko_presettrackaiagentintent4(inputs)
	if (locale === "zh-Hant") return zh_hant1_presettrackaiagentintent4(inputs)
	if (locale === "de") return de_presettrackaiagentintent4(inputs)
	return fr_presettrackaiagentintent4(inputs)
});
export { presettrackaiagentintent4 as "presetTrackAiAgentIntent" }