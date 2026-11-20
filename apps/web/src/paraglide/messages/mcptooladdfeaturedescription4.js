/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcptooladdfeaturedescription4Inputs */



/**
* | output |
* | --- |
* | "Add features to an existing project" |
*
* @param {Mcptooladdfeaturedescription4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const mcptooladdfeaturedescription4 = /** @type {((inputs?: Mcptooladdfeaturedescription4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcptooladdfeaturedescription4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Añade funciones a un proyecto existente")
	if (locale === "zh") return /** @type {LocalizedString} */ ("为现有项目添加功能")
	if (locale === "ja") return /** @type {LocalizedString} */ ("既存のプロジェクトに機能を追加する")
	if (locale === "ko") return /** @type {LocalizedString} */ ("기존 프로젝트에 기능 추가")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("為現有項目新增功能")
	if (locale === "de") return /** @type {LocalizedString} */ ("Fügen Sie Funktionen zu einem vorhandenen Projekt hinzu")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Ajouter des fonctionnalités à un projet existant")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Додайте функції до існуючого проєкту")
	return /** @type {LocalizedString} */ ("Add features to an existing project")
});
export { mcptooladdfeaturedescription4 as "mcpToolAddFeatureDescription" }