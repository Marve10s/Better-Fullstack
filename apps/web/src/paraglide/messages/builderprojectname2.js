/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderprojectname2Inputs */



/**
* | output |
* | --- |
* | "Project name" |
*
* @param {Builderprojectname2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderprojectname2 = /** @type {((inputs?: Builderprojectname2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderprojectname2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Nombre del proyecto")
	if (locale === "zh") return /** @type {LocalizedString} */ ("项目名称")
	if (locale === "ja") return /** @type {LocalizedString} */ ("プロジェクト名")
	if (locale === "ko") return /** @type {LocalizedString} */ ("프로젝트 이름")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("專案名稱")
	if (locale === "de") return /** @type {LocalizedString} */ ("Projektname")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Nom du projet")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Назва проєкту")
	return /** @type {LocalizedString} */ ("Project name")
});
export { builderprojectname2 as "builderProjectName" }