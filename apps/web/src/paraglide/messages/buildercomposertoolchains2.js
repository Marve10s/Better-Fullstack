/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposertoolchains2Inputs */

const en_buildercomposertoolchains2 = /** @type {(inputs: Buildercomposertoolchains2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Before you run the project`)
};

const es_buildercomposertoolchains2 = /** @type {(inputs: Buildercomposertoolchains2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Before you run the project`)
};

const zh_buildercomposertoolchains2 = /** @type {(inputs: Buildercomposertoolchains2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Before you run the project`)
};

const ja_buildercomposertoolchains2 = /** @type {(inputs: Buildercomposertoolchains2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Before you run the project`)
};

const ko_buildercomposertoolchains2 = /** @type {(inputs: Buildercomposertoolchains2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Before you run the project`)
};

const zh_hant1_buildercomposertoolchains2 = /** @type {(inputs: Buildercomposertoolchains2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Before you run the project`)
};

const de_buildercomposertoolchains2 = /** @type {(inputs: Buildercomposertoolchains2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Before you run the project`)
};

const fr_buildercomposertoolchains2 = /** @type {(inputs: Buildercomposertoolchains2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Before you run the project`)
};

const uk_buildercomposertoolchains2 = /** @type {(inputs: Buildercomposertoolchains2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Before you run the project`)
};

/**
* | output |
* | --- |
* | "Before you run the project" |
*
* @param {Buildercomposertoolchains2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposertoolchains2 = /** @type {((inputs?: Buildercomposertoolchains2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposertoolchains2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_buildercomposertoolchains2(inputs)
	if (locale === "zh") return zh_buildercomposertoolchains2(inputs)
	if (locale === "ja") return ja_buildercomposertoolchains2(inputs)
	if (locale === "ko") return ko_buildercomposertoolchains2(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildercomposertoolchains2(inputs)
	if (locale === "de") return de_buildercomposertoolchains2(inputs)
	if (locale === "fr") return fr_buildercomposertoolchains2(inputs)
	if (locale === "uk") return uk_buildercomposertoolchains2(inputs)
	return en_buildercomposertoolchains2(inputs)
});
export { buildercomposertoolchains2 as "builderComposerToolchains" }