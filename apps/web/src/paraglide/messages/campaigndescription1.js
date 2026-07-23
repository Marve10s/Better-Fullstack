/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaigndescription1Inputs */

const en_campaigndescription1 = /** @type {(inputs: Campaigndescription1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pick a real TypeScript stack, inspect its generated files, edit the code, start the dev server and download the project. Nothing leaves your browser.`)
};

/** @type {(inputs: Campaigndescription1Inputs) => LocalizedString} */
const es_campaigndescription1 = en_campaigndescription1;

/** @type {(inputs: Campaigndescription1Inputs) => LocalizedString} */
const zh_campaigndescription1 = en_campaigndescription1;

/** @type {(inputs: Campaigndescription1Inputs) => LocalizedString} */
const ja_campaigndescription1 = en_campaigndescription1;

/** @type {(inputs: Campaigndescription1Inputs) => LocalizedString} */
const ko_campaigndescription1 = en_campaigndescription1;

/** @type {(inputs: Campaigndescription1Inputs) => LocalizedString} */
const zh_hant1_campaigndescription1 = zh_campaigndescription1;

/** @type {(inputs: Campaigndescription1Inputs) => LocalizedString} */
const de_campaigndescription1 = en_campaigndescription1;

/** @type {(inputs: Campaigndescription1Inputs) => LocalizedString} */
const fr_campaigndescription1 = en_campaigndescription1;

/** @type {(inputs: Campaigndescription1Inputs) => LocalizedString} */
const uk_campaigndescription1 = en_campaigndescription1;

/**
* | output |
* | --- |
* | "Pick a real TypeScript stack, inspect its generated files, edit the code, start the dev server and download the project. Nothing leaves your browser." |
*
* @param {Campaigndescription1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaigndescription1 = /** @type {((inputs?: Campaigndescription1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaigndescription1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_campaigndescription1(inputs)
	if (locale === "es") return es_campaigndescription1(inputs)
	if (locale === "zh") return zh_campaigndescription1(inputs)
	if (locale === "ja") return ja_campaigndescription1(inputs)
	if (locale === "ko") return ko_campaigndescription1(inputs)
	if (locale === "zh-Hant") return zh_hant1_campaigndescription1(inputs)
	if (locale === "de") return de_campaigndescription1(inputs)
	if (locale === "fr") return fr_campaigndescription1(inputs)
	return uk_campaigndescription1(inputs)
});
export { campaigndescription1 as "campaignDescription" }