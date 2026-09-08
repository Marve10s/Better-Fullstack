/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposersharehint3Inputs */

const en_buildercomposersharehint3 = /** @type {(inputs: Buildercomposersharehint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copy a link to this configuration`)
};

const es_buildercomposersharehint3 = /** @type {(inputs: Buildercomposersharehint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copia un enlace a esta configuración`)
};

const zh_buildercomposersharehint3 = /** @type {(inputs: Buildercomposersharehint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`复制此配置的链接`)
};

const ja_buildercomposersharehint3 = /** @type {(inputs: Buildercomposersharehint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`この構成へのリンクをコピー`)
};

const ko_buildercomposersharehint3 = /** @type {(inputs: Buildercomposersharehint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`이 구성의 링크 복사`)
};

const zh_hant1_buildercomposersharehint3 = /** @type {(inputs: Buildercomposersharehint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`複製此設定的連結`)
};

const de_buildercomposersharehint3 = /** @type {(inputs: Buildercomposersharehint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Link zu dieser Konfiguration kopieren`)
};

const fr_buildercomposersharehint3 = /** @type {(inputs: Buildercomposersharehint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copier un lien vers cette configuration`)
};

const uk_buildercomposersharehint3 = /** @type {(inputs: Buildercomposersharehint3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Скопіювати посилання на цю конфігурацію`)
};

/**
* | output |
* | --- |
* | "Copy a link to this configuration" |
*
* @param {Buildercomposersharehint3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposersharehint3 = /** @type {((inputs?: Buildercomposersharehint3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposersharehint3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_buildercomposersharehint3(inputs)
	if (locale === "zh") return zh_buildercomposersharehint3(inputs)
	if (locale === "ja") return ja_buildercomposersharehint3(inputs)
	if (locale === "ko") return ko_buildercomposersharehint3(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildercomposersharehint3(inputs)
	if (locale === "de") return de_buildercomposersharehint3(inputs)
	if (locale === "fr") return fr_buildercomposersharehint3(inputs)
	if (locale === "uk") return uk_buildercomposersharehint3(inputs)
	return en_buildercomposersharehint3(inputs)
});
export { buildercomposersharehint3 as "builderComposerShareHint" }