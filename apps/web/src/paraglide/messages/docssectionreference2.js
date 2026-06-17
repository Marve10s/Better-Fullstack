/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docssectionreference2Inputs */

const en_docssectionreference2 = /** @type {(inputs: Docssectionreference2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Reference`)
};

const es_docssectionreference2 = /** @type {(inputs: Docssectionreference2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Referencia`)
};

const zh_docssectionreference2 = /** @type {(inputs: Docssectionreference2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`参考`)
};

const ja_docssectionreference2 = /** @type {(inputs: Docssectionreference2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`参照`)
};

const ko_docssectionreference2 = /** @type {(inputs: Docssectionreference2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`참조`)
};

const zh_hant1_docssectionreference2 = /** @type {(inputs: Docssectionreference2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`參考`)
};

const de_docssectionreference2 = /** @type {(inputs: Docssectionreference2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Referenz`)
};

const fr_docssectionreference2 = /** @type {(inputs: Docssectionreference2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Référence`)
};

/**
* | output |
* | --- |
* | "Reference" |
*
* @param {Docssectionreference2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const docssectionreference2 = /** @type {((inputs?: Docssectionreference2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docssectionreference2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_docssectionreference2(inputs)
	if (locale === "es") return es_docssectionreference2(inputs)
	if (locale === "zh") return zh_docssectionreference2(inputs)
	if (locale === "ja") return ja_docssectionreference2(inputs)
	if (locale === "ko") return ko_docssectionreference2(inputs)
	if (locale === "zh-Hant") return zh_hant1_docssectionreference2(inputs)
	if (locale === "de") return de_docssectionreference2(inputs)
	return fr_docssectionreference2(inputs)
});
export { docssectionreference2 as "docsSectionReference" }