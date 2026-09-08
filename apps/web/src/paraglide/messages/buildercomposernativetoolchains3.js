/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposernativetoolchains3Inputs */

const en_buildercomposernativetoolchains3 = /** @type {(inputs: Buildercomposernativetoolchains3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Native toolchains`)
};

const es_buildercomposernativetoolchains3 = /** @type {(inputs: Buildercomposernativetoolchains3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Toolchains nativas`)
};

const zh_buildercomposernativetoolchains3 = /** @type {(inputs: Buildercomposernativetoolchains3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`原生工具链`)
};

const ja_buildercomposernativetoolchains3 = /** @type {(inputs: Buildercomposernativetoolchains3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ネイティブツールチェーン`)
};

const ko_buildercomposernativetoolchains3 = /** @type {(inputs: Buildercomposernativetoolchains3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`네이티브 툴체인`)
};

const zh_hant1_buildercomposernativetoolchains3 = /** @type {(inputs: Buildercomposernativetoolchains3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`原生工具鏈`)
};

const de_buildercomposernativetoolchains3 = /** @type {(inputs: Buildercomposernativetoolchains3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Native Toolchains`)
};

const fr_buildercomposernativetoolchains3 = /** @type {(inputs: Buildercomposernativetoolchains3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Toolchains natives`)
};

const uk_buildercomposernativetoolchains3 = /** @type {(inputs: Buildercomposernativetoolchains3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Нативні тулчейни`)
};

/**
* | output |
* | --- |
* | "Native toolchains" |
*
* @param {Buildercomposernativetoolchains3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposernativetoolchains3 = /** @type {((inputs?: Buildercomposernativetoolchains3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposernativetoolchains3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_buildercomposernativetoolchains3(inputs)
	if (locale === "zh") return zh_buildercomposernativetoolchains3(inputs)
	if (locale === "ja") return ja_buildercomposernativetoolchains3(inputs)
	if (locale === "ko") return ko_buildercomposernativetoolchains3(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildercomposernativetoolchains3(inputs)
	if (locale === "de") return de_buildercomposernativetoolchains3(inputs)
	if (locale === "fr") return fr_buildercomposernativetoolchains3(inputs)
	if (locale === "uk") return uk_buildercomposernativetoolchains3(inputs)
	return en_buildercomposernativetoolchains3(inputs)
});
export { buildercomposernativetoolchains3 as "builderComposerNativeToolchains" }