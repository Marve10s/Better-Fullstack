/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarycommondirectoryconflict5Inputs */



/**
* | output |
* | --- |
* | "Strategy when the target directory already exists." |
*
* @param {Docsclisummarycommondirectoryconflict5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarycommondirectoryconflict5 = /** @type {((inputs?: Docsclisummarycommondirectoryconflict5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarycommondirectoryconflict5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Estrategia cuando el directorio de destino ya existe.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("目标目录已存在时的处理策略。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("出力先のディレクトリがすでに存在する場合の対処方法。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("대상 디렉터리가 이미 있을 때의 처리 방식.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("目標目錄已存在時的處理方式。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Vorgehen, wenn das Zielverzeichnis bereits existiert.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Stratégie lorsque le répertoire cible existe déjà.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Стратегія дій, якщо цільовий каталог уже існує.")
	return /** @type {LocalizedString} */ ("Strategy when the target directory already exists.")
});
export { docsclisummarycommondirectoryconflict5 as "docsCliSummaryCommonDirectoryConflict" }