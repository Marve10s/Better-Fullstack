/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderuniversal1Inputs */

const en_builderuniversal1 = /** @type {(inputs: Builderuniversal1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Universal`)
};

const es_builderuniversal1 = /** @type {(inputs: Builderuniversal1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Universal`)
};

const zh_builderuniversal1 = /** @type {(inputs: Builderuniversal1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`通用`)
};

const ja_builderuniversal1 = /** @type {(inputs: Builderuniversal1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ユニバーサル`)
};

const ko_builderuniversal1 = /** @type {(inputs: Builderuniversal1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`만능인`)
};

const zh_hant1_builderuniversal1 = /** @type {(inputs: Builderuniversal1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`一般`)
};

const de_builderuniversal1 = /** @type {(inputs: Builderuniversal1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Universal`)
};

const fr_builderuniversal1 = /** @type {(inputs: Builderuniversal1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Universel`)
};

/**
* | output |
* | --- |
* | "Universal" |
*
* @param {Builderuniversal1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const builderuniversal1 = /** @type {((inputs?: Builderuniversal1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderuniversal1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderuniversal1(inputs)
	if (locale === "es") return es_builderuniversal1(inputs)
	if (locale === "zh") return zh_builderuniversal1(inputs)
	if (locale === "ja") return ja_builderuniversal1(inputs)
	if (locale === "ko") return ko_builderuniversal1(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderuniversal1(inputs)
	if (locale === "de") return de_builderuniversal1(inputs)
	return fr_builderuniversal1(inputs)
});
export { builderuniversal1 as "builderUniversal" }