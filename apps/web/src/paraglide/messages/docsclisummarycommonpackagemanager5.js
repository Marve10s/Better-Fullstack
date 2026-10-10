/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarycommonpackagemanager5Inputs */

const en_docsclisummarycommonpackagemanager5 = /** @type {(inputs: Docsclisummarycommonpackagemanager5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Package manager for the generated workspace.`)
};

const es_docsclisummarycommonpackagemanager5 = /** @type {(inputs: Docsclisummarycommonpackagemanager5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Gestor de paquetes del espacio de trabajo generado.`)
};

const zh_docsclisummarycommonpackagemanager5 = /** @type {(inputs: Docsclisummarycommonpackagemanager5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`生成的工作区所用的包管理器。`)
};

const ja_docsclisummarycommonpackagemanager5 = /** @type {(inputs: Docsclisummarycommonpackagemanager5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`生成するワークスペースのパッケージマネージャー。`)
};

const ko_docsclisummarycommonpackagemanager5 = /** @type {(inputs: Docsclisummarycommonpackagemanager5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`생성되는 워크스페이스의 패키지 매니저.`)
};

const zh_hant1_docsclisummarycommonpackagemanager5 = /** @type {(inputs: Docsclisummarycommonpackagemanager5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`產生的工作區所使用的套件管理器。`)
};

const de_docsclisummarycommonpackagemanager5 = /** @type {(inputs: Docsclisummarycommonpackagemanager5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Paketmanager für den generierten Arbeitsbereich.`)
};

const fr_docsclisummarycommonpackagemanager5 = /** @type {(inputs: Docsclisummarycommonpackagemanager5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Gestionnaire de paquets pour l’espace de travail généré.`)
};

const uk_docsclisummarycommonpackagemanager5 = /** @type {(inputs: Docsclisummarycommonpackagemanager5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Менеджер пакетів для згенерованого робочого простору.`)
};

/**
* | output |
* | --- |
* | "Package manager for the generated workspace." |
*
* @param {Docsclisummarycommonpackagemanager5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarycommonpackagemanager5 = /** @type {((inputs?: Docsclisummarycommonpackagemanager5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarycommonpackagemanager5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarycommonpackagemanager5(inputs)
	if (locale === "zh") return zh_docsclisummarycommonpackagemanager5(inputs)
	if (locale === "ja") return ja_docsclisummarycommonpackagemanager5(inputs)
	if (locale === "ko") return ko_docsclisummarycommonpackagemanager5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarycommonpackagemanager5(inputs)
	if (locale === "de") return de_docsclisummarycommonpackagemanager5(inputs)
	if (locale === "fr") return fr_docsclisummarycommonpackagemanager5(inputs)
	if (locale === "uk") return uk_docsclisummarycommonpackagemanager5(inputs)
	return en_docsclisummarycommonpackagemanager5(inputs)
});
export { docsclisummarycommonpackagemanager5 as "docsCliSummaryCommonPackageManager" }