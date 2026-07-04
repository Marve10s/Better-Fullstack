/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Llmtokens1Inputs */

const en_llmtokens1 = /** @type {(inputs: Llmtokens1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tokens`)
};

const es_llmtokens1 = /** @type {(inputs: Llmtokens1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tokens`)
};

const zh_llmtokens1 = /** @type {(inputs: Llmtokens1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tokens`)
};

const ja_llmtokens1 = /** @type {(inputs: Llmtokens1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`トークン`)
};

const ko_llmtokens1 = /** @type {(inputs: Llmtokens1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`토큰`)
};

const zh_hant1_llmtokens1 = /** @type {(inputs: Llmtokens1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tokens`)
};

const de_llmtokens1 = /** @type {(inputs: Llmtokens1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Token`)
};

const fr_llmtokens1 = /** @type {(inputs: Llmtokens1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Jetons`)
};

/**
* | output |
* | --- |
* | "Tokens" |
*
* @param {Llmtokens1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const llmtokens1 = /** @type {((inputs?: Llmtokens1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Llmtokens1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_llmtokens1(inputs)
	if (locale === "es") return es_llmtokens1(inputs)
	if (locale === "zh") return zh_llmtokens1(inputs)
	if (locale === "ja") return ja_llmtokens1(inputs)
	if (locale === "ko") return ko_llmtokens1(inputs)
	if (locale === "zh-Hant") return zh_hant1_llmtokens1(inputs)
	if (locale === "de") return de_llmtokens1(inputs)
	return fr_llmtokens1(inputs)
});
export { llmtokens1 as "llmTokens" }