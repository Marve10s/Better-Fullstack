/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposernativetoolchains3Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Toolchains nativas")
	if (locale === "zh") return /** @type {LocalizedString} */ ("原生工具链")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ネイティブツールチェーン")
	if (locale === "ko") return /** @type {LocalizedString} */ ("네이티브 툴체인")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("原生工具鏈")
	if (locale === "de") return /** @type {LocalizedString} */ ("Native Toolchains")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Toolchains natives")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Нативні тулчейни")
	return /** @type {LocalizedString} */ ("Native toolchains")
});
export { buildercomposernativetoolchains3 as "builderComposerNativeToolchains" }