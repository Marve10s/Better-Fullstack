/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarycommondryrun5Inputs */



/**
* | output |
* | --- |
* | "Preview generated files without writing them." |
*
* @param {Docsclisummarycommondryrun5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarycommondryrun5 = /** @type {((inputs?: Docsclisummarycommondryrun5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarycommondryrun5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Previsualizar los archivos generados sin escribirlos.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("预览将生成的文件，但不写入磁盘。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ファイルを書き込まずに、生成されるファイルをプレビューします。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("파일을 쓰지 않고 생성될 파일을 미리 봅니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("預覽將產生的檔案，但不寫入磁碟。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Generierte Dateien in der Vorschau anzeigen, ohne sie zu schreiben.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Prévisualiser les fichiers générés sans les écrire.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Переглянути згенеровані файли, не записуючи їх.")
	return /** @type {LocalizedString} */ ("Preview generated files without writing them.")
});
export { docsclisummarycommondryrun5 as "docsCliSummaryCommonDryRun" }