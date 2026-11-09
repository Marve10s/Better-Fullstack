/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Changelogrelease20260612highlightinstall3Inputs */



/**
* | output |
* | --- |
* | "Cut install size by 42% (122 MB → 71 MB) and the web entry chunk by 32%." |
*
* @param {Changelogrelease20260612highlightinstall3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const changelogrelease20260612highlightinstall3 = /** @type {((inputs?: Changelogrelease20260612highlightinstall3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changelogrelease20260612highlightinstall3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Se redujo el tamaño de instalación un 42% (122 MB → 71 MB) y el chunk de entrada web un 32%.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("安装体积减少 42%（122 MB → 71 MB），web 入口 chunk 减少 32%。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("インストール サイズが 42% (122 MB → 71 MB)、Web エントリ チャンクが 32% 削減されました。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("설치 크기를 42%(122MB → 71MB) 줄이고 웹 항목 청크를 32% 줄였습니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("安裝體積減少 42%（122 MB → 71 MB），web 入口 chunk 減少 32%。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Installationsgröße um 42 % reduziert (122 MB → 71 MB) und den Web-Entry-Chunk um 32 %.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Réduisez la taille de l'installation de 42 % (122 Mo → 71 Mo) et la taille de l'entrée Web de 32 %.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Зменшили розмір встановлення на 42% (122 МБ → 71 МБ) і web entry chunk на 32%.")
	return /** @type {LocalizedString} */ ("Cut install size by 42% (122 MB → 71 MB) and the web entry chunk by 32%.")
});
export { changelogrelease20260612highlightinstall3 as "changelogRelease20260612HighlightInstall" }