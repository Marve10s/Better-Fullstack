/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Blogtitle1Inputs */



/**
* | output |
* | --- |
* | "Notes from the workshop." |
*
* @param {Blogtitle1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const blogtitle1 = /** @type {((inputs?: Blogtitle1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Blogtitle1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Notas desde el taller.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("来自工作台的笔记。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ワークショップのメモ。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("워크숍에서 얻은 메모입니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("來自工作室的筆記。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Notizen aus dem Workshop.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Notes de l'atelier.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Нотатки з майстерні.")
	return /** @type {LocalizedString} */ ("Notes from the workshop.")
});
export { blogtitle1 as "blogTitle" }