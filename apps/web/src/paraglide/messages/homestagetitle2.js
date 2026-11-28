/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homestagetitle2Inputs */



/**
* | output |
* | --- |
* | "Start from a stack that works" |
*
* @param {Homestagetitle2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homestagetitle2 = /** @type {((inputs?: Homestagetitle2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homestagetitle2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Empieza con un stack que funciona")
	if (locale === "zh") return /** @type {LocalizedString} */ ("从一个可用的技术栈开始")
	if (locale === "ja") return /** @type {LocalizedString} */ ("動くスタックから始める")
	if (locale === "ko") return /** @type {LocalizedString} */ ("작동하는 스택에서 시작하세요")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("從一個可用的技術堆疊開始")
	if (locale === "de") return /** @type {LocalizedString} */ ("Starte mit einem Stack, der funktioniert")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Partez d'une stack qui fonctionne")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Почніть зі стека, який працює")
	return /** @type {LocalizedString} */ ("Start from a stack that works")
});
export { homestagetitle2 as "homeStageTitle" }