/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarytypescriptservicesrealtime5Inputs */

const en_docsclisummarytypescriptservicesrealtime5 = /** @type {(inputs: Docsclisummarytypescriptservicesrealtime5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Realtime transport.`)
};

const es_docsclisummarytypescriptservicesrealtime5 = /** @type {(inputs: Docsclisummarytypescriptservicesrealtime5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Transporte en tiempo real.`)
};

const zh_docsclisummarytypescriptservicesrealtime5 = /** @type {(inputs: Docsclisummarytypescriptservicesrealtime5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`实时传输方案。`)
};

const ja_docsclisummarytypescriptservicesrealtime5 = /** @type {(inputs: Docsclisummarytypescriptservicesrealtime5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`リアルタイム通信の方式。`)
};

const ko_docsclisummarytypescriptservicesrealtime5 = /** @type {(inputs: Docsclisummarytypescriptservicesrealtime5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`실시간 전송 방식.`)
};

const zh_hant1_docsclisummarytypescriptservicesrealtime5 = /** @type {(inputs: Docsclisummarytypescriptservicesrealtime5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`即時傳輸方案。`)
};

const de_docsclisummarytypescriptservicesrealtime5 = /** @type {(inputs: Docsclisummarytypescriptservicesrealtime5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Echtzeittransport.`)
};

const fr_docsclisummarytypescriptservicesrealtime5 = /** @type {(inputs: Docsclisummarytypescriptservicesrealtime5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Transport en temps réel.`)
};

const uk_docsclisummarytypescriptservicesrealtime5 = /** @type {(inputs: Docsclisummarytypescriptservicesrealtime5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Транспорт у реальному часі.`)
};

/**
* | output |
* | --- |
* | "Realtime transport." |
*
* @param {Docsclisummarytypescriptservicesrealtime5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarytypescriptservicesrealtime5 = /** @type {((inputs?: Docsclisummarytypescriptservicesrealtime5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarytypescriptservicesrealtime5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarytypescriptservicesrealtime5(inputs)
	if (locale === "zh") return zh_docsclisummarytypescriptservicesrealtime5(inputs)
	if (locale === "ja") return ja_docsclisummarytypescriptservicesrealtime5(inputs)
	if (locale === "ko") return ko_docsclisummarytypescriptservicesrealtime5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarytypescriptservicesrealtime5(inputs)
	if (locale === "de") return de_docsclisummarytypescriptservicesrealtime5(inputs)
	if (locale === "fr") return fr_docsclisummarytypescriptservicesrealtime5(inputs)
	if (locale === "uk") return uk_docsclisummarytypescriptservicesrealtime5(inputs)
	return en_docsclisummarytypescriptservicesrealtime5(inputs)
});
export { docsclisummarytypescriptservicesrealtime5 as "docsCliSummaryTypescriptServicesRealtime" }