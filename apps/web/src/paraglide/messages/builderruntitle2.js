/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderruntitle2Inputs */



/**
* | output |
* | --- |
* | "Run this stack" |
*
* @param {Builderruntitle2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderruntitle2 = /** @type {((inputs?: Builderruntitle2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderruntitle2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Ejecutar este stack")
	if (locale === "zh") return /** @type {LocalizedString} */ ("运行此技术栈")
	if (locale === "ja") return /** @type {LocalizedString} */ ("このスタックを実行")
	if (locale === "ko") return /** @type {LocalizedString} */ ("이 스택 실행")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("執行此技術棧")
	if (locale === "de") return /** @type {LocalizedString} */ ("Diesen Stack ausführen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Exécuter cette stack")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Запустити цей стек")
	return /** @type {LocalizedString} */ ("Run this stack")
});
export { builderruntitle2 as "builderRunTitle" }