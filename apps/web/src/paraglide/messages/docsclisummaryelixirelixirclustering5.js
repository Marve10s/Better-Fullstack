/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryelixirelixirclustering5Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Clustering en Elixir.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Elixir 集群。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Elixir のクラスタリング。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Elixir 클러스터링.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Elixir 叢集。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Clusterbildung für Elixir.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Clustering Elixir.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Кластеризація в Elixir.")
	return /** @type {LocalizedString} */ ("Elixir clustering.")
});
export { docsclisummaryelixirelixirclustering5 as "docsCliSummaryElixirElixirClustering" }