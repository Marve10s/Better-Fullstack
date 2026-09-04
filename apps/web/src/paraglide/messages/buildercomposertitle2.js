/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposertitle2Inputs */

const en_buildercomposertitle2 = /** @type {(inputs: Buildercomposertitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`What are you building?`)
};

const es_buildercomposertitle2 = /** @type {(inputs: Buildercomposertitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`What are you building?`)
};

const zh_buildercomposertitle2 = /** @type {(inputs: Buildercomposertitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`What are you building?`)
};

const ja_buildercomposertitle2 = /** @type {(inputs: Buildercomposertitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`What are you building?`)
};

const ko_buildercomposertitle2 = /** @type {(inputs: Buildercomposertitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`What are you building?`)
};

const zh_hant1_buildercomposertitle2 = /** @type {(inputs: Buildercomposertitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`What are you building?`)
};

const de_buildercomposertitle2 = /** @type {(inputs: Buildercomposertitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`What are you building?`)
};

const fr_buildercomposertitle2 = /** @type {(inputs: Buildercomposertitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`What are you building?`)
};

const uk_buildercomposertitle2 = /** @type {(inputs: Buildercomposertitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`What are you building?`)
};

/**
* | output |
* | --- |
* | "What are you building?" |
*
* @param {Buildercomposertitle2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposertitle2 = /** @type {((inputs?: Buildercomposertitle2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposertitle2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_buildercomposertitle2(inputs)
	if (locale === "zh") return zh_buildercomposertitle2(inputs)
	if (locale === "ja") return ja_buildercomposertitle2(inputs)
	if (locale === "ko") return ko_buildercomposertitle2(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildercomposertitle2(inputs)
	if (locale === "de") return de_buildercomposertitle2(inputs)
	if (locale === "fr") return fr_buildercomposertitle2(inputs)
	if (locale === "uk") return uk_buildercomposertitle2(inputs)
	return en_buildercomposertitle2(inputs)
});
export { buildercomposertitle2 as "builderComposerTitle" }