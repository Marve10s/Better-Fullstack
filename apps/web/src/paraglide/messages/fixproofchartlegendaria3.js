/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofchartlegendaria3Inputs */

const en_fixproofchartlegendaria3 = /** @type {(inputs: Fixproofchartlegendaria3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Vendors`)
};

const es_fixproofchartlegendaria3 = /** @type {(inputs: Fixproofchartlegendaria3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Proveedores`)
};

const zh_fixproofchartlegendaria3 = /** @type {(inputs: Fixproofchartlegendaria3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`厂商`)
};

const ja_fixproofchartlegendaria3 = /** @type {(inputs: Fixproofchartlegendaria3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ベンダー`)
};

const ko_fixproofchartlegendaria3 = /** @type {(inputs: Fixproofchartlegendaria3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`벤더`)
};

const zh_hant1_fixproofchartlegendaria3 = /** @type {(inputs: Fixproofchartlegendaria3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`廠商`)
};

const de_fixproofchartlegendaria3 = /** @type {(inputs: Fixproofchartlegendaria3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Anbieter`)
};

const fr_fixproofchartlegendaria3 = /** @type {(inputs: Fixproofchartlegendaria3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fournisseurs`)
};

const uk_fixproofchartlegendaria3 = /** @type {(inputs: Fixproofchartlegendaria3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Постачальники`)
};

/**
* | output |
* | --- |
* | "Vendors" |
*
* @param {Fixproofchartlegendaria3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofchartlegendaria3 = /** @type {((inputs?: Fixproofchartlegendaria3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofchartlegendaria3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofchartlegendaria3(inputs)
	if (locale === "zh") return zh_fixproofchartlegendaria3(inputs)
	if (locale === "ja") return ja_fixproofchartlegendaria3(inputs)
	if (locale === "ko") return ko_fixproofchartlegendaria3(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofchartlegendaria3(inputs)
	if (locale === "de") return de_fixproofchartlegendaria3(inputs)
	if (locale === "fr") return fr_fixproofchartlegendaria3(inputs)
	if (locale === "uk") return uk_fixproofchartlegendaria3(inputs)
	return en_fixproofchartlegendaria3(inputs)
});
export { fixproofchartlegendaria3 as "fixproofChartLegendAria" }