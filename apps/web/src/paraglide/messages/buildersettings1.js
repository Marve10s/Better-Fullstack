/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildersettings1Inputs */

const en_buildersettings1 = /** @type {(inputs: Buildersettings1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Builder settings`)
};

const es_buildersettings1 = /** @type {(inputs: Buildersettings1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ajustes del constructor`)
};

const zh_buildersettings1 = /** @type {(inputs: Buildersettings1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`构建器设置`)
};

const ja_buildersettings1 = /** @type {(inputs: Buildersettings1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ビルダー設定`)
};

const ko_buildersettings1 = /** @type {(inputs: Buildersettings1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`빌더 설정`)
};

const zh_hant1_buildersettings1 = /** @type {(inputs: Buildersettings1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`建構器設定`)
};

const de_buildersettings1 = /** @type {(inputs: Buildersettings1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Builder-Einstellungen`)
};

const fr_buildersettings1 = /** @type {(inputs: Buildersettings1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Paramètres du constructeur`)
};

const uk_buildersettings1 = /** @type {(inputs: Buildersettings1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Налаштування конструктора`)
};

/**
* | output |
* | --- |
* | "Builder settings" |
*
* @param {Buildersettings1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildersettings1 = /** @type {((inputs?: Buildersettings1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildersettings1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildersettings1(inputs)
	if (locale === "es") return es_buildersettings1(inputs)
	if (locale === "zh") return zh_buildersettings1(inputs)
	if (locale === "ja") return ja_buildersettings1(inputs)
	if (locale === "ko") return ko_buildersettings1(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildersettings1(inputs)
	if (locale === "de") return de_buildersettings1(inputs)
	if (locale === "fr") return fr_buildersettings1(inputs)
	return uk_buildersettings1(inputs)
});
export { buildersettings1 as "builderSettings" }