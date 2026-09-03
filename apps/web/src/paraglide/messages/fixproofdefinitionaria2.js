/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ column: NonNullable<unknown> }} Fixproofdefinitionaria2Inputs */

const en_fixproofdefinitionaria2 = /** @type {(inputs: Fixproofdefinitionaria2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`What does ${i?.column} mean?`)
};

const es_fixproofdefinitionaria2 = /** @type {(inputs: Fixproofdefinitionaria2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`¿Qué significa ${i?.column}?`)
};

const zh_fixproofdefinitionaria2 = /** @type {(inputs: Fixproofdefinitionaria2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.column} 是什么意思？`)
};

const ja_fixproofdefinitionaria2 = /** @type {(inputs: Fixproofdefinitionaria2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.column} の意味は？`)
};

const ko_fixproofdefinitionaria2 = /** @type {(inputs: Fixproofdefinitionaria2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.column}의 의미는 무엇인가요?`)
};

const zh_hant1_fixproofdefinitionaria2 = /** @type {(inputs: Fixproofdefinitionaria2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.column} 是什麼意思？`)
};

const de_fixproofdefinitionaria2 = /** @type {(inputs: Fixproofdefinitionaria2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Was bedeutet ${i?.column}?`)
};

const fr_fixproofdefinitionaria2 = /** @type {(inputs: Fixproofdefinitionaria2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Que signifie ${i?.column} ?`)
};

const uk_fixproofdefinitionaria2 = /** @type {(inputs: Fixproofdefinitionaria2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Що означає ${i?.column}?`)
};

/**
* | output |
* | --- |
* | "What does {column} mean?" |
*
* @param {Fixproofdefinitionaria2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofdefinitionaria2 = /** @type {((inputs: Fixproofdefinitionaria2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofdefinitionaria2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofdefinitionaria2(inputs)
	if (locale === "zh") return zh_fixproofdefinitionaria2(inputs)
	if (locale === "ja") return ja_fixproofdefinitionaria2(inputs)
	if (locale === "ko") return ko_fixproofdefinitionaria2(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofdefinitionaria2(inputs)
	if (locale === "de") return de_fixproofdefinitionaria2(inputs)
	if (locale === "fr") return fr_fixproofdefinitionaria2(inputs)
	if (locale === "uk") return uk_fixproofdefinitionaria2(inputs)
	return en_fixproofdefinitionaria2(inputs)
});
export { fixproofdefinitionaria2 as "fixproofDefinitionAria" }