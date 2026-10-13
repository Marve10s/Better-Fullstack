/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docscliflag2Inputs */

const en_docscliflag2 = /** @type {(inputs: Docscliflag2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Flag`)
};

const es_docscliflag2 = /** @type {(inputs: Docscliflag2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Flag`)
};

const zh_docscliflag2 = /** @type {(inputs: Docscliflag2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`参数`)
};

const ja_docscliflag2 = /** @type {(inputs: Docscliflag2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`フラグ`)
};

const ko_docscliflag2 = /** @type {(inputs: Docscliflag2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`플래그`)
};

const zh_hant1_docscliflag2 = /** @type {(inputs: Docscliflag2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`旗標`)
};

const de_docscliflag2 = /** @type {(inputs: Docscliflag2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Flag`)
};

const fr_docscliflag2 = /** @type {(inputs: Docscliflag2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Option`)
};

const uk_docscliflag2 = /** @type {(inputs: Docscliflag2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Прапорець`)
};

/**
* | output |
* | --- |
* | "Flag" |
*
* @param {Docscliflag2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docscliflag2 = /** @type {((inputs?: Docscliflag2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docscliflag2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docscliflag2(inputs)
	if (locale === "zh") return zh_docscliflag2(inputs)
	if (locale === "ja") return ja_docscliflag2(inputs)
	if (locale === "ko") return ko_docscliflag2(inputs)
	if (locale === "zh-Hant") return zh_hant1_docscliflag2(inputs)
	if (locale === "de") return de_docscliflag2(inputs)
	if (locale === "fr") return fr_docscliflag2(inputs)
	if (locale === "uk") return uk_docscliflag2(inputs)
	return en_docscliflag2(inputs)
});
export { docscliflag2 as "docsCliFlag" }