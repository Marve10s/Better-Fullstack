/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarypythonpythonrealtime5Inputs */

const en_docsclisummarypythonpythonrealtime5 = /** @type {(inputs: Docsclisummarypythonpythonrealtime5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python realtime.`)
};

const es_docsclisummarypythonpythonrealtime5 = /** @type {(inputs: Docsclisummarypythonpythonrealtime5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Comunicación en tiempo real en Python.`)
};

const zh_docsclisummarypythonpythonrealtime5 = /** @type {(inputs: Docsclisummarypythonpythonrealtime5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python 实时通信。`)
};

const ja_docsclisummarypythonpythonrealtime5 = /** @type {(inputs: Docsclisummarypythonpythonrealtime5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python のリアルタイム通信。`)
};

const ko_docsclisummarypythonpythonrealtime5 = /** @type {(inputs: Docsclisummarypythonpythonrealtime5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python 실시간 통신.`)
};

const zh_hant1_docsclisummarypythonpythonrealtime5 = /** @type {(inputs: Docsclisummarypythonpythonrealtime5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Python 即時通訊。`)
};

const de_docsclisummarypythonpythonrealtime5 = /** @type {(inputs: Docsclisummarypythonpythonrealtime5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Echtzeitkommunikation für Python.`)
};

const fr_docsclisummarypythonpythonrealtime5 = /** @type {(inputs: Docsclisummarypythonpythonrealtime5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Communication en temps réel Python.`)
};

const uk_docsclisummarypythonpythonrealtime5 = /** @type {(inputs: Docsclisummarypythonpythonrealtime5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Комунікація в реальному часі в Python.`)
};

/**
* | output |
* | --- |
* | "Python realtime." |
*
* @param {Docsclisummarypythonpythonrealtime5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarypythonpythonrealtime5 = /** @type {((inputs?: Docsclisummarypythonpythonrealtime5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarypythonpythonrealtime5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarypythonpythonrealtime5(inputs)
	if (locale === "zh") return zh_docsclisummarypythonpythonrealtime5(inputs)
	if (locale === "ja") return ja_docsclisummarypythonpythonrealtime5(inputs)
	if (locale === "ko") return ko_docsclisummarypythonpythonrealtime5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarypythonpythonrealtime5(inputs)
	if (locale === "de") return de_docsclisummarypythonpythonrealtime5(inputs)
	if (locale === "fr") return fr_docsclisummarypythonpythonrealtime5(inputs)
	if (locale === "uk") return uk_docsclisummarypythonpythonrealtime5(inputs)
	return en_docsclisummarypythonpythonrealtime5(inputs)
});
export { docsclisummarypythonpythonrealtime5 as "docsCliSummaryPythonPythonRealtime" }