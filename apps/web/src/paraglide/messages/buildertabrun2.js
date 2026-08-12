/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildertabrun2Inputs */

const en_buildertabrun2 = /** @type {(inputs: Buildertabrun2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Edit & Run`)
};

const es_buildertabrun2 = /** @type {(inputs: Buildertabrun2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Editar y ejecutar`)
};

const zh_buildertabrun2 = /** @type {(inputs: Buildertabrun2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`编辑并运行`)
};

const ja_buildertabrun2 = /** @type {(inputs: Buildertabrun2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`編集して実行`)
};

const ko_buildertabrun2 = /** @type {(inputs: Buildertabrun2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`편집 및 실행`)
};

const zh_hant1_buildertabrun2 = /** @type {(inputs: Buildertabrun2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`編輯並執行`)
};

const de_buildertabrun2 = /** @type {(inputs: Buildertabrun2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bearbeiten & ausführen`)
};

const fr_buildertabrun2 = /** @type {(inputs: Buildertabrun2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Modifier et exécuter`)
};

const uk_buildertabrun2 = /** @type {(inputs: Buildertabrun2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Редагувати й запустити`)
};

/**
* | output |
* | --- |
* | "Edit & Run" |
*
* @param {Buildertabrun2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildertabrun2 = /** @type {((inputs?: Buildertabrun2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildertabrun2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_buildertabrun2(inputs)
	if (locale === "zh") return zh_buildertabrun2(inputs)
	if (locale === "ja") return ja_buildertabrun2(inputs)
	if (locale === "ko") return ko_buildertabrun2(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildertabrun2(inputs)
	if (locale === "de") return de_buildertabrun2(inputs)
	if (locale === "fr") return fr_buildertabrun2(inputs)
	if (locale === "uk") return uk_buildertabrun2(inputs)
	return en_buildertabrun2(inputs)
});
export { buildertabrun2 as "builderTabRun" }