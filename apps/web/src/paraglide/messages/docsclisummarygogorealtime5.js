/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarygogorealtime5Inputs */

const en_docsclisummarygogorealtime5 = /** @type {(inputs: Docsclisummarygogorealtime5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go realtime.`)
};

const es_docsclisummarygogorealtime5 = /** @type {(inputs: Docsclisummarygogorealtime5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Comunicación en tiempo real en Go.`)
};

const zh_docsclisummarygogorealtime5 = /** @type {(inputs: Docsclisummarygogorealtime5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go 实时通信。`)
};

const ja_docsclisummarygogorealtime5 = /** @type {(inputs: Docsclisummarygogorealtime5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go のリアルタイム通信。`)
};

const ko_docsclisummarygogorealtime5 = /** @type {(inputs: Docsclisummarygogorealtime5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go 실시간 통신.`)
};

const zh_hant1_docsclisummarygogorealtime5 = /** @type {(inputs: Docsclisummarygogorealtime5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go 即時通訊。`)
};

const de_docsclisummarygogorealtime5 = /** @type {(inputs: Docsclisummarygogorealtime5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Echtzeitkommunikation für Go.`)
};

const fr_docsclisummarygogorealtime5 = /** @type {(inputs: Docsclisummarygogorealtime5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Communication en temps réel Go.`)
};

const uk_docsclisummarygogorealtime5 = /** @type {(inputs: Docsclisummarygogorealtime5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Комунікація в реальному часі в Go.`)
};

/**
* | output |
* | --- |
* | "Go realtime." |
*
* @param {Docsclisummarygogorealtime5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarygogorealtime5 = /** @type {((inputs?: Docsclisummarygogorealtime5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarygogorealtime5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarygogorealtime5(inputs)
	if (locale === "zh") return zh_docsclisummarygogorealtime5(inputs)
	if (locale === "ja") return ja_docsclisummarygogorealtime5(inputs)
	if (locale === "ko") return ko_docsclisummarygogorealtime5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarygogorealtime5(inputs)
	if (locale === "de") return de_docsclisummarygogorealtime5(inputs)
	if (locale === "fr") return fr_docsclisummarygogorealtime5(inputs)
	if (locale === "uk") return uk_docsclisummarygogorealtime5(inputs)
	return en_docsclisummarygogorealtime5(inputs)
});
export { docsclisummarygogorealtime5 as "docsCliSummaryGoGoRealtime" }