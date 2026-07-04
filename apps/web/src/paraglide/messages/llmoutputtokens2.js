/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Llmoutputtokens2Inputs */

const en_llmoutputtokens2 = /** @type {(inputs: Llmoutputtokens2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Output tokens per scaffold`)
};

const es_llmoutputtokens2 = /** @type {(inputs: Llmoutputtokens2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tokens de salida por scaffold`)
};

const zh_llmoutputtokens2 = /** @type {(inputs: Llmoutputtokens2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`每次 scaffold 输出 tokens`)
};

const ja_llmoutputtokens2 = /** @type {(inputs: Llmoutputtokens2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`スキャフォールドごとの出力トークン`)
};

const ko_llmoutputtokens2 = /** @type {(inputs: Llmoutputtokens2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`스캐폴드당 출력 토큰`)
};

const zh_hant1_llmoutputtokens2 = /** @type {(inputs: Llmoutputtokens2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`每次 scaffold 輸出 tokens`)
};

const de_llmoutputtokens2 = /** @type {(inputs: Llmoutputtokens2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ausgabetoken pro Gerüst`)
};

const fr_llmoutputtokens2 = /** @type {(inputs: Llmoutputtokens2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Jetons de sortie par échafaudage`)
};

/**
* | output |
* | --- |
* | "Output tokens per scaffold" |
*
* @param {Llmoutputtokens2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const llmoutputtokens2 = /** @type {((inputs?: Llmoutputtokens2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Llmoutputtokens2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_llmoutputtokens2(inputs)
	if (locale === "es") return es_llmoutputtokens2(inputs)
	if (locale === "zh") return zh_llmoutputtokens2(inputs)
	if (locale === "ja") return ja_llmoutputtokens2(inputs)
	if (locale === "ko") return ko_llmoutputtokens2(inputs)
	if (locale === "zh-Hant") return zh_hant1_llmoutputtokens2(inputs)
	if (locale === "de") return de_llmoutputtokens2(inputs)
	return fr_llmoutputtokens2(inputs)
});
export { llmoutputtokens2 as "llmOutputTokens" }