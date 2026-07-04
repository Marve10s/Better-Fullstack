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

const ja_llmpathpromptshort3 = /** @type {(inputs: Llmpathpromptshort3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`プロンプト`)
};

const ko_llmpathpromptshort3 = /** @type {(inputs: Llmpathpromptshort3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`즉각적인`)
};

const zh_hant1_llmpathpromptshort3 = /** @type {(inputs: Llmpathpromptshort3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Prompt`)
};

const de_llmpathpromptshort3 = /** @type {(inputs: Llmpathpromptshort3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Prompt`)
};

const fr_llmpathpromptshort3 = /** @type {(inputs: Llmpathpromptshort3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Rapide`)
};

/**
* | output |
* | --- |
* | "Prompt" |
*
* @param {Llmpathpromptshort3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const llmpathpromptshort3 = /** @type {((inputs?: Llmpathpromptshort3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Llmpathpromptshort3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_llmpathpromptshort3(inputs)
	if (locale === "es") return es_llmpathpromptshort3(inputs)
	if (locale === "zh") return zh_llmpathpromptshort3(inputs)
	if (locale === "ja") return ja_llmpathpromptshort3(inputs)
	if (locale === "ko") return ko_llmpathpromptshort3(inputs)
	if (locale === "zh-Hant") return zh_hant1_llmpathpromptshort3(inputs)
	if (locale === "de") return de_llmpathpromptshort3(inputs)
	return fr_llmpathpromptshort3(inputs)
});
export { llmpathpromptshort3 as "llmPathPromptShort" }