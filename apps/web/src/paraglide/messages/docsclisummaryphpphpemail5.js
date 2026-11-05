/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryphpphpemail5Inputs */

const en_docsclisummaryphpphpemail5 = /** @type {(inputs: Docsclisummaryphpphpemail5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PHP email library.`)
};

const es_docsclisummaryphpphpemail5 = /** @type {(inputs: Docsclisummaryphpphpemail5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Biblioteca de correo electrónico de PHP.`)
};

const zh_docsclisummaryphpphpemail5 = /** @type {(inputs: Docsclisummaryphpphpemail5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PHP 邮件库。`)
};

const ja_docsclisummaryphpphpemail5 = /** @type {(inputs: Docsclisummaryphpphpemail5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PHP のメールライブラリ。`)
};

const ko_docsclisummaryphpphpemail5 = /** @type {(inputs: Docsclisummaryphpphpemail5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PHP 이메일 라이브러리.`)
};

const zh_hant1_docsclisummaryphpphpemail5 = /** @type {(inputs: Docsclisummaryphpphpemail5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PHP 郵件函式庫。`)
};

const de_docsclisummaryphpphpemail5 = /** @type {(inputs: Docsclisummaryphpphpemail5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`PHP-E-Mail-Bibliothek.`)
};

const fr_docsclisummaryphpphpemail5 = /** @type {(inputs: Docsclisummaryphpphpemail5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bibliothèque d'e-mail PHP.`)
};

const uk_docsclisummaryphpphpemail5 = /** @type {(inputs: Docsclisummaryphpphpemail5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Бібліотека електронної пошти PHP.`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryphpphpemail5(inputs)
	if (locale === "zh") return zh_docsclisummaryphpphpemail5(inputs)
	if (locale === "ja") return ja_docsclisummaryphpphpemail5(inputs)
	if (locale === "ko") return ko_docsclisummaryphpphpemail5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryphpphpemail5(inputs)
	if (locale === "de") return de_docsclisummaryphpphpemail5(inputs)
	if (locale === "fr") return fr_docsclisummaryphpphpemail5(inputs)
	if (locale === "uk") return uk_docsclisummaryphpphpemail5(inputs)
	return en_docsclisummaryphpphpemail5(inputs)
});
export { docsclisummaryphpphpemail5 as "docsCliSummaryPhpPhpEmail" }