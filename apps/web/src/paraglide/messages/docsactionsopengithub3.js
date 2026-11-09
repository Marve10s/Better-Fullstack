/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsactionsopengithub3Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Abrir en GitHub")
	if (locale === "zh") return /** @type {LocalizedString} */ ("在 GitHub 上打开")
	if (locale === "ja") return /** @type {LocalizedString} */ ("GitHub で開く")
	if (locale === "ko") return /** @type {LocalizedString} */ ("GitHub에서 열기")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("在 GitHub 上開啟")
	if (locale === "de") return /** @type {LocalizedString} */ ("Auf GitHub öffnen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Ouvrir sur GitHub")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Відкрити на GitHub")
	return /** @type {LocalizedString} */ ("Open on GitHub")
});
export { docsactionsopengithub3 as "docsActionsOpenGithub" }