/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarypythonpythonmedia5Inputs */



/**
* | output |
* | --- |
* | "Python media library." |
*
* @param {Docsclisummarypythonpythonmedia5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarypythonpythonmedia5 = /** @type {((inputs?: Docsclisummarypythonpythonmedia5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarypythonpythonmedia5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Biblioteca multimedia Python.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Python 媒体库。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Python のメディアライブラリ。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Python 미디어 라이브러리.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Python 媒體函式庫。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Medienbibliothek für Python.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Bibliothèque multimédia Python.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Медіабібліотека Python.")
	return /** @type {LocalizedString} */ ("Python media library.")
});
export { docsclisummarypythonpythonmedia5 as "docsCliSummaryPythonPythonMedia" }