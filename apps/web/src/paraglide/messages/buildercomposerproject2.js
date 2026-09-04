/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposerproject2Inputs */

const en_buildercomposerproject2 = /** @type {(inputs: Buildercomposerproject2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Project`)
};

const es_buildercomposerproject2 = /** @type {(inputs: Buildercomposerproject2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Project`)
};

const zh_buildercomposerproject2 = /** @type {(inputs: Buildercomposerproject2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Project`)
};

const ja_buildercomposerproject2 = /** @type {(inputs: Buildercomposerproject2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Project`)
};

const ko_buildercomposerproject2 = /** @type {(inputs: Buildercomposerproject2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Project`)
};

const zh_hant1_buildercomposerproject2 = /** @type {(inputs: Buildercomposerproject2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Project`)
};

const de_buildercomposerproject2 = /** @type {(inputs: Buildercomposerproject2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Project`)
};

const fr_buildercomposerproject2 = /** @type {(inputs: Buildercomposerproject2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Project`)
};

const uk_buildercomposerproject2 = /** @type {(inputs: Buildercomposerproject2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Project`)
};

/**
* | output |
* | --- |
* | "Project" |
*
* @param {Buildercomposerproject2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposerproject2 = /** @type {((inputs?: Buildercomposerproject2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposerproject2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_buildercomposerproject2(inputs)
	if (locale === "zh") return zh_buildercomposerproject2(inputs)
	if (locale === "ja") return ja_buildercomposerproject2(inputs)
	if (locale === "ko") return ko_buildercomposerproject2(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildercomposerproject2(inputs)
	if (locale === "de") return de_buildercomposerproject2(inputs)
	if (locale === "fr") return fr_buildercomposerproject2(inputs)
	if (locale === "uk") return uk_buildercomposerproject2(inputs)
	return en_buildercomposerproject2(inputs)
});
export { buildercomposerproject2 as "builderComposerProject" }