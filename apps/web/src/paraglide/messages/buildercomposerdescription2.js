/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposerdescription2Inputs */

const en_buildercomposerdescription2 = /** @type {(inputs: Buildercomposerdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Choose the applications your project needs. Each application can use its own language and framework, with shared project settings at the end.`)
};

const es_buildercomposerdescription2 = /** @type {(inputs: Buildercomposerdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Choose the applications your project needs. Each application can use its own language and framework, with shared project settings at the end.`)
};

const zh_buildercomposerdescription2 = /** @type {(inputs: Buildercomposerdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Choose the applications your project needs. Each application can use its own language and framework, with shared project settings at the end.`)
};

const ja_buildercomposerdescription2 = /** @type {(inputs: Buildercomposerdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Choose the applications your project needs. Each application can use its own language and framework, with shared project settings at the end.`)
};

const ko_buildercomposerdescription2 = /** @type {(inputs: Buildercomposerdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Choose the applications your project needs. Each application can use its own language and framework, with shared project settings at the end.`)
};

const zh_hant1_buildercomposerdescription2 = /** @type {(inputs: Buildercomposerdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Choose the applications your project needs. Each application can use its own language and framework, with shared project settings at the end.`)
};

const de_buildercomposerdescription2 = /** @type {(inputs: Buildercomposerdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Choose the applications your project needs. Each application can use its own language and framework, with shared project settings at the end.`)
};

const fr_buildercomposerdescription2 = /** @type {(inputs: Buildercomposerdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Choose the applications your project needs. Each application can use its own language and framework, with shared project settings at the end.`)
};

const uk_buildercomposerdescription2 = /** @type {(inputs: Buildercomposerdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Choose the applications your project needs. Each application can use its own language and framework, with shared project settings at the end.`)
};

/**
* | output |
* | --- |
* | "Choose the applications your project needs. Each application can use its own language and framework, with shared project settings at the end." |
*
* @param {Buildercomposerdescription2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposerdescription2 = /** @type {((inputs?: Buildercomposerdescription2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposerdescription2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_buildercomposerdescription2(inputs)
	if (locale === "zh") return zh_buildercomposerdescription2(inputs)
	if (locale === "ja") return ja_buildercomposerdescription2(inputs)
	if (locale === "ko") return ko_buildercomposerdescription2(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildercomposerdescription2(inputs)
	if (locale === "de") return de_buildercomposerdescription2(inputs)
	if (locale === "fr") return fr_buildercomposerdescription2(inputs)
	if (locale === "uk") return uk_buildercomposerdescription2(inputs)
	return en_buildercomposerdescription2(inputs)
});
export { buildercomposerdescription2 as "builderComposerDescription" }