/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderseotitle2Inputs */

const en_builderseotitle2 = /** @type {(inputs: Builderseotitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Stack Builder | Better Fullstack`)
};

const es_builderseotitle2 = /** @type {(inputs: Builderseotitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Constructor de stack | Better Fullstack`)
};

const zh_builderseotitle2 = /** @type {(inputs: Builderseotitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Stack 构建器 | Better Fullstack`)
};

const ja_builderseotitle2 = /** @type {(inputs: Builderseotitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Stack Builder | Better Fullstack`)
};

const ko_builderseotitle2 = /** @type {(inputs: Builderseotitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Stack Builder | Better Fullstack`)
};

const zh_hant1_builderseotitle2 = /** @type {(inputs: Builderseotitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Stack 建構器 | Better Fullstack`)
};

const de_builderseotitle2 = /** @type {(inputs: Builderseotitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Stack Builder | Better Fullstack`)
};

const fr_builderseotitle2 = /** @type {(inputs: Builderseotitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Stack Builder | Better Fullstack`)
};

/**
* | output |
* | --- |
* | "Stack Builder \| Better Fullstack" |
*
* @param {Builderseotitle2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const builderseotitle2 = /** @type {((inputs?: Builderseotitle2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderseotitle2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderseotitle2(inputs)
	if (locale === "es") return es_builderseotitle2(inputs)
	if (locale === "zh") return zh_builderseotitle2(inputs)
	if (locale === "ja") return ja_builderseotitle2(inputs)
	if (locale === "ko") return ko_builderseotitle2(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderseotitle2(inputs)
	if (locale === "de") return de_builderseotitle2(inputs)
	return fr_builderseotitle2(inputs)
});
export { builderseotitle2 as "builderSeoTitle" }