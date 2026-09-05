/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Changelogrelease20260612summary2Inputs */

const en_changelogrelease20260612summary2 = /** @type {(inputs: Changelogrelease20260612summary2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`This release adds .NET as a first-class ecosystem, reduces install size, and fixes scaffold bugs.`)
};

const es_changelogrelease20260612summary2 = /** @type {(inputs: Changelogrelease20260612summary2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Esta versión incorpora .NET como ecosistema, reduce el tamaño de instalación y corrige errores de generación de proyectos.`)
};

const zh_changelogrelease20260612summary2 = /** @type {(inputs: Changelogrelease20260612summary2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`此版本新增 .NET 生态支持，缩小安装体积并修复项目生成错误。`)
};

const ja_changelogrelease20260612summary2 = /** @type {(inputs: Changelogrelease20260612summary2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`このリリースでは.NETエコシステムを追加し、インストールサイズを削減し、プロジェクト生成の不具合を修正しました。`)
};

const ko_changelogrelease20260612summary2 = /** @type {(inputs: Changelogrelease20260612summary2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`이번 릴리스는 .NET 생태계를 추가하고 설치 크기를 줄이며 프로젝트 생성 오류를 수정합니다.`)
};

const zh_hant1_changelogrelease20260612summary2 = /** @type {(inputs: Changelogrelease20260612summary2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`此版本新增 .NET 生態系支援，縮小安裝體積並修正專案產生錯誤。`)
};

const de_changelogrelease20260612summary2 = /** @type {(inputs: Changelogrelease20260612summary2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Diese Version ergänzt .NET als eigenständiges Ökosystem, reduziert die Installationsgröße und behebt Fehler bei der Projektgenerierung.`)
};

const fr_changelogrelease20260612summary2 = /** @type {(inputs: Changelogrelease20260612summary2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cette version ajoute .NET comme écosystème, réduit la taille de l’installation et corrige des erreurs de génération de projets.`)
};

const uk_changelogrelease20260612summary2 = /** @type {(inputs: Changelogrelease20260612summary2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Цей реліз додає екосистему .NET, зменшує розмір встановлення та виправляє помилки генерації проєктів.`)
};

/**
* | output |
* | --- |
* | "This release adds .NET as a first-class ecosystem, reduces install size, and fixes scaffold bugs." |
*
* @param {Changelogrelease20260612summary2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const changelogrelease20260612summary2 = /** @type {((inputs?: Changelogrelease20260612summary2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changelogrelease20260612summary2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_changelogrelease20260612summary2(inputs)
	if (locale === "zh") return zh_changelogrelease20260612summary2(inputs)
	if (locale === "ja") return ja_changelogrelease20260612summary2(inputs)
	if (locale === "ko") return ko_changelogrelease20260612summary2(inputs)
	if (locale === "zh-Hant") return zh_hant1_changelogrelease20260612summary2(inputs)
	if (locale === "de") return de_changelogrelease20260612summary2(inputs)
	if (locale === "fr") return fr_changelogrelease20260612summary2(inputs)
	if (locale === "uk") return uk_changelogrelease20260612summary2(inputs)
	return en_changelogrelease20260612summary2(inputs)
});
export { changelogrelease20260612summary2 as "changelogRelease20260612Summary" }