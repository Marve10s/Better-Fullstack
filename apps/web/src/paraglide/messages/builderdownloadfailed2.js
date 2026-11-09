/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderdownloadfailed2Inputs */



/**
* | output |
* | --- |
* | "Couldn't create the project ZIP" |
*
* @param {Builderdownloadfailed2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderdownloadfailed2 = /** @type {((inputs?: Builderdownloadfailed2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderdownloadfailed2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("No se pudo crear el ZIP del proyecto")
	if (locale === "zh") return /** @type {LocalizedString} */ ("无法创建项目 ZIP")
	if (locale === "ja") return /** @type {LocalizedString} */ ("プロジェクトZIPを作成できませんでした")
	if (locale === "ko") return /** @type {LocalizedString} */ ("프로젝트 ZIP을 만들 수 없습니다")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("無法建立專案 ZIP")
	if (locale === "de") return /** @type {LocalizedString} */ ("Projekt-ZIP konnte nicht erstellt werden")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Impossible de créer le ZIP du projet")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Не вдалося створити ZIP проєкту")
	return /** @type {LocalizedString} */ ("Couldn't create the project ZIP")
});
export { builderdownloadfailed2 as "builderDownloadFailed" }