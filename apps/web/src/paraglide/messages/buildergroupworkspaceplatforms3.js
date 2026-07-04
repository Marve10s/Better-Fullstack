/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildergroupworkspaceplatforms3Inputs */

const en_buildergroupworkspaceplatforms3 = /** @type {(inputs: Buildergroupworkspaceplatforms3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Workspace & Platforms`)
};

const es_buildergroupworkspaceplatforms3 = /** @type {(inputs: Buildergroupworkspaceplatforms3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Workspace y plataformas`)
};

const zh_buildergroupworkspaceplatforms3 = /** @type {(inputs: Buildergroupworkspaceplatforms3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`工作区与平台`)
};

const ja_buildergroupworkspaceplatforms3 = /** @type {(inputs: Buildergroupworkspaceplatforms3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ワークスペースとプラットフォーム`)
};

const ko_buildergroupworkspaceplatforms3 = /** @type {(inputs: Buildergroupworkspaceplatforms3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`작업 공간 및 플랫폼`)
};

const zh_hant1_buildergroupworkspaceplatforms3 = /** @type {(inputs: Buildergroupworkspaceplatforms3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`工作區與平台`)
};

const de_buildergroupworkspaceplatforms3 = /** @type {(inputs: Buildergroupworkspaceplatforms3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Arbeitsbereich und Plattformen`)
};

const fr_buildergroupworkspaceplatforms3 = /** @type {(inputs: Buildergroupworkspaceplatforms3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Espace de travail et plateformes`)
};

const uk_buildergroupworkspaceplatforms3 = /** @type {(inputs: Buildergroupworkspaceplatforms3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Робочий простір і платформи`)
};

/**
* | output |
* | --- |
* | "Workspace & Platforms" |
*
* @param {Buildergroupworkspaceplatforms3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildergroupworkspaceplatforms3 = /** @type {((inputs?: Buildergroupworkspaceplatforms3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildergroupworkspaceplatforms3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildergroupworkspaceplatforms3(inputs)
	if (locale === "es") return es_buildergroupworkspaceplatforms3(inputs)
	if (locale === "zh") return zh_buildergroupworkspaceplatforms3(inputs)
	if (locale === "ja") return ja_buildergroupworkspaceplatforms3(inputs)
	if (locale === "ko") return ko_buildergroupworkspaceplatforms3(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildergroupworkspaceplatforms3(inputs)
	if (locale === "de") return de_buildergroupworkspaceplatforms3(inputs)
	if (locale === "fr") return fr_buildergroupworkspaceplatforms3(inputs)
	return uk_buildergroupworkspaceplatforms3(inputs)
});
export { buildergroupworkspaceplatforms3 as "builderGroupWorkspacePlatforms" }