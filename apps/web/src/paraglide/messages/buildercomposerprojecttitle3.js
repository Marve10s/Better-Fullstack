/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposerprojecttitle3Inputs */

const en_buildercomposerprojecttitle3 = /** @type {(inputs: Buildercomposerprojecttitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Set up your project`)
};

const es_buildercomposerprojecttitle3 = /** @type {(inputs: Buildercomposerprojecttitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Set up your project`)
};

const zh_buildercomposerprojecttitle3 = /** @type {(inputs: Buildercomposerprojecttitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Set up your project`)
};

const ja_buildercomposerprojecttitle3 = /** @type {(inputs: Buildercomposerprojecttitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Set up your project`)
};

const ko_buildercomposerprojecttitle3 = /** @type {(inputs: Buildercomposerprojecttitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Set up your project`)
};

const zh_hant1_buildercomposerprojecttitle3 = /** @type {(inputs: Buildercomposerprojecttitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Set up your project`)
};

const de_buildercomposerprojecttitle3 = /** @type {(inputs: Buildercomposerprojecttitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Set up your project`)
};

const fr_buildercomposerprojecttitle3 = /** @type {(inputs: Buildercomposerprojecttitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Set up your project`)
};

const uk_buildercomposerprojecttitle3 = /** @type {(inputs: Buildercomposerprojecttitle3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Set up your project`)
};

/**
* | output |
* | --- |
* | "Set up your project" |
*
* @param {Buildercomposerprojecttitle3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposerprojecttitle3 = /** @type {((inputs?: Buildercomposerprojecttitle3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposerprojecttitle3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_buildercomposerprojecttitle3(inputs)
	if (locale === "zh") return zh_buildercomposerprojecttitle3(inputs)
	if (locale === "ja") return ja_buildercomposerprojecttitle3(inputs)
	if (locale === "ko") return ko_buildercomposerprojecttitle3(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildercomposerprojecttitle3(inputs)
	if (locale === "de") return de_buildercomposerprojecttitle3(inputs)
	if (locale === "fr") return fr_buildercomposerprojecttitle3(inputs)
	if (locale === "uk") return uk_buildercomposerprojecttitle3(inputs)
	return en_buildercomposerprojecttitle3(inputs)
});
export { buildercomposerprojecttitle3 as "builderComposerProjectTitle" }