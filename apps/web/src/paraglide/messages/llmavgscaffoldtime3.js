/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Llmavgscaffoldtime3Inputs */

const en_llmavgscaffoldtime3 = /** @type {(inputs: Llmavgscaffoldtime3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Avg scaffold time`)
};

const es_llmavgscaffoldtime3 = /** @type {(inputs: Llmavgscaffoldtime3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tiempo medio de scaffold`)
};

const zh_llmavgscaffoldtime3 = /** @type {(inputs: Llmavgscaffoldtime3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`平均 scaffold 时间`)
};

const ja_llmavgscaffoldtime3 = /** @type {(inputs: Llmavgscaffoldtime3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`平均足場時間`)
};

const ko_llmavgscaffoldtime3 = /** @type {(inputs: Llmavgscaffoldtime3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`평균 비계 시간`)
};

const zh_hant1_llmavgscaffoldtime3 = /** @type {(inputs: Llmavgscaffoldtime3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`平均 scaffold 時間`)
};

const de_llmavgscaffoldtime3 = /** @type {(inputs: Llmavgscaffoldtime3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Durchschnittliche Gerüstzeit`)
};

const fr_llmavgscaffoldtime3 = /** @type {(inputs: Llmavgscaffoldtime3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Temps moyen d'échafaudage`)
};

/**
* | output |
* | --- |
* | "Avg scaffold time" |
*
* @param {Llmavgscaffoldtime3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const llmavgscaffoldtime3 = /** @type {((inputs?: Llmavgscaffoldtime3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Llmavgscaffoldtime3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_llmavgscaffoldtime3(inputs)
	if (locale === "es") return es_llmavgscaffoldtime3(inputs)
	if (locale === "zh") return zh_llmavgscaffoldtime3(inputs)
	if (locale === "ja") return ja_llmavgscaffoldtime3(inputs)
	if (locale === "ko") return ko_llmavgscaffoldtime3(inputs)
	if (locale === "zh-Hant") return zh_hant1_llmavgscaffoldtime3(inputs)
	if (locale === "de") return de_llmavgscaffoldtime3(inputs)
	return fr_llmavgscaffoldtime3(inputs)
});
export { llmavgscaffoldtime3 as "llmAvgScaffoldTime" }