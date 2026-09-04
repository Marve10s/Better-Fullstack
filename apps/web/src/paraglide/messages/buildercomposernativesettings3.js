/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposernativesettings3Inputs */

const en_buildercomposernativesettings3 = /** @type {(inputs: Buildercomposernativesettings3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Your selected applications use native toolchains. No JavaScript package manager is required for the generated project.`)
};

const es_buildercomposernativesettings3 = /** @type {(inputs: Buildercomposernativesettings3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Your selected applications use native toolchains. No JavaScript package manager is required for the generated project.`)
};

const zh_buildercomposernativesettings3 = /** @type {(inputs: Buildercomposernativesettings3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Your selected applications use native toolchains. No JavaScript package manager is required for the generated project.`)
};

const ja_buildercomposernativesettings3 = /** @type {(inputs: Buildercomposernativesettings3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Your selected applications use native toolchains. No JavaScript package manager is required for the generated project.`)
};

const ko_buildercomposernativesettings3 = /** @type {(inputs: Buildercomposernativesettings3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Your selected applications use native toolchains. No JavaScript package manager is required for the generated project.`)
};

const zh_hant1_buildercomposernativesettings3 = /** @type {(inputs: Buildercomposernativesettings3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Your selected applications use native toolchains. No JavaScript package manager is required for the generated project.`)
};

const de_buildercomposernativesettings3 = /** @type {(inputs: Buildercomposernativesettings3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Your selected applications use native toolchains. No JavaScript package manager is required for the generated project.`)
};

const fr_buildercomposernativesettings3 = /** @type {(inputs: Buildercomposernativesettings3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Your selected applications use native toolchains. No JavaScript package manager is required for the generated project.`)
};

const uk_buildercomposernativesettings3 = /** @type {(inputs: Buildercomposernativesettings3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Your selected applications use native toolchains. No JavaScript package manager is required for the generated project.`)
};

/**
* | output |
* | --- |
* | "Your selected applications use native toolchains. No JavaScript package manager is required for the generated project." |
*
* @param {Buildercomposernativesettings3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposernativesettings3 = /** @type {((inputs?: Buildercomposernativesettings3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposernativesettings3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_buildercomposernativesettings3(inputs)
	if (locale === "zh") return zh_buildercomposernativesettings3(inputs)
	if (locale === "ja") return ja_buildercomposernativesettings3(inputs)
	if (locale === "ko") return ko_buildercomposernativesettings3(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildercomposernativesettings3(inputs)
	if (locale === "de") return de_buildercomposernativesettings3(inputs)
	if (locale === "fr") return fr_buildercomposernativesettings3(inputs)
	if (locale === "uk") return uk_buildercomposernativesettings3(inputs)
	return en_buildercomposernativesettings3(inputs)
});
export { buildercomposernativesettings3 as "builderComposerNativeSettings" }