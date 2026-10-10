/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsactionsopengithub3Inputs */

const en_docsactionsopengithub3 = /** @type {(inputs: Docsactionsopengithub3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Open on GitHub`)
};

const es_docsactionsopengithub3 = /** @type {(inputs: Docsactionsopengithub3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Abrir en GitHub`)
};

const zh_docsactionsopengithub3 = /** @type {(inputs: Docsactionsopengithub3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`在 GitHub 上打开`)
};

const ja_docsactionsopengithub3 = /** @type {(inputs: Docsactionsopengithub3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`GitHub で開く`)
};

const ko_docsactionsopengithub3 = /** @type {(inputs: Docsactionsopengithub3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`GitHub에서 열기`)
};

const zh_hant1_docsactionsopengithub3 = /** @type {(inputs: Docsactionsopengithub3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`在 GitHub 上開啟`)
};

const de_docsactionsopengithub3 = /** @type {(inputs: Docsactionsopengithub3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Auf GitHub öffnen`)
};

const fr_docsactionsopengithub3 = /** @type {(inputs: Docsactionsopengithub3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ouvrir sur GitHub`)
};

const uk_docsactionsopengithub3 = /** @type {(inputs: Docsactionsopengithub3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Відкрити на GitHub`)
};

/**
* | output |
* | --- |
* | "Open on GitHub" |
*
* @param {Docsactionsopengithub3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsactionsopengithub3 = /** @type {((inputs?: Docsactionsopengithub3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsactionsopengithub3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsactionsopengithub3(inputs)
	if (locale === "zh") return zh_docsactionsopengithub3(inputs)
	if (locale === "ja") return ja_docsactionsopengithub3(inputs)
	if (locale === "ko") return ko_docsactionsopengithub3(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsactionsopengithub3(inputs)
	if (locale === "de") return de_docsactionsopengithub3(inputs)
	if (locale === "fr") return fr_docsactionsopengithub3(inputs)
	if (locale === "uk") return uk_docsactionsopengithub3(inputs)
	return en_docsactionsopengithub3(inputs)
});
export { docsactionsopengithub3 as "docsActionsOpenGithub" }