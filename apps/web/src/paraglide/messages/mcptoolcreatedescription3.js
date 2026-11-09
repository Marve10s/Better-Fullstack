/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcptoolcreatedescription3Inputs */



/**
* | output |
* | --- |
* | "Scaffold a new project to disk" |
*
* @param {Mcptoolcreatedescription3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const mcptoolcreatedescription3 = /** @type {((inputs?: Mcptoolcreatedescription3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcptoolcreatedescription3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Crea un proyecto nuevo en disco")
	if (locale === "zh") return /** @type {LocalizedString} */ ("将新项目生成到磁盘")
	if (locale === "ja") return /** @type {LocalizedString} */ ("新しいプロジェクトをディスクにスキャフォールディングする")
	if (locale === "ko") return /** @type {LocalizedString} */ ("새 프로젝트를 디스크에 스캐폴드")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("將新專案產生到磁碟")
	if (locale === "de") return /** @type {LocalizedString} */ ("Erstellen Sie ein Gerüst für ein neues Projekt auf der Festplatte")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Échafauder un nouveau projet sur le disque")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Записує новий проєкт на диск")
	return /** @type {LocalizedString} */ ("Scaffold a new project to disk")
});
export { mcptoolcreatedescription3 as "mcpToolCreateDescription" }