/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsnext1Inputs */

const en_docsnext1 = /** @type {(inputs: Docsnext1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Next`)
};

const es_docsnext1 = /** @type {(inputs: Docsnext1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Siguiente`)
};

const zh_docsnext1 = /** @type {(inputs: Docsnext1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`下一页`)
};

const ja_docsnext1 = /** @type {(inputs: Docsnext1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`次`)
};

const ko_docsnext1 = /** @type {(inputs: Docsnext1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`다음`)
};

const zh_hant1_docsnext1 = /** @type {(inputs: Docsnext1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`下一頁`)
};

const de_docsnext1 = /** @type {(inputs: Docsnext1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Nächste`)
};

const fr_docsnext1 = /** @type {(inputs: Docsnext1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Suivant`)
};

const uk_docsnext1 = /** @type {(inputs: Docsnext1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Далі`)
};

/**
* | output |
* | --- |
* | "Next" |
*
* @param {Docsnext1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsnext1 = /** @type {((inputs?: Docsnext1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsnext1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_docsnext1(inputs)
	if (locale === "es") return es_docsnext1(inputs)
	if (locale === "zh") return zh_docsnext1(inputs)
	if (locale === "ja") return ja_docsnext1(inputs)
	if (locale === "ko") return ko_docsnext1(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsnext1(inputs)
	if (locale === "de") return de_docsnext1(inputs)
	if (locale === "fr") return fr_docsnext1(inputs)
	return uk_docsnext1(inputs)
});
export { docsnext1 as "docsNext" }