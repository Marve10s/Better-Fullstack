/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptuiuilibrary6Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Biblioteca de componentes.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("组件库。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("コンポーネントライブラリ。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("컴포넌트 라이브러리.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("元件函式庫。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Komponentenbibliothek.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Bibliothèque de composants.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Бібліотека компонентів.")
	return /** @type {LocalizedString} */ ("Component library.")
});
export { docsclisummarytypescriptuiuilibrary6 as "docsCliSummaryTypescriptUiUiLibrary" }