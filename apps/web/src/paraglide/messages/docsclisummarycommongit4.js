/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarycommongit4Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Inicializar un repositorio Git.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("初始化 Git 仓库。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Git リポジトリを初期化します。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Git 저장소를 초기화합니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("初始化 Git 儲存庫。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Ein Git-Repository initialisieren.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Initialiser un dépôt Git.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Ініціалізувати репозиторій Git.")
	return /** @type {LocalizedString} */ ("Initialize a Git repository.")
});
export { docsclisummarycommongit4 as "docsCliSummaryCommonGit" }