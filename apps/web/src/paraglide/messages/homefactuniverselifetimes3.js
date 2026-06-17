/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ mantissa: NonNullable<unknown>, exponent: NonNullable<unknown> }} Homefactuniverselifetimes3Inputs */

const en_homefactuniverselifetimes3 = /** @type {(inputs: Homefactuniverselifetimes3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.mantissa} × 10^${i?.exponent} universe lifetimes to test all combinations`)
};

const es_homefactuniverselifetimes3 = /** @type {(inputs: Homefactuniverselifetimes3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.mantissa} × 10^${i?.exponent} vidas del universo para probar todas las combinaciones`)
};

const zh_homefactuniverselifetimes3 = /** @type {(inputs: Homefactuniverselifetimes3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`测试所有组合需要 ${i?.mantissa} × 10^${i?.exponent} 个宇宙寿命`)
};

const ja_homefactuniverselifetimes3 = /** @type {(inputs: Homefactuniverselifetimes3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`すべての組み合わせをテストするための ${i?.mantissa} × 10^${i?.exponent} ユニバースのライフタイム`)
};

const ko_homefactuniverselifetimes3 = /** @type {(inputs: Homefactuniverselifetimes3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.mantissa} × 10^${i?.exponent} 모든 조합을 테스트하기 위한 유니버스 수명`)
};

const zh_hant1_homefactuniverselifetimes3 = /** @type {(inputs: Homefactuniverselifetimes3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`測試所有組合需要 ${i?.mantissa} × 10^${i?.exponent} 個宇宙壽命`)
};

const de_homefactuniverselifetimes3 = /** @type {(inputs: Homefactuniverselifetimes3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.mantissa} × 10^${i?.exponent} Universumslebensdauern zum Testen aller Kombinationen`)
};

const fr_homefactuniverselifetimes3 = /** @type {(inputs: Homefactuniverselifetimes3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.mantissa} × 10^${i?.exponent} durées de vie de l'univers pour tester toutes les combinaisons`)
};

/**
* | output |
* | --- |
* | "{mantissa} × 10^{exponent} universe lifetimes to test all combinations" |
*
* @param {Homefactuniverselifetimes3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const homefactuniverselifetimes3 = /** @type {((inputs: Homefactuniverselifetimes3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homefactuniverselifetimes3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homefactuniverselifetimes3(inputs)
	if (locale === "es") return es_homefactuniverselifetimes3(inputs)
	if (locale === "zh") return zh_homefactuniverselifetimes3(inputs)
	if (locale === "ja") return ja_homefactuniverselifetimes3(inputs)
	if (locale === "ko") return ko_homefactuniverselifetimes3(inputs)
	if (locale === "zh-Hant") return zh_hant1_homefactuniverselifetimes3(inputs)
	if (locale === "de") return de_homefactuniverselifetimes3(inputs)
	return fr_homefactuniverselifetimes3(inputs)
});
export { homefactuniverselifetimes3 as "homeFactUniverseLifetimes" }