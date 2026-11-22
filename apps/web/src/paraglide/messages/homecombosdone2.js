/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homecombosdone2Inputs */



/**
* | output |
* | --- |
* | "done" |
*
* @param {Homecombosdone2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homecombosdone2 = /** @type {((inputs?: Homecombosdone2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homecombosdone2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("hecho")
	if (locale === "zh") return /** @type {LocalizedString} */ ("已完成")
	if (locale === "ja") return /** @type {LocalizedString} */ ("完了")
	if (locale === "ko") return /** @type {LocalizedString} */ ("완료")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("已完成")
	if (locale === "de") return /** @type {LocalizedString} */ ("geschafft")
	if (locale === "fr") return /** @type {LocalizedString} */ ("fait")
	if (locale === "uk") return /** @type {LocalizedString} */ ("готово")
	return /** @type {LocalizedString} */ ("done")
});
export { homecombosdone2 as "homeCombosDone" }