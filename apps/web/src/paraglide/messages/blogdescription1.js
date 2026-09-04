/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Blogdescription1Inputs */

const en_blogdescription1 = /** @type {(inputs: Blogdescription1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Releases and what we learn building a fullstack scaffolder.`)
};

const es_blogdescription1 = /** @type {(inputs: Blogdescription1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Lanzamientos y lo que aprendemos al crear un generador de proyectos fullstack.`)
};

const zh_blogdescription1 = /** @type {(inputs: Blogdescription1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`全栈项目生成器的版本发布与开发心得。`)
};

const ja_blogdescription1 = /** @type {(inputs: Blogdescription1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`フルスタックのプロジェクトジェネレーターの開発から得た学びとリリース情報。`)
};

const ko_blogdescription1 = /** @type {(inputs: Blogdescription1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`풀스택 프로젝트 생성기를 개발하며 배운 점과 릴리스 소식.`)
};

const zh_hant1_blogdescription1 = /** @type {(inputs: Blogdescription1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`全端專案產生器的版本發布與開發心得。`)
};

const de_blogdescription1 = /** @type {(inputs: Blogdescription1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Releases und Erfahrungen bei der Entwicklung eines Fullstack-Projektgenerators.`)
};

const fr_blogdescription1 = /** @type {(inputs: Blogdescription1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Versions et enseignements tirés de la création d’un générateur de projets fullstack.`)
};

const uk_blogdescription1 = /** @type {(inputs: Blogdescription1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Релізи та досвід розробки генератора fullstack-проєктів.`)
};

/**
* | output |
* | --- |
* | "Releases and what we learn building a fullstack scaffolder." |
*
* @param {Blogdescription1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const blogdescription1 = /** @type {((inputs?: Blogdescription1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Blogdescription1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_blogdescription1(inputs)
	if (locale === "zh") return zh_blogdescription1(inputs)
	if (locale === "ja") return ja_blogdescription1(inputs)
	if (locale === "ko") return ko_blogdescription1(inputs)
	if (locale === "zh-Hant") return zh_hant1_blogdescription1(inputs)
	if (locale === "de") return de_blogdescription1(inputs)
	if (locale === "fr") return fr_blogdescription1(inputs)
	if (locale === "uk") return uk_blogdescription1(inputs)
	return en_blogdescription1(inputs)
});
export { blogdescription1 as "blogDescription" }