/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarydotnetdotnetdeploy5Inputs */



/**
* | output |
* | --- |
* | ".NET deploy target." |
*
* @param {Docsclisummarydotnetdotnetdeploy5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarydotnetdotnetdeploy5 = /** @type {((inputs?: Docsclisummarydotnetdotnetdeploy5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarydotnetdotnetdeploy5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Destino de despliegue .NET.")
	if (locale === "zh") return /** @type {LocalizedString} */ (".NET 部署目标。")
	if (locale === "ja") return /** @type {LocalizedString} */ (".NET のデプロイ先。")
	if (locale === "ko") return /** @type {LocalizedString} */ (".NET 배포 대상.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ (".NET 部署目標。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Deployment-Ziel für .NET.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Cible de déploiement .NET.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Цільове середовище розгортання .NET.")
	return /** @type {LocalizedString} */ (".NET deploy target.")
});
export { docsclisummarydotnetdotnetdeploy5 as "docsCliSummaryDotnetDotnetDeploy" }