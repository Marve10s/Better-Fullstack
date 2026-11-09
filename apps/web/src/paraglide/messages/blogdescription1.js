/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Blogdescription1Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Lanzamientos y lo que aprendemos al crear un generador de proyectos fullstack.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("全栈项目生成器的版本发布与开发心得。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("フルスタックのプロジェクトジェネレーターの開発から得た学びとリリース情報。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("풀스택 프로젝트 생성기를 개발하며 배운 점과 릴리스 소식.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("全端專案產生器的版本發布與開發心得。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Releases und Erfahrungen bei der Entwicklung eines Fullstack-Projektgenerators.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Versions et enseignements tirés de la création d’un générateur de projets fullstack.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Релізи та досвід розробки генератора fullstack-проєктів.")
	return /** @type {LocalizedString} */ ("Releases and what we learn building a fullstack scaffolder.")
});
export { blogdescription1 as "blogDescription" }