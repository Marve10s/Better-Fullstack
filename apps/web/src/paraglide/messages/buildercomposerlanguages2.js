/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposerlanguages2Inputs */

const en_buildercomposerlanguages2 = /** @type {(inputs: Buildercomposerlanguages2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Languages`)
};

const es_buildercomposerlanguages2 = /** @type {(inputs: Buildercomposerlanguages2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Lenguajes`)
};

const zh_buildercomposerlanguages2 = /** @type {(inputs: Buildercomposerlanguages2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`语言`)
};

const ja_buildercomposerlanguages2 = /** @type {(inputs: Buildercomposerlanguages2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`言語`)
};

const ko_buildercomposerlanguages2 = /** @type {(inputs: Buildercomposerlanguages2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`언어`)
};

const zh_hant1_buildercomposerlanguages2 = /** @type {(inputs: Buildercomposerlanguages2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`語言`)
};

const de_buildercomposerlanguages2 = /** @type {(inputs: Buildercomposerlanguages2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sprachen`)
};

const fr_buildercomposerlanguages2 = /** @type {(inputs: Buildercomposerlanguages2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Langages`)
};

const uk_buildercomposerlanguages2 = /** @type {(inputs: Buildercomposerlanguages2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Мови`)
};

/**
* | output |
* | --- |
* | "Languages" |
*
* @param {Buildercomposerlanguages2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposerlanguages2 = /** @type {((inputs?: Buildercomposerlanguages2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposerlanguages2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_buildercomposerlanguages2(inputs)
	if (locale === "zh") return zh_buildercomposerlanguages2(inputs)
	if (locale === "ja") return ja_buildercomposerlanguages2(inputs)
	if (locale === "ko") return ko_buildercomposerlanguages2(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildercomposerlanguages2(inputs)
	if (locale === "de") return de_buildercomposerlanguages2(inputs)
	if (locale === "fr") return fr_buildercomposerlanguages2(inputs)
	if (locale === "uk") return uk_buildercomposerlanguages2(inputs)
	return en_buildercomposerlanguages2(inputs)
});
export { buildercomposerlanguages2 as "builderComposerLanguages" }