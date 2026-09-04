/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposerprogress2Inputs */

const en_buildercomposerprogress2 = /** @type {(inputs: Buildercomposerprogress2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Project creation progress`)
};

const es_buildercomposerprogress2 = /** @type {(inputs: Buildercomposerprogress2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Project creation progress`)
};

const zh_buildercomposerprogress2 = /** @type {(inputs: Buildercomposerprogress2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Project creation progress`)
};

const ja_buildercomposerprogress2 = /** @type {(inputs: Buildercomposerprogress2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Project creation progress`)
};

const ko_buildercomposerprogress2 = /** @type {(inputs: Buildercomposerprogress2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Project creation progress`)
};

const zh_hant1_buildercomposerprogress2 = /** @type {(inputs: Buildercomposerprogress2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Project creation progress`)
};

const de_buildercomposerprogress2 = /** @type {(inputs: Buildercomposerprogress2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Project creation progress`)
};

const fr_buildercomposerprogress2 = /** @type {(inputs: Buildercomposerprogress2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Project creation progress`)
};

const uk_buildercomposerprogress2 = /** @type {(inputs: Buildercomposerprogress2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Project creation progress`)
};

/**
* | output |
* | --- |
* | "Project creation progress" |
*
* @param {Buildercomposerprogress2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposerprogress2 = /** @type {((inputs?: Buildercomposerprogress2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposerprogress2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_buildercomposerprogress2(inputs)
	if (locale === "zh") return zh_buildercomposerprogress2(inputs)
	if (locale === "ja") return ja_buildercomposerprogress2(inputs)
	if (locale === "ko") return ko_buildercomposerprogress2(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildercomposerprogress2(inputs)
	if (locale === "de") return de_buildercomposerprogress2(inputs)
	if (locale === "fr") return fr_buildercomposerprogress2(inputs)
	if (locale === "uk") return uk_buildercomposerprogress2(inputs)
	return en_buildercomposerprogress2(inputs)
});
export { buildercomposerprogress2 as "builderComposerProgress" }