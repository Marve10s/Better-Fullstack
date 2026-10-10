/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryelixirelixirclustering5Inputs */

const en_docsclisummaryelixirelixirclustering5 = /** @type {(inputs: Docsclisummaryelixirelixirclustering5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir clustering.`)
};

const es_docsclisummaryelixirelixirclustering5 = /** @type {(inputs: Docsclisummaryelixirelixirclustering5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Clustering en Elixir.`)
};

const zh_docsclisummaryelixirelixirclustering5 = /** @type {(inputs: Docsclisummaryelixirelixirclustering5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir 集群。`)
};

const ja_docsclisummaryelixirelixirclustering5 = /** @type {(inputs: Docsclisummaryelixirelixirclustering5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir のクラスタリング。`)
};

const ko_docsclisummaryelixirelixirclustering5 = /** @type {(inputs: Docsclisummaryelixirelixirclustering5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir 클러스터링.`)
};

const zh_hant1_docsclisummaryelixirelixirclustering5 = /** @type {(inputs: Docsclisummaryelixirelixirclustering5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir 叢集。`)
};

const de_docsclisummaryelixirelixirclustering5 = /** @type {(inputs: Docsclisummaryelixirelixirclustering5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Clusterbildung für Elixir.`)
};

const fr_docsclisummaryelixirelixirclustering5 = /** @type {(inputs: Docsclisummaryelixirelixirclustering5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Clustering Elixir.`)
};

const uk_docsclisummaryelixirelixirclustering5 = /** @type {(inputs: Docsclisummaryelixirelixirclustering5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Кластеризація в Elixir.`)
};

/**
* | output |
* | --- |
* | "Elixir clustering." |
*
* @param {Docsclisummaryelixirelixirclustering5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryelixirelixirclustering5 = /** @type {((inputs?: Docsclisummaryelixirelixirclustering5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryelixirelixirclustering5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryelixirelixirclustering5(inputs)
	if (locale === "zh") return zh_docsclisummaryelixirelixirclustering5(inputs)
	if (locale === "ja") return ja_docsclisummaryelixirelixirclustering5(inputs)
	if (locale === "ko") return ko_docsclisummaryelixirelixirclustering5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryelixirelixirclustering5(inputs)
	if (locale === "de") return de_docsclisummaryelixirelixirclustering5(inputs)
	if (locale === "fr") return fr_docsclisummaryelixirelixirclustering5(inputs)
	if (locale === "uk") return uk_docsclisummaryelixirelixirclustering5(inputs)
	return en_docsclisummaryelixirelixirclustering5(inputs)
});
export { docsclisummaryelixirelixirclustering5 as "docsCliSummaryElixirElixirClustering" }