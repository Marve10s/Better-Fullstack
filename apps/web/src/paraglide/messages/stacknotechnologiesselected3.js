/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Stacknotechnologiesselected3Inputs */

const en_stacknotechnologiesselected3 = /** @type {(inputs: Stacknotechnologiesselected3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No technologies selected`)
};

const es_stacknotechnologiesselected3 = /** @type {(inputs: Stacknotechnologiesselected3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No hay tecnologías seleccionadas`)
};

const zh_stacknotechnologiesselected3 = /** @type {(inputs: Stacknotechnologiesselected3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未选择技术`)
};

const ja_stacknotechnologiesselected3 = /** @type {(inputs: Stacknotechnologiesselected3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`テクノロジーが選択されていません`)
};

const ko_stacknotechnologiesselected3 = /** @type {(inputs: Stacknotechnologiesselected3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`선택한 기술이 없습니다.`)
};

const zh_hant1_stacknotechnologiesselected3 = /** @type {(inputs: Stacknotechnologiesselected3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`未選擇技術`)
};

const de_stacknotechnologiesselected3 = /** @type {(inputs: Stacknotechnologiesselected3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Keine Technologien ausgewählt`)
};

const fr_stacknotechnologiesselected3 = /** @type {(inputs: Stacknotechnologiesselected3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Aucune technologie sélectionnée`)
};

/**
* | output |
* | --- |
* | "No technologies selected" |
*
* @param {Stacknotechnologiesselected3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const stacknotechnologiesselected3 = /** @type {((inputs?: Stacknotechnologiesselected3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Stacknotechnologiesselected3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_stacknotechnologiesselected3(inputs)
	if (locale === "es") return es_stacknotechnologiesselected3(inputs)
	if (locale === "zh") return zh_stacknotechnologiesselected3(inputs)
	if (locale === "ja") return ja_stacknotechnologiesselected3(inputs)
	if (locale === "ko") return ko_stacknotechnologiesselected3(inputs)
	if (locale === "zh-Hant") return zh_hant1_stacknotechnologiesselected3(inputs)
	if (locale === "de") return de_stacknotechnologiesselected3(inputs)
	return fr_stacknotechnologiesselected3(inputs)
});
export { stacknotechnologiesselected3 as "stackNoTechnologiesSelected" }