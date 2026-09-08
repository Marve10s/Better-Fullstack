/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposergenerates2Inputs */

const en_buildercomposergenerates2 = /** @type {(inputs: Buildercomposergenerates2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generates`)
};

const es_buildercomposergenerates2 = /** @type {(inputs: Buildercomposergenerates2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Genera`)
};

const zh_buildercomposergenerates2 = /** @type {(inputs: Buildercomposergenerates2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`生成`)
};

const ja_buildercomposergenerates2 = /** @type {(inputs: Buildercomposergenerates2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`生成`)
};

const ko_buildercomposergenerates2 = /** @type {(inputs: Buildercomposergenerates2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`생성`)
};

const zh_hant1_buildercomposergenerates2 = /** @type {(inputs: Buildercomposergenerates2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`產生`)
};

const de_buildercomposergenerates2 = /** @type {(inputs: Buildercomposergenerates2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Erzeugt`)
};

const fr_buildercomposergenerates2 = /** @type {(inputs: Buildercomposergenerates2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Génère`)
};

const uk_buildercomposergenerates2 = /** @type {(inputs: Buildercomposergenerates2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Створює`)
};

/**
* | output |
* | --- |
* | "Generates" |
*
* @param {Buildercomposergenerates2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposergenerates2 = /** @type {((inputs?: Buildercomposergenerates2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposergenerates2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_buildercomposergenerates2(inputs)
	if (locale === "zh") return zh_buildercomposergenerates2(inputs)
	if (locale === "ja") return ja_buildercomposergenerates2(inputs)
	if (locale === "ko") return ko_buildercomposergenerates2(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildercomposergenerates2(inputs)
	if (locale === "de") return de_buildercomposergenerates2(inputs)
	if (locale === "fr") return fr_buildercomposergenerates2(inputs)
	if (locale === "uk") return uk_buildercomposergenerates2(inputs)
	return en_buildercomposergenerates2(inputs)
});
export { buildercomposergenerates2 as "builderComposerGenerates" }