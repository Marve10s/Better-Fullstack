/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarycommongit4Inputs */

const en_docsclisummarycommongit4 = /** @type {(inputs: Docsclisummarycommongit4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Initialize a Git repository.`)
};

const es_docsclisummarycommongit4 = /** @type {(inputs: Docsclisummarycommongit4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Inicializar un repositorio Git.`)
};

const zh_docsclisummarycommongit4 = /** @type {(inputs: Docsclisummarycommongit4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`初始化 Git 仓库。`)
};

const ja_docsclisummarycommongit4 = /** @type {(inputs: Docsclisummarycommongit4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Git リポジトリを初期化します。`)
};

const ko_docsclisummarycommongit4 = /** @type {(inputs: Docsclisummarycommongit4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Git 저장소를 초기화합니다.`)
};

const zh_hant1_docsclisummarycommongit4 = /** @type {(inputs: Docsclisummarycommongit4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`初始化 Git 儲存庫。`)
};

const de_docsclisummarycommongit4 = /** @type {(inputs: Docsclisummarycommongit4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ein Git-Repository initialisieren.`)
};

const fr_docsclisummarycommongit4 = /** @type {(inputs: Docsclisummarycommongit4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Initialiser un dépôt Git.`)
};

const uk_docsclisummarycommongit4 = /** @type {(inputs: Docsclisummarycommongit4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ініціалізувати репозиторій Git.`)
};

/**
* | output |
* | --- |
* | "Initialize a Git repository." |
*
* @param {Docsclisummarycommongit4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarycommongit4 = /** @type {((inputs?: Docsclisummarycommongit4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarycommongit4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarycommongit4(inputs)
	if (locale === "zh") return zh_docsclisummarycommongit4(inputs)
	if (locale === "ja") return ja_docsclisummarycommongit4(inputs)
	if (locale === "ko") return ko_docsclisummarycommongit4(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarycommongit4(inputs)
	if (locale === "de") return de_docsclisummarycommongit4(inputs)
	if (locale === "fr") return fr_docsclisummarycommongit4(inputs)
	if (locale === "uk") return uk_docsclisummarycommongit4(inputs)
	return en_docsclisummarycommongit4(inputs)
});
export { docsclisummarycommongit4 as "docsCliSummaryCommonGit" }