/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Comparevisualwebbuilder3Inputs */

const en_comparevisualwebbuilder3 = /** @type {(inputs: Comparevisualwebbuilder3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Visual web builder`)
};

const es_comparevisualwebbuilder3 = /** @type {(inputs: Comparevisualwebbuilder3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Constructor web visual`)
};

const zh_comparevisualwebbuilder3 = /** @type {(inputs: Comparevisualwebbuilder3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`可视化 Web 构建器`)
};

const ja_comparevisualwebbuilder3 = /** @type {(inputs: Comparevisualwebbuilder3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ビジュアルウェブビルダー`)
};

const ko_comparevisualwebbuilder3 = /** @type {(inputs: Comparevisualwebbuilder3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`비주얼 웹 빌더`)
};

const zh_hant1_comparevisualwebbuilder3 = /** @type {(inputs: Comparevisualwebbuilder3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`視覺化 Web 建構器`)
};

const de_comparevisualwebbuilder3 = /** @type {(inputs: Comparevisualwebbuilder3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Visueller Web-Builder`)
};

const fr_comparevisualwebbuilder3 = /** @type {(inputs: Comparevisualwebbuilder3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Constructeur de sites Web visuels`)
};

/**
* | output |
* | --- |
* | "Visual web builder" |
*
* @param {Comparevisualwebbuilder3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const comparevisualwebbuilder3 = /** @type {((inputs?: Comparevisualwebbuilder3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comparevisualwebbuilder3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_comparevisualwebbuilder3(inputs)
	if (locale === "es") return es_comparevisualwebbuilder3(inputs)
	if (locale === "zh") return zh_comparevisualwebbuilder3(inputs)
	if (locale === "ja") return ja_comparevisualwebbuilder3(inputs)
	if (locale === "ko") return ko_comparevisualwebbuilder3(inputs)
	if (locale === "zh-Hant") return zh_hant1_comparevisualwebbuilder3(inputs)
	if (locale === "de") return de_comparevisualwebbuilder3(inputs)
	return fr_comparevisualwebbuilder3(inputs)
});
export { comparevisualwebbuilder3 as "compareVisualWebBuilder" }