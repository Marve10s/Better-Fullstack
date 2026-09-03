/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ model: NonNullable<unknown>, metric: NonNullable<unknown>, value: NonNullable<unknown>, minutes: NonNullable<unknown> }} Fixproofchartpointaria3Inputs */

const en_fixproofchartpointaria3 = /** @type {(inputs: Fixproofchartpointaria3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.model}, ${i?.metric} ${i?.value}, ${i?.minutes} median minutes`)
};

const es_fixproofchartpointaria3 = /** @type {(inputs: Fixproofchartpointaria3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.model}, ${i?.metric} ${i?.value}, ${i?.minutes} minutos de mediana`)
};

const zh_fixproofchartpointaria3 = /** @type {(inputs: Fixproofchartpointaria3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.model}，${i?.metric} ${i?.value}，中位数 ${i?.minutes} 分钟`)
};

const ja_fixproofchartpointaria3 = /** @type {(inputs: Fixproofchartpointaria3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.model}、${i?.metric} ${i?.value}、中央値 ${i?.minutes} 分`)
};

const ko_fixproofchartpointaria3 = /** @type {(inputs: Fixproofchartpointaria3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.model}, ${i?.metric} ${i?.value}, 중앙값 ${i?.minutes}분`)
};

const zh_hant1_fixproofchartpointaria3 = /** @type {(inputs: Fixproofchartpointaria3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.model}，${i?.metric} ${i?.value}，中位數 ${i?.minutes} 分鐘`)
};

const de_fixproofchartpointaria3 = /** @type {(inputs: Fixproofchartpointaria3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.model}, ${i?.metric} ${i?.value}, ${i?.minutes} Median-Minuten`)
};

const fr_fixproofchartpointaria3 = /** @type {(inputs: Fixproofchartpointaria3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.model}, ${i?.metric} ${i?.value}, ${i?.minutes} minutes médianes`)
};

const uk_fixproofchartpointaria3 = /** @type {(inputs: Fixproofchartpointaria3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.model}, ${i?.metric} ${i?.value}, медіана ${i?.minutes} хвилин`)
};

/**
* | output |
* | --- |
* | "{model}, {metric} {value}, {minutes} median minutes" |
*
* @param {Fixproofchartpointaria3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofchartpointaria3 = /** @type {((inputs: Fixproofchartpointaria3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofchartpointaria3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofchartpointaria3(inputs)
	if (locale === "zh") return zh_fixproofchartpointaria3(inputs)
	if (locale === "ja") return ja_fixproofchartpointaria3(inputs)
	if (locale === "ko") return ko_fixproofchartpointaria3(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofchartpointaria3(inputs)
	if (locale === "de") return de_fixproofchartpointaria3(inputs)
	if (locale === "fr") return fr_fixproofchartpointaria3(inputs)
	if (locale === "uk") return uk_fixproofchartpointaria3(inputs)
	return en_fixproofchartpointaria3(inputs)
});
export { fixproofchartpointaria3 as "fixproofChartPointAria" }