/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpstatfasterpromptonly4Inputs */

const en_mcpstatfasterpromptonly4 = /** @type {(inputs: Mcpstatfasterpromptonly4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`faster than prompt-only`)
};

const es_mcpstatfasterpromptonly4 = /** @type {(inputs: Mcpstatfasterpromptonly4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`más rápido que solo prompt`)
};

const zh_mcpstatfasterpromptonly4 = /** @type {(inputs: Mcpstatfasterpromptonly4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`比纯 prompt 更快`)
};

const ja_mcpstatfasterpromptonly4 = /** @type {(inputs: Mcpstatfasterpromptonly4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`プロンプトのみよりも高速`)
};

const ko_mcpstatfasterpromptonly4 = /** @type {(inputs: Mcpstatfasterpromptonly4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`프롬프트 전용보다 빠릅니다.`)
};

const zh_hant1_mcpstatfasterpromptonly4 = /** @type {(inputs: Mcpstatfasterpromptonly4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`比純 prompt 更快`)
};

const de_mcpstatfasterpromptonly4 = /** @type {(inputs: Mcpstatfasterpromptonly4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`schneller als nur per Prompt`)
};

const fr_mcpstatfasterpromptonly4 = /** @type {(inputs: Mcpstatfasterpromptonly4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`plus rapide que l'invite uniquement`)
};

const uk_mcpstatfasterpromptonly4 = /** @type {(inputs: Mcpstatfasterpromptonly4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`швидше за prompt-only`)
};

/**
* | output |
* | --- |
* | "faster than prompt-only" |
*
* @param {Mcpstatfasterpromptonly4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const mcpstatfasterpromptonly4 = /** @type {((inputs?: Mcpstatfasterpromptonly4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpstatfasterpromptonly4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_mcpstatfasterpromptonly4(inputs)
	if (locale === "zh") return zh_mcpstatfasterpromptonly4(inputs)
	if (locale === "ja") return ja_mcpstatfasterpromptonly4(inputs)
	if (locale === "ko") return ko_mcpstatfasterpromptonly4(inputs)
	if (locale === "zh-Hant") return zh_hant1_mcpstatfasterpromptonly4(inputs)
	if (locale === "de") return de_mcpstatfasterpromptonly4(inputs)
	if (locale === "fr") return fr_mcpstatfasterpromptonly4(inputs)
	if (locale === "uk") return uk_mcpstatfasterpromptonly4(inputs)
	return en_mcpstatfasterpromptonly4(inputs)
});
export { mcpstatfasterpromptonly4 as "mcpStatFasterPromptOnly" }