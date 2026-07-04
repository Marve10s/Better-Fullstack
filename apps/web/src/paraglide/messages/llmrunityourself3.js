/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Llmrunityourself3Inputs */

const en_llmrunityourself3 = /** @type {(inputs: Llmrunityourself3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Run it yourself`)
};

const es_llmrunityourself3 = /** @type {(inputs: Llmrunityourself3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ejecútalo tú mismo`)
};

const zh_llmrunityourself3 = /** @type {(inputs: Llmrunityourself3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`自己运行`)
};

const ja_llmrunityourself3 = /** @type {(inputs: Llmrunityourself3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`自分で実行してください`)
};

const ko_llmrunityourself3 = /** @type {(inputs: Llmrunityourself3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`직접 실행해 보세요`)
};

const zh_hant1_llmrunityourself3 = /** @type {(inputs: Llmrunityourself3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`自己運行`)
};

const de_llmrunityourself3 = /** @type {(inputs: Llmrunityourself3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Führen Sie es selbst aus`)
};

const fr_llmrunityourself3 = /** @type {(inputs: Llmrunityourself3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Gérez-le vous-même`)
};

/**
* | output |
* | --- |
* | "Run it yourself" |
*
* @param {Llmrunityourself3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const llmrunityourself3 = /** @type {((inputs?: Llmrunityourself3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Llmrunityourself3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_llmrunityourself3(inputs)
	if (locale === "es") return es_llmrunityourself3(inputs)
	if (locale === "zh") return zh_llmrunityourself3(inputs)
	if (locale === "ja") return ja_llmrunityourself3(inputs)
	if (locale === "ko") return ko_llmrunityourself3(inputs)
	if (locale === "zh-Hant") return zh_hant1_llmrunityourself3(inputs)
	if (locale === "de") return de_llmrunityourself3(inputs)
	return fr_llmrunityourself3(inputs)
});
export { llmrunityourself3 as "llmRunItYourself" }