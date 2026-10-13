/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarycommonwebdeploy5Inputs */

const en_docsclisummarycommonwebdeploy5 = /** @type {(inputs: Docsclisummarycommonwebdeploy5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Deployment target config for the web app.`)
};

const es_docsclisummarycommonwebdeploy5 = /** @type {(inputs: Docsclisummarycommonwebdeploy5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Configuración del destino de despliegue de la aplicación web.`)
};

const zh_docsclisummarycommonwebdeploy5 = /** @type {(inputs: Docsclisummarycommonwebdeploy5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Web 应用的部署目标配置。`)
};

const ja_docsclisummarycommonwebdeploy5 = /** @type {(inputs: Docsclisummarycommonwebdeploy5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Web アプリのデプロイ先の設定。`)
};

const ko_docsclisummarycommonwebdeploy5 = /** @type {(inputs: Docsclisummarycommonwebdeploy5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`웹 앱의 배포 대상 구성.`)
};

const zh_hant1_docsclisummarycommonwebdeploy5 = /** @type {(inputs: Docsclisummarycommonwebdeploy5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Web 應用程式的部署目標設定。`)
};

const de_docsclisummarycommonwebdeploy5 = /** @type {(inputs: Docsclisummarycommonwebdeploy5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Konfiguration des Deployment-Ziels für die Web-App.`)
};

const fr_docsclisummarycommonwebdeploy5 = /** @type {(inputs: Docsclisummarycommonwebdeploy5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Configuration de la cible de déploiement de l’application web.`)
};

const uk_docsclisummarycommonwebdeploy5 = /** @type {(inputs: Docsclisummarycommonwebdeploy5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Конфігурація цільового середовища розгортання вебзастосунку.`)
};

/**
* | output |
* | --- |
* | "Deployment target config for the web app." |
*
* @param {Docsclisummarycommonwebdeploy5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarycommonwebdeploy5 = /** @type {((inputs?: Docsclisummarycommonwebdeploy5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarycommonwebdeploy5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarycommonwebdeploy5(inputs)
	if (locale === "zh") return zh_docsclisummarycommonwebdeploy5(inputs)
	if (locale === "ja") return ja_docsclisummarycommonwebdeploy5(inputs)
	if (locale === "ko") return ko_docsclisummarycommonwebdeploy5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarycommonwebdeploy5(inputs)
	if (locale === "de") return de_docsclisummarycommonwebdeploy5(inputs)
	if (locale === "fr") return fr_docsclisummarycommonwebdeploy5(inputs)
	if (locale === "uk") return uk_docsclisummarycommonwebdeploy5(inputs)
	return en_docsclisummarycommonwebdeploy5(inputs)
});
export { docsclisummarycommonwebdeploy5 as "docsCliSummaryCommonWebDeploy" }