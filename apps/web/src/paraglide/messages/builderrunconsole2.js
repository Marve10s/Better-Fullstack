/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderrunconsole2Inputs */



/**
* | output |
* | --- |
* | "Runtime output" |
*
* @param {Builderrunconsole2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderrunconsole2 = /** @type {((inputs?: Builderrunconsole2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderrunconsole2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Salida de ejecución")
	if (locale === "zh") return /** @type {LocalizedString} */ ("运行时输出")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ランタイム出力")
	if (locale === "ko") return /** @type {LocalizedString} */ ("런타임 출력")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("執行階段輸出")
	if (locale === "de") return /** @type {LocalizedString} */ ("Laufzeitausgabe")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Sortie d’exécution")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Вивід середовища")
	return /** @type {LocalizedString} */ ("Runtime output")
});
export { builderrunconsole2 as "builderRunConsole" }