/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationgenerated2Inputs */

const en_docsverificationgenerated2 = /** @type {(inputs: Docsverificationgenerated2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generated`)
};

const es_docsverificationgenerated2 = /** @type {(inputs: Docsverificationgenerated2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generado`)
};

const zh_docsverificationgenerated2 = /** @type {(inputs: Docsverificationgenerated2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已生成`)
};

const ja_docsverificationgenerated2 = /** @type {(inputs: Docsverificationgenerated2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`生成済み`)
};

const ko_docsverificationgenerated2 = /** @type {(inputs: Docsverificationgenerated2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`생성됨`)
};

const zh_hant1_docsverificationgenerated2 = /** @type {(inputs: Docsverificationgenerated2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已產生`)
};

const de_docsverificationgenerated2 = /** @type {(inputs: Docsverificationgenerated2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generiert`)
};

const fr_docsverificationgenerated2 = /** @type {(inputs: Docsverificationgenerated2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Généré`)
};

const uk_docsverificationgenerated2 = /** @type {(inputs: Docsverificationgenerated2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Згенеровано`)
};

/**
* | output |
* | --- |
* | "Generated" |
*
* @param {Docsverificationgenerated2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationgenerated2 = /** @type {((inputs?: Docsverificationgenerated2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationgenerated2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsverificationgenerated2(inputs)
	if (locale === "zh") return zh_docsverificationgenerated2(inputs)
	if (locale === "ja") return ja_docsverificationgenerated2(inputs)
	if (locale === "ko") return ko_docsverificationgenerated2(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsverificationgenerated2(inputs)
	if (locale === "de") return de_docsverificationgenerated2(inputs)
	if (locale === "fr") return fr_docsverificationgenerated2(inputs)
	if (locale === "uk") return uk_docsverificationgenerated2(inputs)
	return en_docsverificationgenerated2(inputs)
});
export { docsverificationgenerated2 as "docsVerificationGenerated" }