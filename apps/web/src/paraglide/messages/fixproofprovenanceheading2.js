/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofprovenanceheading2Inputs */

const en_fixproofprovenanceheading2 = /** @type {(inputs: Fixproofprovenanceheading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`How these numbers were produced`)
};

const es_fixproofprovenanceheading2 = /** @type {(inputs: Fixproofprovenanceheading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cómo se produjeron estas cifras`)
};

const zh_fixproofprovenanceheading2 = /** @type {(inputs: Fixproofprovenanceheading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`这些数字是怎么来的`)
};

const ja_fixproofprovenanceheading2 = /** @type {(inputs: Fixproofprovenanceheading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`この数値の作り方`)
};

const ko_fixproofprovenanceheading2 = /** @type {(inputs: Fixproofprovenanceheading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`이 수치를 만든 방법`)
};

const zh_hant1_fixproofprovenanceheading2 = /** @type {(inputs: Fixproofprovenanceheading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`這些數字是怎麼來的`)
};

const de_fixproofprovenanceheading2 = /** @type {(inputs: Fixproofprovenanceheading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Wie diese Zahlen entstanden sind`)
};

const fr_fixproofprovenanceheading2 = /** @type {(inputs: Fixproofprovenanceheading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Comment ces chiffres ont été produits`)
};

const uk_fixproofprovenanceheading2 = /** @type {(inputs: Fixproofprovenanceheading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Як отримано ці числа`)
};

/**
* | output |
* | --- |
* | "How these numbers were produced" |
*
* @param {Fixproofprovenanceheading2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofprovenanceheading2 = /** @type {((inputs?: Fixproofprovenanceheading2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofprovenanceheading2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofprovenanceheading2(inputs)
	if (locale === "zh") return zh_fixproofprovenanceheading2(inputs)
	if (locale === "ja") return ja_fixproofprovenanceheading2(inputs)
	if (locale === "ko") return ko_fixproofprovenanceheading2(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofprovenanceheading2(inputs)
	if (locale === "de") return de_fixproofprovenanceheading2(inputs)
	if (locale === "fr") return fr_fixproofprovenanceheading2(inputs)
	if (locale === "uk") return uk_fixproofprovenanceheading2(inputs)
	return en_fixproofprovenanceheading2(inputs)
});
export { fixproofprovenanceheading2 as "fixproofProvenanceHeading" }