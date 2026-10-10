/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryelixirelixirrealtime5Inputs */

const en_docsclisummaryelixirelixirrealtime5 = /** @type {(inputs: Docsclisummaryelixirelixirrealtime5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir realtime.`)
};

const es_docsclisummaryelixirelixirrealtime5 = /** @type {(inputs: Docsclisummaryelixirelixirrealtime5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Comunicación en tiempo real en Elixir.`)
};

const zh_docsclisummaryelixirelixirrealtime5 = /** @type {(inputs: Docsclisummaryelixirelixirrealtime5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir 实时通信。`)
};

const ja_docsclisummaryelixirelixirrealtime5 = /** @type {(inputs: Docsclisummaryelixirelixirrealtime5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir のリアルタイム通信。`)
};

const ko_docsclisummaryelixirelixirrealtime5 = /** @type {(inputs: Docsclisummaryelixirelixirrealtime5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir 실시간 통신.`)
};

const zh_hant1_docsclisummaryelixirelixirrealtime5 = /** @type {(inputs: Docsclisummaryelixirelixirrealtime5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir 即時通訊。`)
};

const de_docsclisummaryelixirelixirrealtime5 = /** @type {(inputs: Docsclisummaryelixirelixirrealtime5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Echtzeitkommunikation für Elixir.`)
};

const fr_docsclisummaryelixirelixirrealtime5 = /** @type {(inputs: Docsclisummaryelixirelixirrealtime5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Communication en temps réel Elixir.`)
};

const uk_docsclisummaryelixirelixirrealtime5 = /** @type {(inputs: Docsclisummaryelixirelixirrealtime5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Комунікація в реальному часі в Elixir.`)
};

/**
* | output |
* | --- |
* | "Elixir realtime." |
*
* @param {Docsclisummaryelixirelixirrealtime5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryelixirelixirrealtime5 = /** @type {((inputs?: Docsclisummaryelixirelixirrealtime5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryelixirelixirrealtime5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryelixirelixirrealtime5(inputs)
	if (locale === "zh") return zh_docsclisummaryelixirelixirrealtime5(inputs)
	if (locale === "ja") return ja_docsclisummaryelixirelixirrealtime5(inputs)
	if (locale === "ko") return ko_docsclisummaryelixirelixirrealtime5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryelixirelixirrealtime5(inputs)
	if (locale === "de") return de_docsclisummaryelixirelixirrealtime5(inputs)
	if (locale === "fr") return fr_docsclisummaryelixirelixirrealtime5(inputs)
	if (locale === "uk") return uk_docsclisummaryelixirelixirrealtime5(inputs)
	return en_docsclisummaryelixirelixirrealtime5(inputs)
});
export { docsclisummaryelixirelixirrealtime5 as "docsCliSummaryElixirElixirRealtime" }