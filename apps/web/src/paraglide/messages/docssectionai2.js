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

/**
* | output |
* | --- |
* | "AI Agents" |
*
* @param {Docssectionai2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const docssectionai2 = /** @type {((inputs?: Docssectionai2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docssectionai2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_docssectionai2(inputs)
	if (locale === "es") return es_docssectionai2(inputs)
	return zh_docssectionai2(inputs)
});
export { docssectionai2 as "docsSectionAi" }