/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryphpphpemail5Inputs */



/**
* | output |
* | --- |
* | "PHP email library." |
*
* @param {Docsclisummaryphpphpemail5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryphpphpemail5 = /** @type {((inputs?: Docsclisummaryphpphpemail5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryphpphpemail5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Biblioteca de correo electrónico de PHP.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("PHP 邮件库。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("PHP のメールライブラリ。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("PHP 이메일 라이브러리.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("PHP 郵件函式庫。")
	if (locale === "de") return /** @type {LocalizedString} */ ("PHP-E-Mail-Bibliothek.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Bibliothèque d'e-mail PHP.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Бібліотека електронної пошти PHP.")
	return /** @type {LocalizedString} */ ("PHP email library.")
});
export { docsclisummaryphpphpemail5 as "docsCliSummaryPhpPhpEmail" }