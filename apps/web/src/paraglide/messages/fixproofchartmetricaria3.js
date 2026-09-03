/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofchartmetricaria3Inputs */

const en_fixproofchartmetricaria3 = /** @type {(inputs: Fixproofchartmetricaria3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Chart metric`)
};

const es_fixproofchartmetricaria3 = /** @type {(inputs: Fixproofchartmetricaria3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Métrica del gráfico`)
};

const zh_fixproofchartmetricaria3 = /** @type {(inputs: Fixproofchartmetricaria3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`图表指标`)
};

const ja_fixproofchartmetricaria3 = /** @type {(inputs: Fixproofchartmetricaria3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`グラフの指標`)
};

const ko_fixproofchartmetricaria3 = /** @type {(inputs: Fixproofchartmetricaria3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`차트 지표`)
};

const zh_hant1_fixproofchartmetricaria3 = /** @type {(inputs: Fixproofchartmetricaria3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`圖表指標`)
};

const de_fixproofchartmetricaria3 = /** @type {(inputs: Fixproofchartmetricaria3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Metrik des Diagramms`)
};

const fr_fixproofchartmetricaria3 = /** @type {(inputs: Fixproofchartmetricaria3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Métrique du graphique`)
};

const uk_fixproofchartmetricaria3 = /** @type {(inputs: Fixproofchartmetricaria3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Метрика діаграми`)
};

/**
* | output |
* | --- |
* | "Chart metric" |
*
* @param {Fixproofchartmetricaria3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofchartmetricaria3 = /** @type {((inputs?: Fixproofchartmetricaria3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofchartmetricaria3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofchartmetricaria3(inputs)
	if (locale === "zh") return zh_fixproofchartmetricaria3(inputs)
	if (locale === "ja") return ja_fixproofchartmetricaria3(inputs)
	if (locale === "ko") return ko_fixproofchartmetricaria3(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofchartmetricaria3(inputs)
	if (locale === "de") return de_fixproofchartmetricaria3(inputs)
	if (locale === "fr") return fr_fixproofchartmetricaria3(inputs)
	if (locale === "uk") return uk_fixproofchartmetricaria3(inputs)
	return en_fixproofchartmetricaria3(inputs)
});
export { fixproofchartmetricaria3 as "fixproofChartMetricAria" }