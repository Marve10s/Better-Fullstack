/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compareopenbuilder2Inputs */

const en_compareopenbuilder2 = /** @type {(inputs: Compareopenbuilder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Open Stack Builder`)
};

const es_compareopenbuilder2 = /** @type {(inputs: Compareopenbuilder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Abrir constructor de stack`)
};

const zh_compareopenbuilder2 = /** @type {(inputs: Compareopenbuilder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`打开 Stack 构建器`)
};

const ja_compareopenbuilder2 = /** @type {(inputs: Compareopenbuilder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Stack Builder を開く`)
};

const ko_compareopenbuilder2 = /** @type {(inputs: Compareopenbuilder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Stack Builder 열기`)
};

const zh_hant1_compareopenbuilder2 = /** @type {(inputs: Compareopenbuilder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`開啟 Stack 建構器`)
};

const de_compareopenbuilder2 = /** @type {(inputs: Compareopenbuilder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Öffnen Sie Stack Builder`)
};

const fr_compareopenbuilder2 = /** @type {(inputs: Compareopenbuilder2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ouvrir Stack Builder`)
};

/**
* | output |
* | --- |
* | "Open Stack Builder" |
*
* @param {Compareopenbuilder2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const compareopenbuilder2 = /** @type {((inputs?: Compareopenbuilder2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compareopenbuilder2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_compareopenbuilder2(inputs)
	if (locale === "es") return es_compareopenbuilder2(inputs)
	if (locale === "zh") return zh_compareopenbuilder2(inputs)
	if (locale === "ja") return ja_compareopenbuilder2(inputs)
	if (locale === "ko") return ko_compareopenbuilder2(inputs)
	if (locale === "zh-Hant") return zh_hant1_compareopenbuilder2(inputs)
	if (locale === "de") return de_compareopenbuilder2(inputs)
	return fr_compareopenbuilder2(inputs)
});
export { compareopenbuilder2 as "compareOpenBuilder" }