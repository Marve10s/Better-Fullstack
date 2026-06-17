/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docssectionecosystems2Inputs */

const en_docssectionecosystems2 = /** @type {(inputs: Docssectionecosystems2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ecosystems`)
};

const es_docssectionecosystems2 = /** @type {(inputs: Docssectionecosystems2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ecosistemas`)
};

const zh_docssectionecosystems2 = /** @type {(inputs: Docssectionecosystems2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`生态系统`)
};

const ja_docssectionecosystems2 = /** @type {(inputs: Docssectionecosystems2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`生態系`)
};

const ko_docssectionecosystems2 = /** @type {(inputs: Docssectionecosystems2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`생태계`)
};

const zh_hant1_docssectionecosystems2 = /** @type {(inputs: Docssectionecosystems2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`生態系統`)
};

const de_docssectionecosystems2 = /** @type {(inputs: Docssectionecosystems2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ökosysteme`)
};

const fr_docssectionecosystems2 = /** @type {(inputs: Docssectionecosystems2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Écosystèmes`)
};

/**
* | output |
* | --- |
* | "Ecosystems" |
*
* @param {Docssectionecosystems2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const docssectionecosystems2 = /** @type {((inputs?: Docssectionecosystems2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docssectionecosystems2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_docssectionecosystems2(inputs)
	if (locale === "es") return es_docssectionecosystems2(inputs)
	if (locale === "zh") return zh_docssectionecosystems2(inputs)
	if (locale === "ja") return ja_docssectionecosystems2(inputs)
	if (locale === "ko") return ko_docssectionecosystems2(inputs)
	if (locale === "zh-Hant") return zh_hant1_docssectionecosystems2(inputs)
	if (locale === "de") return de_docssectionecosystems2(inputs)
	return fr_docssectionecosystems2(inputs)
});
export { docssectionecosystems2 as "docsSectionEcosystems" }