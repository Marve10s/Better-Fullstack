/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposerjssettings3Inputs */

const en_buildercomposerjssettings3 = /** @type {(inputs: Buildercomposerjssettings3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`JavaScript package manager and workspace settings apply to your TypeScript and React Native applications. Other applications use their native toolchains.`)
};

const es_buildercomposerjssettings3 = /** @type {(inputs: Buildercomposerjssettings3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`JavaScript package manager and workspace settings apply to your TypeScript and React Native applications. Other applications use their native toolchains.`)
};

const zh_buildercomposerjssettings3 = /** @type {(inputs: Buildercomposerjssettings3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`JavaScript package manager and workspace settings apply to your TypeScript and React Native applications. Other applications use their native toolchains.`)
};

const ja_buildercomposerjssettings3 = /** @type {(inputs: Buildercomposerjssettings3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`JavaScript package manager and workspace settings apply to your TypeScript and React Native applications. Other applications use their native toolchains.`)
};

const ko_buildercomposerjssettings3 = /** @type {(inputs: Buildercomposerjssettings3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`JavaScript package manager and workspace settings apply to your TypeScript and React Native applications. Other applications use their native toolchains.`)
};

const zh_hant1_buildercomposerjssettings3 = /** @type {(inputs: Buildercomposerjssettings3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`JavaScript package manager and workspace settings apply to your TypeScript and React Native applications. Other applications use their native toolchains.`)
};

const de_buildercomposerjssettings3 = /** @type {(inputs: Buildercomposerjssettings3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`JavaScript package manager and workspace settings apply to your TypeScript and React Native applications. Other applications use their native toolchains.`)
};

const fr_buildercomposerjssettings3 = /** @type {(inputs: Buildercomposerjssettings3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`JavaScript package manager and workspace settings apply to your TypeScript and React Native applications. Other applications use their native toolchains.`)
};

const uk_buildercomposerjssettings3 = /** @type {(inputs: Buildercomposerjssettings3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`JavaScript package manager and workspace settings apply to your TypeScript and React Native applications. Other applications use their native toolchains.`)
};

/**
* | output |
* | --- |
* | "JavaScript package manager and workspace settings apply to your TypeScript and React Native applications. Other applications use their native toolchains." |
*
* @param {Buildercomposerjssettings3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposerjssettings3 = /** @type {((inputs?: Buildercomposerjssettings3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposerjssettings3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_buildercomposerjssettings3(inputs)
	if (locale === "zh") return zh_buildercomposerjssettings3(inputs)
	if (locale === "ja") return ja_buildercomposerjssettings3(inputs)
	if (locale === "ko") return ko_buildercomposerjssettings3(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildercomposerjssettings3(inputs)
	if (locale === "de") return de_buildercomposerjssettings3(inputs)
	if (locale === "fr") return fr_buildercomposerjssettings3(inputs)
	if (locale === "uk") return uk_buildercomposerjssettings3(inputs)
	return en_buildercomposerjssettings3(inputs)
});
export { buildercomposerjssettings3 as "builderComposerJsSettings" }