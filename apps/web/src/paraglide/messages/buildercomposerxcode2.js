/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposerxcode2Inputs */

const en_buildercomposerxcode2 = /** @type {(inputs: Buildercomposerxcode2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Native iOS apps need macOS and Xcode`)
};

const es_buildercomposerxcode2 = /** @type {(inputs: Buildercomposerxcode2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Las apps iOS nativas requieren macOS y Xcode`)
};

const zh_buildercomposerxcode2 = /** @type {(inputs: Buildercomposerxcode2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`原生 iOS 应用需要 macOS 和 Xcode`)
};

const ja_buildercomposerxcode2 = /** @type {(inputs: Buildercomposerxcode2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ネイティブ iOS アプリには macOS と Xcode が必要です`)
};

const ko_buildercomposerxcode2 = /** @type {(inputs: Buildercomposerxcode2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`네이티브 iOS 앱에는 macOS와 Xcode가 필요합니다`)
};

const zh_hant1_buildercomposerxcode2 = /** @type {(inputs: Buildercomposerxcode2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`原生 iOS 應用需要 macOS 和 Xcode`)
};

const de_buildercomposerxcode2 = /** @type {(inputs: Buildercomposerxcode2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Native iOS-Apps benötigen macOS und Xcode`)
};

const fr_buildercomposerxcode2 = /** @type {(inputs: Buildercomposerxcode2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Les apps iOS natives nécessitent macOS et Xcode`)
};

const uk_buildercomposerxcode2 = /** @type {(inputs: Buildercomposerxcode2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Нативним iOS-застосункам потрібні macOS і Xcode`)
};

/**
* | output |
* | --- |
* | "Native iOS apps need macOS and Xcode" |
*
* @param {Buildercomposerxcode2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposerxcode2 = /** @type {((inputs?: Buildercomposerxcode2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposerxcode2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_buildercomposerxcode2(inputs)
	if (locale === "zh") return zh_buildercomposerxcode2(inputs)
	if (locale === "ja") return ja_buildercomposerxcode2(inputs)
	if (locale === "ko") return ko_buildercomposerxcode2(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildercomposerxcode2(inputs)
	if (locale === "de") return de_buildercomposerxcode2(inputs)
	if (locale === "fr") return fr_buildercomposerxcode2(inputs)
	if (locale === "uk") return uk_buildercomposerxcode2(inputs)
	return en_buildercomposerxcode2(inputs)
});
export { buildercomposerxcode2 as "builderComposerXcode" }