/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Savedrename1Inputs */



/**
* | output |
* | --- |
* | "Rename" |
*
* @param {Savedrename1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const savedrename1 = /** @type {((inputs?: Savedrename1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Savedrename1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Renombrar")
	if (locale === "zh") return /** @type {LocalizedString} */ ("重命名")
	if (locale === "ja") return /** @type {LocalizedString} */ ("名前の変更")
	if (locale === "ko") return /** @type {LocalizedString} */ ("이름 바꾸기")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("重新命名")
	if (locale === "de") return /** @type {LocalizedString} */ ("Umbenennen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Renommer")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Перейменувати")
	return /** @type {LocalizedString} */ ("Rename")
});
export { savedrename1 as "savedRename" }