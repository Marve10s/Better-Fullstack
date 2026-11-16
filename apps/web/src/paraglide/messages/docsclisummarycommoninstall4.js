/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarycommoninstall4Inputs */



/**
* | output |
* | --- |
* | "Install dependencies after scaffolding." |
*
* @param {Docsclisummarycommoninstall4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarycommoninstall4 = /** @type {((inputs?: Docsclisummarycommoninstall4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarycommoninstall4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Instalar las dependencias tras generar la estructura del proyecto.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("生成项目后安装依赖。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("スキャフォールド後に依存関係をインストールします。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("스캐폴딩 후 의존성을 설치합니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("產生專案後安裝相依套件。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Abhängigkeiten nach der Erstellung des Projektgerüsts installieren.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Installer les dépendances après la génération du projet.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Встановити залежності після створення каркаса проєкту.")
	return /** @type {LocalizedString} */ ("Install dependencies after scaffolding.")
});
export { docsclisummarycommoninstall4 as "docsCliSummaryCommonInstall" }