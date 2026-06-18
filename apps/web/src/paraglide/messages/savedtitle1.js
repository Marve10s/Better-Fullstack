/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Savedtitle1Inputs */

const en_savedtitle1 = /** @type {(inputs: Savedtitle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Saved Projects & Presets`)
};

const es_savedtitle1 = /** @type {(inputs: Savedtitle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Proyectos y plantillas guardados`)
};

const zh_savedtitle1 = /** @type {(inputs: Savedtitle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已保存项目和预设`)
};

const ja_savedtitle1 = /** @type {(inputs: Savedtitle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`保存されたプロジェクトとプリセット`)
};

const ko_savedtitle1 = /** @type {(inputs: Savedtitle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`저장된 프로젝트 및 사전 설정`)
};

const zh_hant1_savedtitle1 = /** @type {(inputs: Savedtitle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已儲存項目和預設`)
};

const de_savedtitle1 = /** @type {(inputs: Savedtitle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Gespeicherte Projekte und Voreinstellungen`)
};

const fr_savedtitle1 = /** @type {(inputs: Savedtitle1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Projets et préréglages enregistrés`)
};

/**
* | output |
* | --- |
* | "Saved Projects & Presets" |
*
* @param {Savedtitle1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const savedtitle1 = /** @type {((inputs?: Savedtitle1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Savedtitle1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_savedtitle1(inputs)
	if (locale === "es") return es_savedtitle1(inputs)
	if (locale === "zh") return zh_savedtitle1(inputs)
	if (locale === "ja") return ja_savedtitle1(inputs)
	if (locale === "ko") return ko_savedtitle1(inputs)
	if (locale === "zh-Hant") return zh_hant1_savedtitle1(inputs)
	if (locale === "de") return de_savedtitle1(inputs)
	return fr_savedtitle1(inputs)
});
export { savedtitle1 as "savedTitle" }