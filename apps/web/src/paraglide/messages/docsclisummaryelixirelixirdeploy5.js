/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryelixirelixirdeploy5Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Destino de despliegue Elixir.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Elixir 部署目标。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Elixir のデプロイ先。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Elixir 배포 대상.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Elixir 部署目標。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Deployment-Ziel für Elixir.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Cible de déploiement Elixir.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Цільове середовище розгортання Elixir.")
	return /** @type {LocalizedString} */ ("Elixir deploy target.")
});
export { docsclisummaryelixirelixirdeploy5 as "docsCliSummaryElixirElixirDeploy" }