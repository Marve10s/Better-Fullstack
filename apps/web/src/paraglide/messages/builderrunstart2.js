/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderrunstart2Inputs */



/**
* | output |
* | --- |
* | "Run stack" |
*
* @param {Builderrunstart2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderrunstart2 = /** @type {((inputs?: Builderrunstart2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderrunstart2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Ejecutar stack")
	if (locale === "zh") return /** @type {LocalizedString} */ ("运行技术栈")
	if (locale === "ja") return /** @type {LocalizedString} */ ("スタックを実行")
	if (locale === "ko") return /** @type {LocalizedString} */ ("스택 실행")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("執行技術棧")
	if (locale === "de") return /** @type {LocalizedString} */ ("Stack ausführen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Exécuter la stack")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Запустити стек")
	return /** @type {LocalizedString} */ ("Run stack")
});
export { builderrunstart2 as "builderRunStart" }