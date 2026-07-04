/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Changelogrelease20260612highlightinstall3Inputs */

const en_changelogrelease20260612highlightinstall3 = /** @type {(inputs: Changelogrelease20260612highlightinstall3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cut install size by 42% (122 MB → 71 MB) and the web entry chunk by 32%.`)
};

const es_changelogrelease20260612highlightinstall3 = /** @type {(inputs: Changelogrelease20260612highlightinstall3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Se redujo el tamaño de instalación un 42% (122 MB → 71 MB) y el chunk de entrada web un 32%.`)
};

const zh_changelogrelease20260612highlightinstall3 = /** @type {(inputs: Changelogrelease20260612highlightinstall3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`安装体积减少 42%（122 MB → 71 MB），web 入口 chunk 减少 32%。`)
};

const ja_changelogrelease20260612highlightinstall3 = /** @type {(inputs: Changelogrelease20260612highlightinstall3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`インストール サイズが 42% (122 MB → 71 MB)、Web エントリ チャンクが 32% 削減されました。`)
};

const ko_changelogrelease20260612highlightinstall3 = /** @type {(inputs: Changelogrelease20260612highlightinstall3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`설치 크기를 42%(122MB → 71MB) 줄이고 웹 항목 청크를 32% 줄였습니다.`)
};

const zh_hant1_changelogrelease20260612highlightinstall3 = /** @type {(inputs: Changelogrelease20260612highlightinstall3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`安裝體積減少 42%（122 MB → 71 MB），web 入口 chunk 減少 32%。`)
};

const de_changelogrelease20260612highlightinstall3 = /** @type {(inputs: Changelogrelease20260612highlightinstall3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Reduzieren Sie die Installationsgröße um 42 % (122 MB → 71 MB) und den Webeintragsteil um 32 %.`)
};

const fr_changelogrelease20260612highlightinstall3 = /** @type {(inputs: Changelogrelease20260612highlightinstall3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Réduisez la taille de l'installation de 42 % (122 Mo → 71 Mo) et la taille de l'entrée Web de 32 %.`)
};

/**
* | output |
* | --- |
* | "Cut install size by 42% (122 MB → 71 MB) and the web entry chunk by 32%." |
*
* @param {Changelogrelease20260612highlightinstall3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const changelogrelease20260612highlightinstall3 = /** @type {((inputs?: Changelogrelease20260612highlightinstall3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changelogrelease20260612highlightinstall3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_changelogrelease20260612highlightinstall3(inputs)
	if (locale === "es") return es_changelogrelease20260612highlightinstall3(inputs)
	if (locale === "zh") return zh_changelogrelease20260612highlightinstall3(inputs)
	if (locale === "ja") return ja_changelogrelease20260612highlightinstall3(inputs)
	if (locale === "ko") return ko_changelogrelease20260612highlightinstall3(inputs)
	if (locale === "zh-Hant") return zh_hant1_changelogrelease20260612highlightinstall3(inputs)
	if (locale === "de") return de_changelogrelease20260612highlightinstall3(inputs)
	return fr_changelogrelease20260612highlightinstall3(inputs)
});
export { changelogrelease20260612highlightinstall3 as "changelogRelease20260612HighlightInstall" }