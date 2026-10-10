/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarycommoninstall4Inputs */

const en_docsclisummarycommoninstall4 = /** @type {(inputs: Docsclisummarycommoninstall4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Install dependencies after scaffolding.`)
};

const es_docsclisummarycommoninstall4 = /** @type {(inputs: Docsclisummarycommoninstall4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Instalar las dependencias tras generar la estructura del proyecto.`)
};

const zh_docsclisummarycommoninstall4 = /** @type {(inputs: Docsclisummarycommoninstall4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`生成项目后安装依赖。`)
};

const ja_docsclisummarycommoninstall4 = /** @type {(inputs: Docsclisummarycommoninstall4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`スキャフォールド後に依存関係をインストールします。`)
};

const ko_docsclisummarycommoninstall4 = /** @type {(inputs: Docsclisummarycommoninstall4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`스캐폴딩 후 의존성을 설치합니다.`)
};

const zh_hant1_docsclisummarycommoninstall4 = /** @type {(inputs: Docsclisummarycommoninstall4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`產生專案後安裝相依套件。`)
};

const de_docsclisummarycommoninstall4 = /** @type {(inputs: Docsclisummarycommoninstall4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Abhängigkeiten nach der Erstellung des Projektgerüsts installieren.`)
};

const fr_docsclisummarycommoninstall4 = /** @type {(inputs: Docsclisummarycommoninstall4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Installer les dépendances après la génération du projet.`)
};

const uk_docsclisummarycommoninstall4 = /** @type {(inputs: Docsclisummarycommoninstall4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Встановити залежності після створення каркаса проєкту.`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarycommoninstall4(inputs)
	if (locale === "zh") return zh_docsclisummarycommoninstall4(inputs)
	if (locale === "ja") return ja_docsclisummarycommoninstall4(inputs)
	if (locale === "ko") return ko_docsclisummarycommoninstall4(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarycommoninstall4(inputs)
	if (locale === "de") return de_docsclisummarycommoninstall4(inputs)
	if (locale === "fr") return fr_docsclisummarycommoninstall4(inputs)
	if (locale === "uk") return uk_docsclisummarycommoninstall4(inputs)
	return en_docsclisummarycommoninstall4(inputs)
});
export { docsclisummarycommoninstall4 as "docsCliSummaryCommonInstall" }