/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposersetup2Inputs */

const en_buildercomposersetup2 = /** @type {(inputs: Buildercomposersetup2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Setup`)
};

const es_buildercomposersetup2 = /** @type {(inputs: Buildercomposersetup2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Setup`)
};

const zh_buildercomposersetup2 = /** @type {(inputs: Buildercomposersetup2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`安装`)
};

const ja_buildercomposersetup2 = /** @type {(inputs: Buildercomposersetup2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`セットアップ`)
};

const ko_buildercomposersetup2 = /** @type {(inputs: Buildercomposersetup2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`설정`)
};

const zh_hant1_buildercomposersetup2 = /** @type {(inputs: Buildercomposersetup2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`安裝`)
};

const de_buildercomposersetup2 = /** @type {(inputs: Buildercomposersetup2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Setup`)
};

const fr_buildercomposersetup2 = /** @type {(inputs: Buildercomposersetup2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Setup`)
};

const uk_buildercomposersetup2 = /** @type {(inputs: Buildercomposersetup2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Налаштування`)
};

/**
* | output |
* | --- |
* | "Setup" |
*
* @param {Buildercomposersetup2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposersetup2 = /** @type {((inputs?: Buildercomposersetup2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposersetup2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_buildercomposersetup2(inputs)
	if (locale === "zh") return zh_buildercomposersetup2(inputs)
	if (locale === "ja") return ja_buildercomposersetup2(inputs)
	if (locale === "ko") return ko_buildercomposersetup2(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildercomposersetup2(inputs)
	if (locale === "de") return de_buildercomposersetup2(inputs)
	if (locale === "fr") return fr_buildercomposersetup2(inputs)
	if (locale === "uk") return uk_buildercomposersetup2(inputs)
	return en_buildercomposersetup2(inputs)
});
export { buildercomposersetup2 as "builderComposerSetup" }