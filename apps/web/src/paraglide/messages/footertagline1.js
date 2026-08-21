/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Footertagline1Inputs */

const en_footertagline1 = /** @type {(inputs: Footertagline1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fullstack starters you can run before you clone.`)
};

const es_footertagline1 = /** @type {(inputs: Footertagline1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Proyectos fullstack que puedes ejecutar antes de clonar.`)
};

const zh_footertagline1 = /** @type {(inputs: Footertagline1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`克隆之前就能运行的全栈起始项目。`)
};

const ja_footertagline1 = /** @type {(inputs: Footertagline1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`クローンする前に実行できるフルスタックスターター。`)
};

const ko_footertagline1 = /** @type {(inputs: Footertagline1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`클론하기 전에 실행해 볼 수 있는 풀스택 스타터.`)
};

const zh_hant1_footertagline1 = /** @type {(inputs: Footertagline1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`克隆之前就能執行的全端起始專案。`)
};

const de_footertagline1 = /** @type {(inputs: Footertagline1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fullstack-Starter, die sich vor dem Klonen ausführen lassen.`)
};

const fr_footertagline1 = /** @type {(inputs: Footertagline1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Des projets fullstack que vous pouvez exécuter avant de les cloner.`)
};

const uk_footertagline1 = /** @type {(inputs: Footertagline1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Повностекові стартери, які можна запустити до клонування.`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_footertagline1(inputs)
	if (locale === "zh") return zh_footertagline1(inputs)
	if (locale === "ja") return ja_footertagline1(inputs)
	if (locale === "ko") return ko_footertagline1(inputs)
	if (locale === "zh-Hant") return zh_hant1_footertagline1(inputs)
	if (locale === "de") return de_footertagline1(inputs)
	if (locale === "fr") return fr_footertagline1(inputs)
	if (locale === "uk") return uk_footertagline1(inputs)
	return en_footertagline1(inputs)
});
export { footertagline1 as "footerTagline" }