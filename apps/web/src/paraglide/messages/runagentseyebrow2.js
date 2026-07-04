/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Runagentseyebrow2Inputs */

const en_runagentseyebrow2 = /** @type {(inputs: Runagentseyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Agents & models`)
};

const es_runagentseyebrow2 = /** @type {(inputs: Runagentseyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Agentes y modelos`)
};

const zh_runagentseyebrow2 = /** @type {(inputs: Runagentseyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`经纪人和模特`)
};

const ja_runagentseyebrow2 = /** @type {(inputs: Runagentseyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`エージェントとモデル`)
};

const ko_runagentseyebrow2 = /** @type {(inputs: Runagentseyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`에이전트 및 모델`)
};

const zh_hant1_runagentseyebrow2 = /** @type {(inputs: Runagentseyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`經紀人和模特兒`)
};

const de_runagentseyebrow2 = /** @type {(inputs: Runagentseyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Agenten &amp; Models`)
};

const fr_runagentseyebrow2 = /** @type {(inputs: Runagentseyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Agents et mannequins`)
};

/**
* | output |
* | --- |
* | "Agents & models" |
*
* @param {Runagentseyebrow2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const runagentseyebrow2 = /** @type {((inputs?: Runagentseyebrow2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Runagentseyebrow2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_runagentseyebrow2(inputs)
	if (locale === "es") return es_runagentseyebrow2(inputs)
	if (locale === "zh") return zh_runagentseyebrow2(inputs)
	if (locale === "ja") return ja_runagentseyebrow2(inputs)
	if (locale === "ko") return ko_runagentseyebrow2(inputs)
	if (locale === "zh-Hant") return zh_hant1_runagentseyebrow2(inputs)
	if (locale === "de") return de_runagentseyebrow2(inputs)
	return fr_runagentseyebrow2(inputs)
});
export { runagentseyebrow2 as "runAgentsEyebrow" }