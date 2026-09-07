/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposersdks2Inputs */

const en_buildercomposersdks2 = /** @type {(inputs: Buildercomposersdks2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Install the SDKs for these languages`)
};

const es_buildercomposersdks2 = /** @type {(inputs: Buildercomposersdks2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Instala los SDK de estos lenguajes`)
};

const zh_buildercomposersdks2 = /** @type {(inputs: Buildercomposersdks2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`请安装这些语言的 SDK`)
};

const ja_buildercomposersdks2 = /** @type {(inputs: Buildercomposersdks2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`これらの言語の SDK をインストールしてください`)
};

const ko_buildercomposersdks2 = /** @type {(inputs: Buildercomposersdks2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`이 언어들의 SDK를 설치하세요`)
};

const zh_hant1_buildercomposersdks2 = /** @type {(inputs: Buildercomposersdks2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`請安裝這些語言的 SDK`)
};

const de_buildercomposersdks2 = /** @type {(inputs: Buildercomposersdks2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Installiere die SDKs für diese Sprachen`)
};

const fr_buildercomposersdks2 = /** @type {(inputs: Buildercomposersdks2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Installez les SDK de ces langages`)
};

const uk_buildercomposersdks2 = /** @type {(inputs: Buildercomposersdks2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Встановіть SDK для цих мов`)
};

/**
* | output |
* | --- |
* | "Install the SDKs for these languages" |
*
* @param {Buildercomposersdks2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposersdks2 = /** @type {((inputs?: Buildercomposersdks2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposersdks2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_buildercomposersdks2(inputs)
	if (locale === "zh") return zh_buildercomposersdks2(inputs)
	if (locale === "ja") return ja_buildercomposersdks2(inputs)
	if (locale === "ko") return ko_buildercomposersdks2(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildercomposersdks2(inputs)
	if (locale === "de") return de_buildercomposersdks2(inputs)
	if (locale === "fr") return fr_buildercomposersdks2(inputs)
	if (locale === "uk") return uk_buildercomposersdks2(inputs)
	return en_buildercomposersdks2(inputs)
});
export { buildercomposersdks2 as "builderComposerSdks" }