/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docssectionai2Inputs */

const en_docssectionai2 = /** @type {(inputs: Docssectionai2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`AI Agents`)
};

const es_docssectionai2 = /** @type {(inputs: Docssectionai2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Agentes de IA`)
};

const zh_docssectionai2 = /** @type {(inputs: Docssectionai2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`AI 代理`)
};

const ja_docssectionai2 = /** @type {(inputs: Docssectionai2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`AI エージェント`)
};

const ko_docssectionai2 = /** @type {(inputs: Docssectionai2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`AI 에이전트`)
};

const zh_hant1_docssectionai2 = /** @type {(inputs: Docssectionai2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`AI 代理`)
};

const de_docssectionai2 = /** @type {(inputs: Docssectionai2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`AI Agenten`)
};

const fr_docssectionai2 = /** @type {(inputs: Docssectionai2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`AIAgents`)
};

/**
* | output |
* | --- |
* | "AI Agents" |
*
* @param {Docssectionai2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const docssectionai2 = /** @type {((inputs?: Docssectionai2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docssectionai2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_docssectionai2(inputs)
	if (locale === "es") return es_docssectionai2(inputs)
	if (locale === "zh") return zh_docssectionai2(inputs)
	if (locale === "ja") return ja_docssectionai2(inputs)
	if (locale === "ko") return ko_docssectionai2(inputs)
	if (locale === "zh-Hant") return zh_hant1_docssectionai2(inputs)
	if (locale === "de") return de_docssectionai2(inputs)
	return fr_docssectionai2(inputs)
});
export { docssectionai2 as "docsSectionAi" }