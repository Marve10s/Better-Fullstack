/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptuiuilibrary6Inputs */

const en_docsclisummarytypescriptuiuilibrary6 = /** @type {(inputs: Docsclisummarytypescriptuiuilibrary6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Component library.`)
};

const es_docsclisummarytypescriptuiuilibrary6 = /** @type {(inputs: Docsclisummarytypescriptuiuilibrary6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Biblioteca de componentes.`)
};

const zh_docsclisummarytypescriptuiuilibrary6 = /** @type {(inputs: Docsclisummarytypescriptuiuilibrary6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`组件库。`)
};

const ja_docsclisummarytypescriptuiuilibrary6 = /** @type {(inputs: Docsclisummarytypescriptuiuilibrary6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`コンポーネントライブラリ。`)
};

const ko_docsclisummarytypescriptuiuilibrary6 = /** @type {(inputs: Docsclisummarytypescriptuiuilibrary6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`컴포넌트 라이브러리.`)
};

const zh_hant1_docsclisummarytypescriptuiuilibrary6 = /** @type {(inputs: Docsclisummarytypescriptuiuilibrary6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`元件函式庫。`)
};

const de_docsclisummarytypescriptuiuilibrary6 = /** @type {(inputs: Docsclisummarytypescriptuiuilibrary6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Komponentenbibliothek.`)
};

const fr_docsclisummarytypescriptuiuilibrary6 = /** @type {(inputs: Docsclisummarytypescriptuiuilibrary6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bibliothèque de composants.`)
};

const uk_docsclisummarytypescriptuiuilibrary6 = /** @type {(inputs: Docsclisummarytypescriptuiuilibrary6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Бібліотека компонентів.`)
};

/**
* | output |
* | --- |
* | "Component library." |
*
* @param {Docsclisummarytypescriptuiuilibrary6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarytypescriptuiuilibrary6 = /** @type {((inputs?: Docsclisummarytypescriptuiuilibrary6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarytypescriptuiuilibrary6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarytypescriptuiuilibrary6(inputs)
	if (locale === "zh") return zh_docsclisummarytypescriptuiuilibrary6(inputs)
	if (locale === "ja") return ja_docsclisummarytypescriptuiuilibrary6(inputs)
	if (locale === "ko") return ko_docsclisummarytypescriptuiuilibrary6(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarytypescriptuiuilibrary6(inputs)
	if (locale === "de") return de_docsclisummarytypescriptuiuilibrary6(inputs)
	if (locale === "fr") return fr_docsclisummarytypescriptuiuilibrary6(inputs)
	if (locale === "uk") return uk_docsclisummarytypescriptuiuilibrary6(inputs)
	return en_docsclisummarytypescriptuiuilibrary6(inputs)
});
export { docsclisummarytypescriptuiuilibrary6 as "docsCliSummaryTypescriptUiUiLibrary" }