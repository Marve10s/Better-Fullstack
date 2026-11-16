/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildergroupworkspaceplatforms3Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Workspace y plataformas")
	if (locale === "zh") return /** @type {LocalizedString} */ ("工作区与平台")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ワークスペースとプラットフォーム")
	if (locale === "ko") return /** @type {LocalizedString} */ ("작업 공간 및 플랫폼")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("工作區與平台")
	if (locale === "de") return /** @type {LocalizedString} */ ("Arbeitsbereich und Plattformen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Espace de travail et plateformes")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Робочий простір і платформи")
	return /** @type {LocalizedString} */ ("Workspace & Platforms")
});
export { buildergroupworkspaceplatforms3 as "builderGroupWorkspacePlatforms" }