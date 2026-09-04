/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Changelogrelease20260612title2Inputs */

const en_changelogrelease20260612title2 = /** @type {(inputs: Changelogrelease20260612title2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.NET ecosystem and a 42% lighter install`)
};

const es_changelogrelease20260612title2 = /** @type {(inputs: Changelogrelease20260612title2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ecosistema .NET y una instalación un 42 % más ligera`)
};

const zh_changelogrelease20260612title2 = /** @type {(inputs: Changelogrelease20260612title2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.NET 生态与缩小 42% 的安装体积`)
};

const ja_changelogrelease20260612title2 = /** @type {(inputs: Changelogrelease20260612title2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.NETエコシステムと42%軽量化されたインストール`)
};

const ko_changelogrelease20260612title2 = /** @type {(inputs: Changelogrelease20260612title2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.NET 생태계와 42% 가벼워진 설치`)
};

const zh_hant1_changelogrelease20260612title2 = /** @type {(inputs: Changelogrelease20260612title2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.NET 生態系與縮小 42% 的安裝體積`)
};

const de_changelogrelease20260612title2 = /** @type {(inputs: Changelogrelease20260612title2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.NET-Ökosystem und eine um 42 % kleinere Installation`)
};

const fr_changelogrelease20260612title2 = /** @type {(inputs: Changelogrelease20260612title2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Écosystème .NET et installation allégée de 42 %`)
};

const uk_changelogrelease20260612title2 = /** @type {(inputs: Changelogrelease20260612title2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Екосистема .NET та зменшення розміру встановлення на 42%`)
};

/**
* | output |
* | --- |
* | ".NET ecosystem and a 42% lighter install" |
*
* @param {Changelogrelease20260612title2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const changelogrelease20260612title2 = /** @type {((inputs?: Changelogrelease20260612title2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changelogrelease20260612title2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_changelogrelease20260612title2(inputs)
	if (locale === "zh") return zh_changelogrelease20260612title2(inputs)
	if (locale === "ja") return ja_changelogrelease20260612title2(inputs)
	if (locale === "ko") return ko_changelogrelease20260612title2(inputs)
	if (locale === "zh-Hant") return zh_hant1_changelogrelease20260612title2(inputs)
	if (locale === "de") return de_changelogrelease20260612title2(inputs)
	if (locale === "fr") return fr_changelogrelease20260612title2(inputs)
	if (locale === "uk") return uk_changelogrelease20260612title2(inputs)
	return en_changelogrelease20260612title2(inputs)
});
export { changelogrelease20260612title2 as "changelogRelease20260612Title" }