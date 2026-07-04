/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Comparegroupbackend2Inputs */

const en_comparegroupbackend2 = /** @type {(inputs: Comparegroupbackend2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Backend`)
};

const es_comparegroupbackend2 = /** @type {(inputs: Comparegroupbackend2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Backend`)
};

const zh_comparegroupbackend2 = /** @type {(inputs: Comparegroupbackend2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`后端`)
};

const ja_comparegroupbackend2 = /** @type {(inputs: Comparegroupbackend2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`バックエンド`)
};

const ko_comparegroupbackend2 = /** @type {(inputs: Comparegroupbackend2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`백엔드`)
};

const zh_hant1_comparegroupbackend2 = /** @type {(inputs: Comparegroupbackend2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`後端`)
};

const de_comparegroupbackend2 = /** @type {(inputs: Comparegroupbackend2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Backend`)
};

const fr_comparegroupbackend2 = /** @type {(inputs: Comparegroupbackend2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Back-end`)
};

/**
* | output |
* | --- |
* | "Backend" |
*
* @param {Comparegroupbackend2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const comparegroupbackend2 = /** @type {((inputs?: Comparegroupbackend2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comparegroupbackend2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_comparegroupbackend2(inputs)
	if (locale === "es") return es_comparegroupbackend2(inputs)
	if (locale === "zh") return zh_comparegroupbackend2(inputs)
	if (locale === "ja") return ja_comparegroupbackend2(inputs)
	if (locale === "ko") return ko_comparegroupbackend2(inputs)
	if (locale === "zh-Hant") return zh_hant1_comparegroupbackend2(inputs)
	if (locale === "de") return de_comparegroupbackend2(inputs)
	return fr_comparegroupbackend2(inputs)
});
export { comparegroupbackend2 as "compareGroupBackend" }