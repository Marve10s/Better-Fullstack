/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcprunterminal2Inputs */



/**
* | output |
* | --- |
* | "run in your terminal" |
*
* @param {Mcprunterminal2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const mcprunterminal2 = /** @type {((inputs?: Mcprunterminal2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcprunterminal2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("ejecutar en la terminal")
	if (locale === "zh") return /** @type {LocalizedString} */ ("在终端运行")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ターミナルで実行します")
	if (locale === "ko") return /** @type {LocalizedString} */ ("터미널에서 실행")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("在終端機執行")
	if (locale === "de") return /** @type {LocalizedString} */ ("in Ihrem Terminal ausführen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("exécuter dans votre terminal")
	if (locale === "uk") return /** @type {LocalizedString} */ ("запустіть у терміналі")
	return /** @type {LocalizedString} */ ("run in your terminal")
});
export { mcprunterminal2 as "mcpRunTerminal" }