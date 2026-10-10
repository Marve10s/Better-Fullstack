/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarydotnetdotnetdeploy5Inputs */

const en_docsclisummarydotnetdotnetdeploy5 = /** @type {(inputs: Docsclisummarydotnetdotnetdeploy5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.NET deploy target.`)
};

const es_docsclisummarydotnetdotnetdeploy5 = /** @type {(inputs: Docsclisummarydotnetdotnetdeploy5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Destino de despliegue .NET.`)
};

const zh_docsclisummarydotnetdotnetdeploy5 = /** @type {(inputs: Docsclisummarydotnetdotnetdeploy5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.NET 部署目标。`)
};

const ja_docsclisummarydotnetdotnetdeploy5 = /** @type {(inputs: Docsclisummarydotnetdotnetdeploy5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.NET のデプロイ先。`)
};

const ko_docsclisummarydotnetdotnetdeploy5 = /** @type {(inputs: Docsclisummarydotnetdotnetdeploy5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.NET 배포 대상.`)
};

const zh_hant1_docsclisummarydotnetdotnetdeploy5 = /** @type {(inputs: Docsclisummarydotnetdotnetdeploy5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`.NET 部署目標。`)
};

const de_docsclisummarydotnetdotnetdeploy5 = /** @type {(inputs: Docsclisummarydotnetdotnetdeploy5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Deployment-Ziel für .NET.`)
};

const fr_docsclisummarydotnetdotnetdeploy5 = /** @type {(inputs: Docsclisummarydotnetdotnetdeploy5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cible de déploiement .NET.`)
};

const uk_docsclisummarydotnetdotnetdeploy5 = /** @type {(inputs: Docsclisummarydotnetdotnetdeploy5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Цільове середовище розгортання .NET.`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarydotnetdotnetdeploy5(inputs)
	if (locale === "zh") return zh_docsclisummarydotnetdotnetdeploy5(inputs)
	if (locale === "ja") return ja_docsclisummarydotnetdotnetdeploy5(inputs)
	if (locale === "ko") return ko_docsclisummarydotnetdotnetdeploy5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarydotnetdotnetdeploy5(inputs)
	if (locale === "de") return de_docsclisummarydotnetdotnetdeploy5(inputs)
	if (locale === "fr") return fr_docsclisummarydotnetdotnetdeploy5(inputs)
	if (locale === "uk") return uk_docsclisummarydotnetdotnetdeploy5(inputs)
	return en_docsclisummarydotnetdotnetdeploy5(inputs)
});
export { docsclisummarydotnetdotnetdeploy5 as "docsCliSummaryDotnetDotnetDeploy" }