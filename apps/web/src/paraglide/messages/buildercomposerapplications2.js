/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposerapplications2Inputs */

const en_buildercomposerapplications2 = /** @type {(inputs: Buildercomposerapplications2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Applications`)
};

const es_buildercomposerapplications2 = /** @type {(inputs: Buildercomposerapplications2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Applications`)
};

const zh_buildercomposerapplications2 = /** @type {(inputs: Buildercomposerapplications2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Applications`)
};

const ja_buildercomposerapplications2 = /** @type {(inputs: Buildercomposerapplications2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Applications`)
};

const ko_buildercomposerapplications2 = /** @type {(inputs: Buildercomposerapplications2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Applications`)
};

const zh_hant1_buildercomposerapplications2 = /** @type {(inputs: Buildercomposerapplications2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Applications`)
};

const de_buildercomposerapplications2 = /** @type {(inputs: Buildercomposerapplications2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Applications`)
};

const fr_buildercomposerapplications2 = /** @type {(inputs: Buildercomposerapplications2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Applications`)
};

const uk_buildercomposerapplications2 = /** @type {(inputs: Buildercomposerapplications2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Applications`)
};

/**
* | output |
* | --- |
* | "Applications" |
*
* @param {Buildercomposerapplications2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposerapplications2 = /** @type {((inputs?: Buildercomposerapplications2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposerapplications2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_buildercomposerapplications2(inputs)
	if (locale === "zh") return zh_buildercomposerapplications2(inputs)
	if (locale === "ja") return ja_buildercomposerapplications2(inputs)
	if (locale === "ko") return ko_buildercomposerapplications2(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildercomposerapplications2(inputs)
	if (locale === "de") return de_buildercomposerapplications2(inputs)
	if (locale === "fr") return fr_buildercomposerapplications2(inputs)
	if (locale === "uk") return uk_buildercomposerapplications2(inputs)
	return en_buildercomposerapplications2(inputs)
});
export { buildercomposerapplications2 as "builderComposerApplications" }