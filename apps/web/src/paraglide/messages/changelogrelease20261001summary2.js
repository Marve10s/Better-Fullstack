/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Changelogrelease20261001summary2Inputs */

const en_changelogrelease20261001summary2 = /** @type {(inputs: Changelogrelease20261001summary2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Solid, Effect, and the TanStack libraries in one project, with a showcase app that uses each library.`)
};

const es_changelogrelease20261001summary2 = /** @type {(inputs: Changelogrelease20261001summary2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Solid, Effect y las bibliotecas de TanStack en un solo proyecto, con una app de demostración que usa cada biblioteca.`)
};

const zh_changelogrelease20261001summary2 = /** @type {(inputs: Changelogrelease20261001summary2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`在一个项目中集成 Solid、Effect 和 TanStack 库，并附带使用每个库的展示应用。`)
};

const ja_changelogrelease20261001summary2 = /** @type {(inputs: Changelogrelease20261001summary2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Solid、Effect、TanStack のライブラリを1つのプロジェクトに。各ライブラリを使ったショーケースアプリ付き。`)
};

const ko_changelogrelease20261001summary2 = /** @type {(inputs: Changelogrelease20261001summary2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Solid, Effect, TanStack 라이브러리를 한 프로젝트에 담고, 각 라이브러리를 사용하는 쇼케이스 앱도 포함합니다.`)
};

const zh_hant1_changelogrelease20261001summary2 = /** @type {(inputs: Changelogrelease20261001summary2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`在一個專案中整合 Solid、Effect 與 TanStack 函式庫，並附上使用每個函式庫的展示應用程式。`)
};

const de_changelogrelease20261001summary2 = /** @type {(inputs: Changelogrelease20261001summary2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Solid, Effect und die TanStack-Bibliotheken in einem Projekt, mit einer Showcase-App, die jede Bibliothek nutzt.`)
};

const fr_changelogrelease20261001summary2 = /** @type {(inputs: Changelogrelease20261001summary2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Solid, Effect et les bibliothèques TanStack dans un seul projet, avec une application de démonstration qui utilise chaque bibliothèque.`)
};

const uk_changelogrelease20261001summary2 = /** @type {(inputs: Changelogrelease20261001summary2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Solid, Effect і бібліотеки TanStack в одному проєкті, з демонстраційним застосунком, що використовує кожну бібліотеку.`)
};

/**
* | output |
* | --- |
* | "Solid, Effect, and the TanStack libraries in one project, with a showcase app that uses each library." |
*
* @param {Changelogrelease20261001summary2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const changelogrelease20261001summary2 = /** @type {((inputs?: Changelogrelease20261001summary2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changelogrelease20261001summary2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_changelogrelease20261001summary2(inputs)
	if (locale === "zh") return zh_changelogrelease20261001summary2(inputs)
	if (locale === "ja") return ja_changelogrelease20261001summary2(inputs)
	if (locale === "ko") return ko_changelogrelease20261001summary2(inputs)
	if (locale === "zh-Hant") return zh_hant1_changelogrelease20261001summary2(inputs)
	if (locale === "de") return de_changelogrelease20261001summary2(inputs)
	if (locale === "fr") return fr_changelogrelease20261001summary2(inputs)
	if (locale === "uk") return uk_changelogrelease20261001summary2(inputs)
	return en_changelogrelease20261001summary2(inputs)
});
export { changelogrelease20261001summary2 as "changelogRelease20261001Summary" }