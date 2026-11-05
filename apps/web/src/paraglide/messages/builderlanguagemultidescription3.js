/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderlanguagemultidescription3Inputs */

const en_builderlanguagemultidescription3 = /** @type {(inputs: Builderlanguagemultidescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Mix languages, like a TypeScript frontend with a Go backend.`)
};

const es_builderlanguagemultidescription3 = /** @type {(inputs: Builderlanguagemultidescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Combina lenguajes, como un frontend en TypeScript con un backend en Go.`)
};

const zh_builderlanguagemultidescription3 = /** @type {(inputs: Builderlanguagemultidescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`组合多种语言，例如 TypeScript 前端搭配 Go 后端。`)
};

const ja_builderlanguagemultidescription3 = /** @type {(inputs: Builderlanguagemultidescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`TypeScript のフロントエンドと Go のバックエンドのように、言語を組み合わせます。`)
};

const ko_builderlanguagemultidescription3 = /** @type {(inputs: Builderlanguagemultidescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`TypeScript 프런트엔드와 Go 백엔드처럼 언어를 조합합니다.`)
};

const zh_hant1_builderlanguagemultidescription3 = /** @type {(inputs: Builderlanguagemultidescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`組合多種語言，例如 TypeScript 前端搭配 Go 後端。`)
};

const de_builderlanguagemultidescription3 = /** @type {(inputs: Builderlanguagemultidescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sprachen kombinieren, etwa ein TypeScript-Frontend mit einem Go-Backend.`)
};

const fr_builderlanguagemultidescription3 = /** @type {(inputs: Builderlanguagemultidescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Combinez des langages, par exemple un frontend TypeScript avec un backend Go.`)
};

const uk_builderlanguagemultidescription3 = /** @type {(inputs: Builderlanguagemultidescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Поєднуйте мови, наприклад фронтенд на TypeScript і бекенд на Go.`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_builderlanguagemultidescription3(inputs)
	if (locale === "zh") return zh_builderlanguagemultidescription3(inputs)
	if (locale === "ja") return ja_builderlanguagemultidescription3(inputs)
	if (locale === "ko") return ko_builderlanguagemultidescription3(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderlanguagemultidescription3(inputs)
	if (locale === "de") return de_builderlanguagemultidescription3(inputs)
	if (locale === "fr") return fr_builderlanguagemultidescription3(inputs)
	if (locale === "uk") return uk_builderlanguagemultidescription3(inputs)
	return en_builderlanguagemultidescription3(inputs)
});
export { builderlanguagemultidescription3 as "builderLanguageMultiDescription" }