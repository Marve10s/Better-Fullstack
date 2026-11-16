/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderlanguagemultidescription3Inputs */



/**
* | output |
* | --- |
* | "Mix languages, like a TypeScript frontend with a Go backend." |
*
* @param {Builderlanguagemultidescription3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderlanguagemultidescription3 = /** @type {((inputs?: Builderlanguagemultidescription3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderlanguagemultidescription3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Combina lenguajes, como un frontend en TypeScript con un backend en Go.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("组合多种语言，例如 TypeScript 前端搭配 Go 后端。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("TypeScript のフロントエンドと Go のバックエンドのように、言語を組み合わせます。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("TypeScript 프런트엔드와 Go 백엔드처럼 언어를 조합합니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("組合多種語言，例如 TypeScript 前端搭配 Go 後端。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Sprachen kombinieren, etwa ein TypeScript-Frontend mit einem Go-Backend.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Combinez des langages, par exemple un frontend TypeScript avec un backend Go.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Поєднуйте мови, наприклад фронтенд на TypeScript і бекенд на Go.")
	return /** @type {LocalizedString} */ ("Mix languages, like a TypeScript frontend with a Go backend.")
});
export { builderlanguagemultidescription3 as "builderLanguageMultiDescription" }