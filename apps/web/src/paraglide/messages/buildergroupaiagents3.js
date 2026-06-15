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

/**
* | output |
* | --- |
* | "AI Agents" |
*
* @param {Buildergroupaiagents3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const buildergroupaiagents3 = /** @type {((inputs?: Buildergroupaiagents3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildergroupaiagents3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildergroupaiagents3(inputs)
	if (locale === "es") return es_buildergroupaiagents3(inputs)
	return zh_buildergroupaiagents3(inputs)
});
export { buildergroupaiagents3 as "builderGroupAiAgents" }