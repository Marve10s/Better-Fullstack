/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarycommonworkspaceshape5Inputs */

const en_docsclisummarycommonworkspaceshape5 = /** @type {(inputs: Docsclisummarycommonworkspaceshape5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Monorepo or single-app workspace layout.`)
};

const es_docsclisummarycommonworkspaceshape5 = /** @type {(inputs: Docsclisummarycommonworkspaceshape5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Estructura del espacio de trabajo: monorepo o una sola aplicación.`)
};

const zh_docsclisummarycommonworkspaceshape5 = /** @type {(inputs: Docsclisummarycommonworkspaceshape5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Monorepo 或单应用的工作区布局。`)
};

const ja_docsclisummarycommonworkspaceshape5 = /** @type {(inputs: Docsclisummarycommonworkspaceshape5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`モノレポか単一アプリかのワークスペース構成。`)
};

const ko_docsclisummarycommonworkspaceshape5 = /** @type {(inputs: Docsclisummarycommonworkspaceshape5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`모노레포 또는 단일 앱 워크스페이스 구조.`)
};

const zh_hant1_docsclisummarycommonworkspaceshape5 = /** @type {(inputs: Docsclisummarycommonworkspaceshape5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Monorepo 或單一應用程式的工作區配置。`)
};

const de_docsclisummarycommonworkspaceshape5 = /** @type {(inputs: Docsclisummarycommonworkspaceshape5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Arbeitsbereich als Monorepo oder mit einer einzelnen App.`)
};

const fr_docsclisummarycommonworkspaceshape5 = /** @type {(inputs: Docsclisummarycommonworkspaceshape5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Organisation de l’espace de travail en monorepo ou en application unique.`)
};

const uk_docsclisummarycommonworkspaceshape5 = /** @type {(inputs: Docsclisummarycommonworkspaceshape5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Структура робочого простору: монорепо або один застосунок.`)
};

/**
* | output |
* | --- |
* | "Monorepo or single-app workspace layout." |
*
* @param {Docsclisummarycommonworkspaceshape5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarycommonworkspaceshape5 = /** @type {((inputs?: Docsclisummarycommonworkspaceshape5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarycommonworkspaceshape5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarycommonworkspaceshape5(inputs)
	if (locale === "zh") return zh_docsclisummarycommonworkspaceshape5(inputs)
	if (locale === "ja") return ja_docsclisummarycommonworkspaceshape5(inputs)
	if (locale === "ko") return ko_docsclisummarycommonworkspaceshape5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarycommonworkspaceshape5(inputs)
	if (locale === "de") return de_docsclisummarycommonworkspaceshape5(inputs)
	if (locale === "fr") return fr_docsclisummarycommonworkspaceshape5(inputs)
	if (locale === "uk") return uk_docsclisummarycommonworkspaceshape5(inputs)
	return en_docsclisummarycommonworkspaceshape5(inputs)
});
export { docsclisummarycommonworkspaceshape5 as "docsCliSummaryCommonWorkspaceShape" }