/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposeroptional2Inputs */

const en_buildercomposeroptional2 = /** @type {(inputs: Buildercomposeroptional2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Optional`)
};

const es_buildercomposeroptional2 = /** @type {(inputs: Buildercomposeroptional2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Opcional`)
};

const zh_buildercomposeroptional2 = /** @type {(inputs: Buildercomposeroptional2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`可选`)
};

const ja_buildercomposeroptional2 = /** @type {(inputs: Buildercomposeroptional2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`任意`)
};

const ko_buildercomposeroptional2 = /** @type {(inputs: Buildercomposeroptional2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`선택 사항`)
};

const zh_hant1_buildercomposeroptional2 = /** @type {(inputs: Buildercomposeroptional2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`可選`)
};

const de_buildercomposeroptional2 = /** @type {(inputs: Buildercomposeroptional2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Optional`)
};

const fr_buildercomposeroptional2 = /** @type {(inputs: Buildercomposeroptional2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Optionnel`)
};

const uk_buildercomposeroptional2 = /** @type {(inputs: Buildercomposeroptional2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Необов'язково`)
};

/**
* | output |
* | --- |
* | "Optional" |
*
* @param {Buildercomposeroptional2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposeroptional2 = /** @type {((inputs?: Buildercomposeroptional2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposeroptional2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_buildercomposeroptional2(inputs)
	if (locale === "zh") return zh_buildercomposeroptional2(inputs)
	if (locale === "ja") return ja_buildercomposeroptional2(inputs)
	if (locale === "ko") return ko_buildercomposeroptional2(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildercomposeroptional2(inputs)
	if (locale === "de") return de_buildercomposeroptional2(inputs)
	if (locale === "fr") return fr_buildercomposeroptional2(inputs)
	if (locale === "uk") return uk_buildercomposeroptional2(inputs)
	return en_buildercomposeroptional2(inputs)
});
export { buildercomposeroptional2 as "builderComposerOptional" }