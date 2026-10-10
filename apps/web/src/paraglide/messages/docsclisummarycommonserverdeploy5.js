/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarycommonserverdeploy5Inputs */

const en_docsclisummarycommonserverdeploy5 = /** @type {(inputs: Docsclisummarycommonserverdeploy5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Deployment target config for the server.`)
};

const es_docsclisummarycommonserverdeploy5 = /** @type {(inputs: Docsclisummarycommonserverdeploy5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Configuración del destino de despliegue del servidor.`)
};

const zh_docsclisummarycommonserverdeploy5 = /** @type {(inputs: Docsclisummarycommonserverdeploy5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`服务器的部署目标配置。`)
};

const ja_docsclisummarycommonserverdeploy5 = /** @type {(inputs: Docsclisummarycommonserverdeploy5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`サーバーのデプロイ先の設定。`)
};

const ko_docsclisummarycommonserverdeploy5 = /** @type {(inputs: Docsclisummarycommonserverdeploy5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`서버의 배포 대상 구성.`)
};

const zh_hant1_docsclisummarycommonserverdeploy5 = /** @type {(inputs: Docsclisummarycommonserverdeploy5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`伺服器的部署目標設定。`)
};

const de_docsclisummarycommonserverdeploy5 = /** @type {(inputs: Docsclisummarycommonserverdeploy5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Konfiguration des Deployment-Ziels für den Server.`)
};

const fr_docsclisummarycommonserverdeploy5 = /** @type {(inputs: Docsclisummarycommonserverdeploy5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Configuration de la cible de déploiement du serveur.`)
};

const uk_docsclisummarycommonserverdeploy5 = /** @type {(inputs: Docsclisummarycommonserverdeploy5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Конфігурація цільового середовища розгортання сервера.`)
};

/**
* | output |
* | --- |
* | "Deployment target config for the server." |
*
* @param {Docsclisummarycommonserverdeploy5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarycommonserverdeploy5 = /** @type {((inputs?: Docsclisummarycommonserverdeploy5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarycommonserverdeploy5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarycommonserverdeploy5(inputs)
	if (locale === "zh") return zh_docsclisummarycommonserverdeploy5(inputs)
	if (locale === "ja") return ja_docsclisummarycommonserverdeploy5(inputs)
	if (locale === "ko") return ko_docsclisummarycommonserverdeploy5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarycommonserverdeploy5(inputs)
	if (locale === "de") return de_docsclisummarycommonserverdeploy5(inputs)
	if (locale === "fr") return fr_docsclisummarycommonserverdeploy5(inputs)
	if (locale === "uk") return uk_docsclisummarycommonserverdeploy5(inputs)
	return en_docsclisummarycommonserverdeploy5(inputs)
});
export { docsclisummarycommonserverdeploy5 as "docsCliSummaryCommonServerDeploy" }