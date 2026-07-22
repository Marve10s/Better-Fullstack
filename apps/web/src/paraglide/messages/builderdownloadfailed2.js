/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderdownloadfailed2Inputs */

const en_builderdownloadfailed2 = /** @type {(inputs: Builderdownloadfailed2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Couldn't create the project ZIP`)
};

const es_builderdownloadfailed2 = /** @type {(inputs: Builderdownloadfailed2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No se pudo crear el ZIP del proyecto`)
};

const zh_builderdownloadfailed2 = /** @type {(inputs: Builderdownloadfailed2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`无法创建项目 ZIP`)
};

const ja_builderdownloadfailed2 = /** @type {(inputs: Builderdownloadfailed2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`プロジェクトZIPを作成できませんでした`)
};

const ko_builderdownloadfailed2 = /** @type {(inputs: Builderdownloadfailed2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`프로젝트 ZIP을 만들 수 없습니다`)
};

const zh_hant1_builderdownloadfailed2 = /** @type {(inputs: Builderdownloadfailed2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`無法建立專案 ZIP`)
};

const de_builderdownloadfailed2 = /** @type {(inputs: Builderdownloadfailed2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Projekt-ZIP konnte nicht erstellt werden`)
};

const fr_builderdownloadfailed2 = /** @type {(inputs: Builderdownloadfailed2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Impossible de créer le ZIP du projet`)
};

const uk_builderdownloadfailed2 = /** @type {(inputs: Builderdownloadfailed2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Не вдалося створити ZIP проєкту`)
};

/**
* | output |
* | --- |
* | "Couldn't create the project ZIP" |
*
* @param {Builderdownloadfailed2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderdownloadfailed2 = /** @type {((inputs?: Builderdownloadfailed2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderdownloadfailed2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderdownloadfailed2(inputs)
	if (locale === "es") return es_builderdownloadfailed2(inputs)
	if (locale === "zh") return zh_builderdownloadfailed2(inputs)
	if (locale === "ja") return ja_builderdownloadfailed2(inputs)
	if (locale === "ko") return ko_builderdownloadfailed2(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderdownloadfailed2(inputs)
	if (locale === "de") return de_builderdownloadfailed2(inputs)
	if (locale === "fr") return fr_builderdownloadfailed2(inputs)
	return uk_builderdownloadfailed2(inputs)
});
export { builderdownloadfailed2 as "builderDownloadFailed" }