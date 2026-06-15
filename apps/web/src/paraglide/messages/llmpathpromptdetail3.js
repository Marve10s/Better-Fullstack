/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Llmpathpromptdetail3Inputs */

const en_llmpathpromptdetail3 = /** @type {(inputs: Llmpathpromptdetail3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`no Better-Fullstack — agent hand-writes every file`)
};

const es_llmpathpromptdetail3 = /** @type {(inputs: Llmpathpromptdetail3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`sin Better-Fullstack: el agente escribe cada archivo a mano`)
};

const zh_llmpathpromptdetail3 = /** @type {(inputs: Llmpathpromptdetail3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`不使用 Better-Fullstack：代理手写每个文件`)
};

/**
* | output |
* | --- |
* | "no Better-Fullstack — agent hand-writes every file" |
*
* @param {Llmpathpromptdetail3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const llmpathpromptdetail3 = /** @type {((inputs?: Llmpathpromptdetail3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Llmpathpromptdetail3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_llmpathpromptdetail3(inputs)
	if (locale === "es") return es_llmpathpromptdetail3(inputs)
	return zh_llmpathpromptdetail3(inputs)
});
export { llmpathpromptdetail3 as "llmPathPromptDetail" }