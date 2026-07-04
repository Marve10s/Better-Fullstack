/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildergroupaiagents3Inputs */

const en_buildergroupaiagents3 = /** @type {(inputs: Buildergroupaiagents3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`AI Agents`)
};

const es_buildergroupaiagents3 = /** @type {(inputs: Buildergroupaiagents3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Agentes de IA`)
};

const zh_buildergroupaiagents3 = /** @type {(inputs: Buildergroupaiagents3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`AI 代理`)
};

const ja_buildergroupaiagents3 = /** @type {(inputs: Buildergroupaiagents3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`AI エージェント`)
};

const ko_buildergroupaiagents3 = /** @type {(inputs: Buildergroupaiagents3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`AI 에이전트`)
};

const zh_hant1_buildergroupaiagents3 = /** @type {(inputs: Buildergroupaiagents3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`AI 代理`)
};

const de_buildergroupaiagents3 = /** @type {(inputs: Buildergroupaiagents3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`AI Agenten`)
};

const fr_buildergroupaiagents3 = /** @type {(inputs: Buildergroupaiagents3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`AIAgents`)
};

const uk_buildergroupaiagents3 = /** @type {(inputs: Buildergroupaiagents3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`AI Агенти`)
};

/**
* | output |
* | --- |
* | "AI Agents" |
*
* @param {Buildergroupaiagents3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildergroupaiagents3 = /** @type {((inputs?: Buildergroupaiagents3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildergroupaiagents3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildergroupaiagents3(inputs)
	if (locale === "es") return es_buildergroupaiagents3(inputs)
	if (locale === "zh") return zh_buildergroupaiagents3(inputs)
	if (locale === "ja") return ja_buildergroupaiagents3(inputs)
	if (locale === "ko") return ko_buildergroupaiagents3(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildergroupaiagents3(inputs)
	if (locale === "de") return de_buildergroupaiagents3(inputs)
	if (locale === "fr") return fr_buildergroupaiagents3(inputs)
	return uk_buildergroupaiagents3(inputs)
});
export { buildergroupaiagents3 as "builderGroupAiAgents" }