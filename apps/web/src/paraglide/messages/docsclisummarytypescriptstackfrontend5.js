/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptstackfrontend5Inputs */

const en_docsclisummarytypescriptstackfrontend5 = /** @type {(inputs: Docsclisummarytypescriptstackfrontend5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Web frontend framework(s).`)
};

const es_docsclisummarytypescriptstackfrontend5 = /** @type {(inputs: Docsclisummarytypescriptstackfrontend5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Framework(s) de frontend web.`)
};

const zh_docsclisummarytypescriptstackfrontend5 = /** @type {(inputs: Docsclisummarytypescriptstackfrontend5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Web 前端框架（可多个）。`)
};

const ja_docsclisummarytypescriptstackfrontend5 = /** @type {(inputs: Docsclisummarytypescriptstackfrontend5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Web フロントエンドのフレームワーク (複数可)。`)
};

const ko_docsclisummarytypescriptstackfrontend5 = /** @type {(inputs: Docsclisummarytypescriptstackfrontend5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`웹 프런트엔드 프레임워크(여러 개 가능).`)
};

const zh_hant1_docsclisummarytypescriptstackfrontend5 = /** @type {(inputs: Docsclisummarytypescriptstackfrontend5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Web 前端框架（可選多個）。`)
};

const de_docsclisummarytypescriptstackfrontend5 = /** @type {(inputs: Docsclisummarytypescriptstackfrontend5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Framework(s) für das Web-Frontend.`)
};

const fr_docsclisummarytypescriptstackfrontend5 = /** @type {(inputs: Docsclisummarytypescriptstackfrontend5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Framework(s) de frontend web.`)
};

const uk_docsclisummarytypescriptstackfrontend5 = /** @type {(inputs: Docsclisummarytypescriptstackfrontend5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Фреймворк(и) вебфронтенду.`)
};

/**
* | output |
* | --- |
* | "Web frontend framework(s)." |
*
* @param {Docsclisummarytypescriptstackfrontend5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarytypescriptstackfrontend5 = /** @type {((inputs?: Docsclisummarytypescriptstackfrontend5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarytypescriptstackfrontend5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarytypescriptstackfrontend5(inputs)
	if (locale === "zh") return zh_docsclisummarytypescriptstackfrontend5(inputs)
	if (locale === "ja") return ja_docsclisummarytypescriptstackfrontend5(inputs)
	if (locale === "ko") return ko_docsclisummarytypescriptstackfrontend5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarytypescriptstackfrontend5(inputs)
	if (locale === "de") return de_docsclisummarytypescriptstackfrontend5(inputs)
	if (locale === "fr") return fr_docsclisummarytypescriptstackfrontend5(inputs)
	if (locale === "uk") return uk_docsclisummarytypescriptstackfrontend5(inputs)
	return en_docsclisummarytypescriptstackfrontend5(inputs)
});
export { docsclisummarytypescriptstackfrontend5 as "docsCliSummaryTypescriptStackFrontend" }