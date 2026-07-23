/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaigncurateddescription2Inputs */

const en_campaigncurateddescription2 = /** @type {(inputs: Campaigncurateddescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`These TypeScript presets are selected for the browser runtime. Every other ecosystem remains available through the builder and CLI.`)
};

/** @type {(inputs: Campaigncurateddescription2Inputs) => LocalizedString} */
const es_campaigncurateddescription2 = en_campaigncurateddescription2;

/** @type {(inputs: Campaigncurateddescription2Inputs) => LocalizedString} */
const zh_campaigncurateddescription2 = en_campaigncurateddescription2;

/** @type {(inputs: Campaigncurateddescription2Inputs) => LocalizedString} */
const ja_campaigncurateddescription2 = en_campaigncurateddescription2;

/** @type {(inputs: Campaigncurateddescription2Inputs) => LocalizedString} */
const ko_campaigncurateddescription2 = en_campaigncurateddescription2;

/** @type {(inputs: Campaigncurateddescription2Inputs) => LocalizedString} */
const zh_hant1_campaigncurateddescription2 = zh_campaigncurateddescription2;

/** @type {(inputs: Campaigncurateddescription2Inputs) => LocalizedString} */
const de_campaigncurateddescription2 = en_campaigncurateddescription2;

/** @type {(inputs: Campaigncurateddescription2Inputs) => LocalizedString} */
const fr_campaigncurateddescription2 = en_campaigncurateddescription2;

/** @type {(inputs: Campaigncurateddescription2Inputs) => LocalizedString} */
const uk_campaigncurateddescription2 = en_campaigncurateddescription2;

/**
* | output |
* | --- |
* | "These TypeScript presets are selected for the browser runtime. Every other ecosystem remains available through the builder and CLI." |
*
* @param {Campaigncurateddescription2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaigncurateddescription2 = /** @type {((inputs?: Campaigncurateddescription2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaigncurateddescription2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_campaigncurateddescription2(inputs)
	if (locale === "es") return es_campaigncurateddescription2(inputs)
	if (locale === "zh") return zh_campaigncurateddescription2(inputs)
	if (locale === "ja") return ja_campaigncurateddescription2(inputs)
	if (locale === "ko") return ko_campaigncurateddescription2(inputs)
	if (locale === "zh-Hant") return zh_hant1_campaigncurateddescription2(inputs)
	if (locale === "de") return de_campaigncurateddescription2(inputs)
	if (locale === "fr") return fr_campaigncurateddescription2(inputs)
	return uk_campaigncurateddescription2(inputs)
});
export { campaigncurateddescription2 as "campaignCuratedDescription" }