/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Changelogrelease20260612title2Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Ecosistema .NET y una instalación un 42 % más ligera")
	if (locale === "zh") return /** @type {LocalizedString} */ (".NET 生态与缩小 42% 的安装体积")
	if (locale === "ja") return /** @type {LocalizedString} */ (".NETエコシステムと42%軽量化されたインストール")
	if (locale === "ko") return /** @type {LocalizedString} */ (".NET 생태계와 42% 가벼워진 설치")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ (".NET 生態系與縮小 42% 的安裝體積")
	if (locale === "de") return /** @type {LocalizedString} */ (".NET-Ökosystem und eine um 42 % kleinere Installation")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Écosystème .NET et installation allégée de 42 %")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Екосистема .NET та зменшення розміру встановлення на 42%")
	return /** @type {LocalizedString} */ (".NET ecosystem and a 42% lighter install")
});
export { changelogrelease20260612title2 as "changelogRelease20260612Title" }