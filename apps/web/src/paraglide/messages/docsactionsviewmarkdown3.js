/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsactionsviewmarkdown3Inputs */

const en_docsactionsviewmarkdown3 = /** @type {(inputs: Docsactionsviewmarkdown3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`View Markdown`)
};

const es_docsactionsviewmarkdown3 = /** @type {(inputs: Docsactionsviewmarkdown3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ver Markdown`)
};

const zh_docsactionsviewmarkdown3 = /** @type {(inputs: Docsactionsviewmarkdown3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`查看 Markdown`)
};

const ja_docsactionsviewmarkdown3 = /** @type {(inputs: Docsactionsviewmarkdown3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Markdown を表示`)
};

const ko_docsactionsviewmarkdown3 = /** @type {(inputs: Docsactionsviewmarkdown3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Markdown 보기`)
};

const zh_hant1_docsactionsviewmarkdown3 = /** @type {(inputs: Docsactionsviewmarkdown3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`檢視 Markdown`)
};

const de_docsactionsviewmarkdown3 = /** @type {(inputs: Docsactionsviewmarkdown3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Markdown anzeigen`)
};

const fr_docsactionsviewmarkdown3 = /** @type {(inputs: Docsactionsviewmarkdown3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Voir le Markdown`)
};

const uk_docsactionsviewmarkdown3 = /** @type {(inputs: Docsactionsviewmarkdown3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Переглянути Markdown`)
};

/**
* | output |
* | --- |
* | "View Markdown" |
*
* @param {Docsactionsviewmarkdown3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsactionsviewmarkdown3 = /** @type {((inputs?: Docsactionsviewmarkdown3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsactionsviewmarkdown3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsactionsviewmarkdown3(inputs)
	if (locale === "zh") return zh_docsactionsviewmarkdown3(inputs)
	if (locale === "ja") return ja_docsactionsviewmarkdown3(inputs)
	if (locale === "ko") return ko_docsactionsviewmarkdown3(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsactionsviewmarkdown3(inputs)
	if (locale === "de") return de_docsactionsviewmarkdown3(inputs)
	if (locale === "fr") return fr_docsactionsviewmarkdown3(inputs)
	if (locale === "uk") return uk_docsactionsviewmarkdown3(inputs)
	return en_docsactionsviewmarkdown3(inputs)
});
export { docsactionsviewmarkdown3 as "docsActionsViewMarkdown" }