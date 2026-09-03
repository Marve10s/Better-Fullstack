/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofchartheading2Inputs */

const en_fixproofchartheading2 = /** @type {(inputs: Fixproofchartheading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Time against index`)
};

const es_fixproofchartheading2 = /** @type {(inputs: Fixproofchartheading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tiempo frente al índice`)
};

const zh_fixproofchartheading2 = /** @type {(inputs: Fixproofchartheading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`耗时与指数`)
};

const ja_fixproofchartheading2 = /** @type {(inputs: Fixproofchartheading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`所要時間と指数`)
};

const ko_fixproofchartheading2 = /** @type {(inputs: Fixproofchartheading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`시간과 지수`)
};

const zh_hant1_fixproofchartheading2 = /** @type {(inputs: Fixproofchartheading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`耗時與指數`)
};

const de_fixproofchartheading2 = /** @type {(inputs: Fixproofchartheading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Zeit gegen Index`)
};

const fr_fixproofchartheading2 = /** @type {(inputs: Fixproofchartheading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Temps et indice`)
};

const uk_fixproofchartheading2 = /** @type {(inputs: Fixproofchartheading2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Час і індекс`)
};

/**
* | output |
* | --- |
* | "Time against index" |
*
* @param {Fixproofchartheading2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofchartheading2 = /** @type {((inputs?: Fixproofchartheading2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofchartheading2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofchartheading2(inputs)
	if (locale === "zh") return zh_fixproofchartheading2(inputs)
	if (locale === "ja") return ja_fixproofchartheading2(inputs)
	if (locale === "ko") return ko_fixproofchartheading2(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofchartheading2(inputs)
	if (locale === "de") return de_fixproofchartheading2(inputs)
	if (locale === "fr") return fr_fixproofchartheading2(inputs)
	if (locale === "uk") return uk_fixproofchartheading2(inputs)
	return en_fixproofchartheading2(inputs)
});
export { fixproofchartheading2 as "fixproofChartHeading" }