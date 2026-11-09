/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarycommonworkspaceshape5Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Estructura del espacio de trabajo: monorepo o una sola aplicación.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Monorepo 或单应用的工作区布局。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("モノレポか単一アプリかのワークスペース構成。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("모노레포 또는 단일 앱 워크스페이스 구조.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Monorepo 或單一應用程式的工作區配置。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Arbeitsbereich als Monorepo oder mit einer einzelnen App.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Organisation de l’espace de travail en monorepo ou en application unique.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Структура робочого простору: монорепо або один застосунок.")
	return /** @type {LocalizedString} */ ("Monorepo or single-app workspace layout.")
});
export { docsclisummarycommonworkspaceshape5 as "docsCliSummaryCommonWorkspaceShape" }