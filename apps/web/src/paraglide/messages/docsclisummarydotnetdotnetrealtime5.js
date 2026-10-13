/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarydotnetdotnetrealtime5Inputs */

const en_docsclisummarydotnetdotnetrealtime5 = /** @type {(inputs: Docsclisummarydotnetdotnetrealtime5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.NET realtime.`)
};

const es_docsclisummarydotnetdotnetrealtime5 = /** @type {(inputs: Docsclisummarydotnetdotnetrealtime5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Comunicación en tiempo real en .NET.`)
};

const zh_docsclisummarydotnetdotnetrealtime5 = /** @type {(inputs: Docsclisummarydotnetdotnetrealtime5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.NET 实时通信。`)
};

const ja_docsclisummarydotnetdotnetrealtime5 = /** @type {(inputs: Docsclisummarydotnetdotnetrealtime5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.NET のリアルタイム通信。`)
};

const ko_docsclisummarydotnetdotnetrealtime5 = /** @type {(inputs: Docsclisummarydotnetdotnetrealtime5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.NET 실시간 통신.`)
};

const zh_hant1_docsclisummarydotnetdotnetrealtime5 = /** @type {(inputs: Docsclisummarydotnetdotnetrealtime5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.NET 即時通訊。`)
};

const de_docsclisummarydotnetdotnetrealtime5 = /** @type {(inputs: Docsclisummarydotnetdotnetrealtime5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Echtzeitkommunikation für .NET.`)
};

const fr_docsclisummarydotnetdotnetrealtime5 = /** @type {(inputs: Docsclisummarydotnetdotnetrealtime5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Communication en temps réel .NET.`)
};

const uk_docsclisummarydotnetdotnetrealtime5 = /** @type {(inputs: Docsclisummarydotnetdotnetrealtime5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Комунікація в реальному часі в .NET.`)
};

/**
* | output |
* | --- |
* | ".NET realtime." |
*
* @param {Docsclisummarydotnetdotnetrealtime5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarydotnetdotnetrealtime5 = /** @type {((inputs?: Docsclisummarydotnetdotnetrealtime5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarydotnetdotnetrealtime5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarydotnetdotnetrealtime5(inputs)
	if (locale === "zh") return zh_docsclisummarydotnetdotnetrealtime5(inputs)
	if (locale === "ja") return ja_docsclisummarydotnetdotnetrealtime5(inputs)
	if (locale === "ko") return ko_docsclisummarydotnetdotnetrealtime5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarydotnetdotnetrealtime5(inputs)
	if (locale === "de") return de_docsclisummarydotnetdotnetrealtime5(inputs)
	if (locale === "fr") return fr_docsclisummarydotnetdotnetrealtime5(inputs)
	if (locale === "uk") return uk_docsclisummarydotnetdotnetrealtime5(inputs)
	return en_docsclisummarydotnetdotnetrealtime5(inputs)
});
export { docsclisummarydotnetdotnetrealtime5 as "docsCliSummaryDotnetDotnetRealtime" }