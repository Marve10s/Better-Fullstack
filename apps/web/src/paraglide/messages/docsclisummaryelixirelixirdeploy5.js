/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryelixirelixirdeploy5Inputs */

const en_docsclisummaryelixirelixirdeploy5 = /** @type {(inputs: Docsclisummaryelixirelixirdeploy5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir deploy target.`)
};

const es_docsclisummaryelixirelixirdeploy5 = /** @type {(inputs: Docsclisummaryelixirelixirdeploy5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Destino de despliegue Elixir.`)
};

const zh_docsclisummaryelixirelixirdeploy5 = /** @type {(inputs: Docsclisummaryelixirelixirdeploy5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir 部署目标。`)
};

const ja_docsclisummaryelixirelixirdeploy5 = /** @type {(inputs: Docsclisummaryelixirelixirdeploy5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir のデプロイ先。`)
};

const ko_docsclisummaryelixirelixirdeploy5 = /** @type {(inputs: Docsclisummaryelixirelixirdeploy5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir 배포 대상.`)
};

const zh_hant1_docsclisummaryelixirelixirdeploy5 = /** @type {(inputs: Docsclisummaryelixirelixirdeploy5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elixir 部署目標。`)
};

const de_docsclisummaryelixirelixirdeploy5 = /** @type {(inputs: Docsclisummaryelixirelixirdeploy5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Deployment-Ziel für Elixir.`)
};

const fr_docsclisummaryelixirelixirdeploy5 = /** @type {(inputs: Docsclisummaryelixirelixirdeploy5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cible de déploiement Elixir.`)
};

const uk_docsclisummaryelixirelixirdeploy5 = /** @type {(inputs: Docsclisummaryelixirelixirdeploy5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Цільове середовище розгортання Elixir.`)
};

/**
* | output |
* | --- |
* | "Elixir deploy target." |
*
* @param {Docsclisummaryelixirelixirdeploy5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryelixirelixirdeploy5 = /** @type {((inputs?: Docsclisummaryelixirelixirdeploy5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryelixirelixirdeploy5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryelixirelixirdeploy5(inputs)
	if (locale === "zh") return zh_docsclisummaryelixirelixirdeploy5(inputs)
	if (locale === "ja") return ja_docsclisummaryelixirelixirdeploy5(inputs)
	if (locale === "ko") return ko_docsclisummaryelixirelixirdeploy5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryelixirelixirdeploy5(inputs)
	if (locale === "de") return de_docsclisummaryelixirelixirdeploy5(inputs)
	if (locale === "fr") return fr_docsclisummaryelixirelixirdeploy5(inputs)
	if (locale === "uk") return uk_docsclisummaryelixirelixirdeploy5(inputs)
	return en_docsclisummaryelixirelixirdeploy5(inputs)
});
export { docsclisummaryelixirelixirdeploy5 as "docsCliSummaryElixirElixirDeploy" }