/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Llmclaudesweep2Inputs */

const en_llmclaudesweep2 = /** @type {(inputs: Llmclaudesweep2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Jun 12 sweep`)
};

const es_llmclaudesweep2 = /** @type {(inputs: Llmclaudesweep2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Barrido del 12 jun`)
};

const zh_llmclaudesweep2 = /** @type {(inputs: Llmclaudesweep2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`6 月 12 日批测`)
};

const ja_llmclaudesweep2 = /** @type {(inputs: Llmclaudesweep2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`6月12日のスイープ`)
};

const ko_llmclaudesweep2 = /** @type {(inputs: Llmclaudesweep2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`6월 12일 스윕`)
};

const zh_hant1_llmclaudesweep2 = /** @type {(inputs: Llmclaudesweep2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`6 月 12 日批測`)
};

const de_llmclaudesweep2 = /** @type {(inputs: Llmclaudesweep2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`12. Juni fegen`)
};

const fr_llmclaudesweep2 = /** @type {(inputs: Llmclaudesweep2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Balayage du 12 juin`)
};

/**
* | output |
* | --- |
* | "Jun 12 sweep" |
*
* @param {Llmclaudesweep2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const llmclaudesweep2 = /** @type {((inputs?: Llmclaudesweep2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Llmclaudesweep2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_llmclaudesweep2(inputs)
	if (locale === "es") return es_llmclaudesweep2(inputs)
	if (locale === "zh") return zh_llmclaudesweep2(inputs)
	if (locale === "ja") return ja_llmclaudesweep2(inputs)
	if (locale === "ko") return ko_llmclaudesweep2(inputs)
	if (locale === "zh-Hant") return zh_hant1_llmclaudesweep2(inputs)
	if (locale === "de") return de_llmclaudesweep2(inputs)
	return fr_llmclaudesweep2(inputs)
});
export { llmclaudesweep2 as "llmClaudeSweep" }