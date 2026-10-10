/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarygogologging5Inputs */

const en_docsclisummarygogologging5 = /** @type {(inputs: Docsclisummarygogologging5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go logging.`)
};

const es_docsclisummarygogologging5 = /** @type {(inputs: Docsclisummarygogologging5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Registro de eventos en Go.`)
};

const zh_docsclisummarygogologging5 = /** @type {(inputs: Docsclisummarygogologging5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go 日志。`)
};

const ja_docsclisummarygogologging5 = /** @type {(inputs: Docsclisummarygogologging5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go のロギング。`)
};

const ko_docsclisummarygogologging5 = /** @type {(inputs: Docsclisummarygogologging5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go 로깅.`)
};

const zh_hant1_docsclisummarygogologging5 = /** @type {(inputs: Docsclisummarygogologging5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go 日誌。`)
};

const de_docsclisummarygogologging5 = /** @type {(inputs: Docsclisummarygogologging5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Logging für Go.`)
};

const fr_docsclisummarygogologging5 = /** @type {(inputs: Docsclisummarygogologging5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Journalisation Go.`)
};

const uk_docsclisummarygogologging5 = /** @type {(inputs: Docsclisummarygogologging5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Журналювання в Go.`)
};

/**
* | output |
* | --- |
* | "Go logging." |
*
* @param {Docsclisummarygogologging5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarygogologging5 = /** @type {((inputs?: Docsclisummarygogologging5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarygogologging5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarygogologging5(inputs)
	if (locale === "zh") return zh_docsclisummarygogologging5(inputs)
	if (locale === "ja") return ja_docsclisummarygogologging5(inputs)
	if (locale === "ko") return ko_docsclisummarygogologging5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarygogologging5(inputs)
	if (locale === "de") return de_docsclisummarygogologging5(inputs)
	if (locale === "fr") return fr_docsclisummarygogologging5(inputs)
	if (locale === "uk") return uk_docsclisummarygogologging5(inputs)
	return en_docsclisummarygogologging5(inputs)
});
export { docsclisummarygogologging5 as "docsCliSummaryGoGoLogging" }