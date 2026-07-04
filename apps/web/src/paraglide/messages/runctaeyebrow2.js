/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Runctaeyebrow2Inputs */

const en_runctaeyebrow2 = /** @type {(inputs: Runctaeyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Compare`)
};

const es_runctaeyebrow2 = /** @type {(inputs: Runctaeyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Comparar`)
};

const zh_runctaeyebrow2 = /** @type {(inputs: Runctaeyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`比较`)
};

const ja_runctaeyebrow2 = /** @type {(inputs: Runctaeyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`比較する`)
};

const ko_runctaeyebrow2 = /** @type {(inputs: Runctaeyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`비교하다`)
};

const zh_hant1_runctaeyebrow2 = /** @type {(inputs: Runctaeyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`比較`)
};

const de_runctaeyebrow2 = /** @type {(inputs: Runctaeyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Vergleichen`)
};

const fr_runctaeyebrow2 = /** @type {(inputs: Runctaeyebrow2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Comparer`)
};

/**
* | output |
* | --- |
* | "Compare" |
*
* @param {Runctaeyebrow2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const runctaeyebrow2 = /** @type {((inputs?: Runctaeyebrow2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Runctaeyebrow2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_runctaeyebrow2(inputs)
	if (locale === "es") return es_runctaeyebrow2(inputs)
	if (locale === "zh") return zh_runctaeyebrow2(inputs)
	if (locale === "ja") return ja_runctaeyebrow2(inputs)
	if (locale === "ko") return ko_runctaeyebrow2(inputs)
	if (locale === "zh-Hant") return zh_hant1_runctaeyebrow2(inputs)
	if (locale === "de") return de_runctaeyebrow2(inputs)
	return fr_runctaeyebrow2(inputs)
});
export { runctaeyebrow2 as "runCtaEyebrow" }