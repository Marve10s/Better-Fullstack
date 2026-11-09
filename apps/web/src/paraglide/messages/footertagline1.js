/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Footertagline1Inputs */



/**
* | output |
* | --- |
* | "Fullstack starters you can run before you clone." |
*
* @param {Footertagline1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const footertagline1 = /** @type {((inputs?: Footertagline1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Footertagline1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Proyectos fullstack que puedes ejecutar antes de clonar.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("克隆之前就能运行的全栈起始项目。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("クローンする前に実行できるフルスタックスターター。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("클론하기 전에 실행해 볼 수 있는 풀스택 스타터.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("克隆之前就能執行的全端起始專案。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Fullstack-Starter, die sich vor dem Klonen ausführen lassen.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Des projets fullstack que vous pouvez exécuter avant de les cloner.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Повностекові стартери, які можна запустити до клонування.")
	return /** @type {LocalizedString} */ ("Fullstack starters you can run before you clone.")
});
export { footertagline1 as "footerTagline" }