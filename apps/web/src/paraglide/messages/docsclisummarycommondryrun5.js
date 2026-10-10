/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarycommondryrun5Inputs */

const en_docsclisummarycommondryrun5 = /** @type {(inputs: Docsclisummarycommondryrun5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Preview generated files without writing them.`)
};

const es_docsclisummarycommondryrun5 = /** @type {(inputs: Docsclisummarycommondryrun5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Previsualizar los archivos generados sin escribirlos.`)
};

const zh_docsclisummarycommondryrun5 = /** @type {(inputs: Docsclisummarycommondryrun5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`预览将生成的文件，但不写入磁盘。`)
};

const ja_docsclisummarycommondryrun5 = /** @type {(inputs: Docsclisummarycommondryrun5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ファイルを書き込まずに、生成されるファイルをプレビューします。`)
};

const ko_docsclisummarycommondryrun5 = /** @type {(inputs: Docsclisummarycommondryrun5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`파일을 쓰지 않고 생성될 파일을 미리 봅니다.`)
};

const zh_hant1_docsclisummarycommondryrun5 = /** @type {(inputs: Docsclisummarycommondryrun5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`預覽將產生的檔案，但不寫入磁碟。`)
};

const de_docsclisummarycommondryrun5 = /** @type {(inputs: Docsclisummarycommondryrun5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generierte Dateien in der Vorschau anzeigen, ohne sie zu schreiben.`)
};

const fr_docsclisummarycommondryrun5 = /** @type {(inputs: Docsclisummarycommondryrun5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Prévisualiser les fichiers générés sans les écrire.`)
};

const uk_docsclisummarycommondryrun5 = /** @type {(inputs: Docsclisummarycommondryrun5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Переглянути згенеровані файли, не записуючи їх.`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarycommondryrun5(inputs)
	if (locale === "zh") return zh_docsclisummarycommondryrun5(inputs)
	if (locale === "ja") return ja_docsclisummarycommondryrun5(inputs)
	if (locale === "ko") return ko_docsclisummarycommondryrun5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarycommondryrun5(inputs)
	if (locale === "de") return de_docsclisummarycommondryrun5(inputs)
	if (locale === "fr") return fr_docsclisummarycommondryrun5(inputs)
	if (locale === "uk") return uk_docsclisummarycommondryrun5(inputs)
	return en_docsclisummarycommondryrun5(inputs)
});
export { docsclisummarycommondryrun5 as "docsCliSummaryCommonDryRun" }