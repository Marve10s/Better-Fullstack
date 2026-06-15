/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Llmpathpromptshort3Inputs */

const en_llmpathpromptshort3 = /** @type {(inputs: Llmpathpromptshort3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Prompt`)
};

const es_llmpathpromptshort3 = /** @type {(inputs: Llmpathpromptshort3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Prompt`)
};

const zh_llmpathpromptshort3 = /** @type {(inputs: Llmpathpromptshort3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Prompt`)
};

/**
* | output |
* | --- |
* | "Prompt" |
*
* @param {Llmpathpromptshort3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const llmpathpromptshort3 = /** @type {((inputs?: Llmpathpromptshort3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Llmpathpromptshort3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_llmpathpromptshort3(inputs)
	if (locale === "es") return es_llmpathpromptshort3(inputs)
	return zh_llmpathpromptshort3(inputs)
});
export { llmpathpromptshort3 as "llmPathPromptShort" }