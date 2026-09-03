/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofgridheading2Inputs */

const en_fixproofgridheading2 = /** @type {(inputs: Fixproofgridheading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Task grid`)
};

const es_fixproofgridheading2 = /** @type {(inputs: Fixproofgridheading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cuadrícula de tareas`)
};

const zh_fixproofgridheading2 = /** @type {(inputs: Fixproofgridheading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`任务网格`)
};

const ja_fixproofgridheading2 = /** @type {(inputs: Fixproofgridheading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`タスクグリッド`)
};

const ko_fixproofgridheading2 = /** @type {(inputs: Fixproofgridheading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`태스크 그리드`)
};

const zh_hant1_fixproofgridheading2 = /** @type {(inputs: Fixproofgridheading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`任務網格`)
};

const de_fixproofgridheading2 = /** @type {(inputs: Fixproofgridheading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Aufgabenraster`)
};

const fr_fixproofgridheading2 = /** @type {(inputs: Fixproofgridheading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Grille des tâches`)
};

const uk_fixproofgridheading2 = /** @type {(inputs: Fixproofgridheading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Сітка задач`)
};

/**
* | output |
* | --- |
* | "Task grid" |
*
* @param {Fixproofgridheading2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofgridheading2 = /** @type {((inputs?: Fixproofgridheading2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofgridheading2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofgridheading2(inputs)
	if (locale === "zh") return zh_fixproofgridheading2(inputs)
	if (locale === "ja") return ja_fixproofgridheading2(inputs)
	if (locale === "ko") return ko_fixproofgridheading2(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofgridheading2(inputs)
	if (locale === "de") return de_fixproofgridheading2(inputs)
	if (locale === "fr") return fr_fixproofgridheading2(inputs)
	if (locale === "uk") return uk_fixproofgridheading2(inputs)
	return en_fixproofgridheading2(inputs)
});
export { fixproofgridheading2 as "fixproofGridHeading" }