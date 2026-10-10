/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarycommondirectoryconflict5Inputs */

const en_docsclisummarycommondirectoryconflict5 = /** @type {(inputs: Docsclisummarycommondirectoryconflict5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Strategy when the target directory already exists.`)
};

const es_docsclisummarycommondirectoryconflict5 = /** @type {(inputs: Docsclisummarycommondirectoryconflict5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Estrategia cuando el directorio de destino ya existe.`)
};

const zh_docsclisummarycommondirectoryconflict5 = /** @type {(inputs: Docsclisummarycommondirectoryconflict5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`目标目录已存在时的处理策略。`)
};

const ja_docsclisummarycommondirectoryconflict5 = /** @type {(inputs: Docsclisummarycommondirectoryconflict5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`出力先のディレクトリがすでに存在する場合の対処方法。`)
};

const ko_docsclisummarycommondirectoryconflict5 = /** @type {(inputs: Docsclisummarycommondirectoryconflict5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`대상 디렉터리가 이미 있을 때의 처리 방식.`)
};

const zh_hant1_docsclisummarycommondirectoryconflict5 = /** @type {(inputs: Docsclisummarycommondirectoryconflict5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`目標目錄已存在時的處理方式。`)
};

const de_docsclisummarycommondirectoryconflict5 = /** @type {(inputs: Docsclisummarycommondirectoryconflict5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Vorgehen, wenn das Zielverzeichnis bereits existiert.`)
};

const fr_docsclisummarycommondirectoryconflict5 = /** @type {(inputs: Docsclisummarycommondirectoryconflict5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Stratégie lorsque le répertoire cible existe déjà.`)
};

const uk_docsclisummarycommondirectoryconflict5 = /** @type {(inputs: Docsclisummarycommondirectoryconflict5Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Стратегія дій, якщо цільовий каталог уже існує.`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarycommondirectoryconflict5(inputs)
	if (locale === "zh") return zh_docsclisummarycommondirectoryconflict5(inputs)
	if (locale === "ja") return ja_docsclisummarycommondirectoryconflict5(inputs)
	if (locale === "ko") return ko_docsclisummarycommondirectoryconflict5(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarycommondirectoryconflict5(inputs)
	if (locale === "de") return de_docsclisummarycommondirectoryconflict5(inputs)
	if (locale === "fr") return fr_docsclisummarycommondirectoryconflict5(inputs)
	if (locale === "uk") return uk_docsclisummarycommondirectoryconflict5(inputs)
	return en_docsclisummarycommondirectoryconflict5(inputs)
});
export { docsclisummarycommondirectoryconflict5 as "docsCliSummaryCommonDirectoryConflict" }