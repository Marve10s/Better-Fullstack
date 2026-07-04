/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homeatonems3Inputs */

const en_homeatonems3 = /** @type {(inputs: Homeatonems3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`at 1ms per test`)
};

const es_homeatonems3 = /** @type {(inputs: Homeatonems3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`a 1ms por prueba`)
};

const zh_homeatonems3 = /** @type {(inputs: Homeatonems3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`每次测试 1ms`)
};

const ja_homeatonems3 = /** @type {(inputs: Homeatonems3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`テストごとに 1 ミリ秒`)
};

const ko_homeatonems3 = /** @type {(inputs: Homeatonems3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`테스트당 1ms`)
};

const zh_hant1_homeatonems3 = /** @type {(inputs: Homeatonems3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`每次測試 1ms`)
};

const de_homeatonems3 = /** @type {(inputs: Homeatonems3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`bei 1 ms pro Test`)
};

const fr_homeatonems3 = /** @type {(inputs: Homeatonems3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`à 1 ms par test`)
};

/**
* | output |
* | --- |
* | "at 1ms per test" |
*
* @param {Homeatonems3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const homeatonems3 = /** @type {((inputs?: Homeatonems3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homeatonems3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homeatonems3(inputs)
	if (locale === "es") return es_homeatonems3(inputs)
	if (locale === "zh") return zh_homeatonems3(inputs)
	if (locale === "ja") return ja_homeatonems3(inputs)
	if (locale === "ko") return ko_homeatonems3(inputs)
	if (locale === "zh-Hant") return zh_hant1_homeatonems3(inputs)
	if (locale === "de") return de_homeatonems3(inputs)
	return fr_homeatonems3(inputs)
});
export { homeatonems3 as "homeAtOneMs" }