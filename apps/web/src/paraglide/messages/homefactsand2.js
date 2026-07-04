/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ mantissa: NonNullable<unknown>, exponent: NonNullable<unknown> }} Homefactsand2Inputs */

const en_homefactsand2 = /** @type {(inputs: Homefactsand2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.mantissa} × 10^${i?.exponent}× more combinations than grains of sand in the observable universe`)
};

const es_homefactsand2 = /** @type {(inputs: Homefactsand2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.mantissa} × 10^${i?.exponent}× más combinaciones que granos de arena en el universo observable`)
};

const zh_homefactsand2 = /** @type {(inputs: Homefactsand2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`组合数比可观测宇宙中的沙粒多 ${i?.mantissa} × 10^${i?.exponent}×`)
};

const ja_homefactsand2 = /** @type {(inputs: Homefactsand2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.mantissa} × 10^${i?.exponent} × 観測可能な宇宙の砂粒よりも多い組み合わせ`)
};

const ko_homefactsand2 = /** @type {(inputs: Homefactsand2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.mantissa} × 10^${i?.exponent}× 관측 가능한 우주의 모래알보다 더 많은 조합`)
};

const zh_hant1_homefactsand2 = /** @type {(inputs: Homefactsand2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`組合數比可觀測宇宙中的沙粒多 ${i?.mantissa} × 10^${i?.exponent}×`)
};

const de_homefactsand2 = /** @type {(inputs: Homefactsand2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.mantissa} × 10^${i?.exponent}× mehr Kombinationen als Sandkörner im beobachtbaren Universum`)
};

const fr_homefactsand2 = /** @type {(inputs: Homefactsand2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.mantissa} × 10^${i?.exponent}× plus de combinaisons que de grains de sable dans l'univers observable`)
};

/**
* | output |
* | --- |
* | "{mantissa} × 10^{exponent}× more combinations than grains of sand in the observable universe" |
*
* @param {Homefactsand2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const homefactsand2 = /** @type {((inputs: Homefactsand2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homefactsand2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homefactsand2(inputs)
	if (locale === "es") return es_homefactsand2(inputs)
	if (locale === "zh") return zh_homefactsand2(inputs)
	if (locale === "ja") return ja_homefactsand2(inputs)
	if (locale === "ko") return ko_homefactsand2(inputs)
	if (locale === "zh-Hant") return zh_hant1_homefactsand2(inputs)
	if (locale === "de") return de_homefactsand2(inputs)
	return fr_homefactsand2(inputs)
});
export { homefactsand2 as "homeFactSand" }