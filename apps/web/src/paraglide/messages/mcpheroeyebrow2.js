/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpheroeyebrow2Inputs */

const en_mcpheroeyebrow2 = /** @type {(inputs: Mcpheroeyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`agent integration`)
};

const es_mcpheroeyebrow2 = /** @type {(inputs: Mcpheroeyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`integración de agentes`)
};

const zh_mcpheroeyebrow2 = /** @type {(inputs: Mcpheroeyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`代理集成`)
};

const ja_mcpheroeyebrow2 = /** @type {(inputs: Mcpheroeyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`エージェントの統合`)
};

const ko_mcpheroeyebrow2 = /** @type {(inputs: Mcpheroeyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`에이전트 통합`)
};

const zh_hant1_mcpheroeyebrow2 = /** @type {(inputs: Mcpheroeyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`代理集成`)
};

const de_mcpheroeyebrow2 = /** @type {(inputs: Mcpheroeyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Agentenintegration`)
};

const fr_mcpheroeyebrow2 = /** @type {(inputs: Mcpheroeyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`intégration d'agents`)
};

/**
* | output |
* | --- |
* | "agent integration" |
*
* @param {Mcpheroeyebrow2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const mcpheroeyebrow2 = /** @type {((inputs?: Mcpheroeyebrow2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpheroeyebrow2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpheroeyebrow2(inputs)
	if (locale === "es") return es_mcpheroeyebrow2(inputs)
	if (locale === "zh") return zh_mcpheroeyebrow2(inputs)
	if (locale === "ja") return ja_mcpheroeyebrow2(inputs)
	if (locale === "ko") return ko_mcpheroeyebrow2(inputs)
	if (locale === "zh-Hant") return zh_hant1_mcpheroeyebrow2(inputs)
	if (locale === "de") return de_mcpheroeyebrow2(inputs)
	return fr_mcpheroeyebrow2(inputs)
});
export { mcpheroeyebrow2 as "mcpHeroEyebrow" }