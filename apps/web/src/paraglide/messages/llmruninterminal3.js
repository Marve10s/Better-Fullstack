/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Llmruninterminal3Inputs */

const en_llmruninterminal3 = /** @type {(inputs: Llmruninterminal3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`run in your terminal`)
};

const es_llmruninterminal3 = /** @type {(inputs: Llmruninterminal3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ejecuta en tu terminal`)
};

const zh_llmruninterminal3 = /** @type {(inputs: Llmruninterminal3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`在终端运行`)
};

const ja_llmruninterminal3 = /** @type {(inputs: Llmruninterminal3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ターミナルで実行します`)
};

const ko_llmruninterminal3 = /** @type {(inputs: Llmruninterminal3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`터미널에서 실행`)
};

const zh_hant1_llmruninterminal3 = /** @type {(inputs: Llmruninterminal3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`在終端運行`)
};

const de_llmruninterminal3 = /** @type {(inputs: Llmruninterminal3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`in Ihrem Terminal ausführen`)
};

const fr_llmruninterminal3 = /** @type {(inputs: Llmruninterminal3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`exécuter dans votre terminal`)
};

/**
* | output |
* | --- |
* | "run in your terminal" |
*
* @param {Llmruninterminal3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const llmruninterminal3 = /** @type {((inputs?: Llmruninterminal3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Llmruninterminal3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_llmruninterminal3(inputs)
	if (locale === "es") return es_llmruninterminal3(inputs)
	if (locale === "zh") return zh_llmruninterminal3(inputs)
	if (locale === "ja") return ja_llmruninterminal3(inputs)
	if (locale === "ko") return ko_llmruninterminal3(inputs)
	if (locale === "zh-Hant") return zh_hant1_llmruninterminal3(inputs)
	if (locale === "de") return de_llmruninterminal3(inputs)
	return fr_llmruninterminal3(inputs)
});
export { llmruninterminal3 as "llmRunInTerminal" }