/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpfinaltitleemphasis3Inputs */

const en_mcpfinaltitleemphasis3 = /** @type {(inputs: Mcpfinaltitleemphasis3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`prompt-only.`)
};

const es_mcpfinaltitleemphasis3 = /** @type {(inputs: Mcpfinaltitleemphasis3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`solo prompt.`)
};

const zh_mcpfinaltitleemphasis3 = /** @type {(inputs: Mcpfinaltitleemphasis3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`纯 prompt 快 2.6×。`)
};

const ja_mcpfinaltitleemphasis3 = /** @type {(inputs: Mcpfinaltitleemphasis3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`プロンプトのみ。`)
};

const ko_mcpfinaltitleemphasis3 = /** @type {(inputs: Mcpfinaltitleemphasis3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`프롬프트 전용.`)
};

const zh_hant1_mcpfinaltitleemphasis3 = /** @type {(inputs: Mcpfinaltitleemphasis3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`純 prompt 快 2.6×。`)
};

const de_mcpfinaltitleemphasis3 = /** @type {(inputs: Mcpfinaltitleemphasis3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Nur mit Eingabeaufforderung.`)
};

const fr_mcpfinaltitleemphasis3 = /** @type {(inputs: Mcpfinaltitleemphasis3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`invite uniquement.`)
};

/**
* | output |
* | --- |
* | "prompt-only." |
*
* @param {Mcpfinaltitleemphasis3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const mcpfinaltitleemphasis3 = /** @type {((inputs?: Mcpfinaltitleemphasis3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpfinaltitleemphasis3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpfinaltitleemphasis3(inputs)
	if (locale === "es") return es_mcpfinaltitleemphasis3(inputs)
	if (locale === "zh") return zh_mcpfinaltitleemphasis3(inputs)
	if (locale === "ja") return ja_mcpfinaltitleemphasis3(inputs)
	if (locale === "ko") return ko_mcpfinaltitleemphasis3(inputs)
	if (locale === "zh-Hant") return zh_hant1_mcpfinaltitleemphasis3(inputs)
	if (locale === "de") return de_mcpfinaltitleemphasis3(inputs)
	return fr_mcpfinaltitleemphasis3(inputs)
});
export { mcpfinaltitleemphasis3 as "mcpFinalTitleEmphasis" }