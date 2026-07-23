/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaignstepruncopy3Inputs */

const en_campaignstepruncopy3 = /** @type {(inputs: Campaignstepruncopy3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Start the generated development server in an isolated browser runtime—not a simulated preview.`)
};

/** @type {(inputs: Campaignstepruncopy3Inputs) => LocalizedString} */
const es_campaignstepruncopy3 = en_campaignstepruncopy3;

/** @type {(inputs: Campaignstepruncopy3Inputs) => LocalizedString} */
const zh_campaignstepruncopy3 = en_campaignstepruncopy3;

/** @type {(inputs: Campaignstepruncopy3Inputs) => LocalizedString} */
const ja_campaignstepruncopy3 = en_campaignstepruncopy3;

/** @type {(inputs: Campaignstepruncopy3Inputs) => LocalizedString} */
const ko_campaignstepruncopy3 = en_campaignstepruncopy3;

/** @type {(inputs: Campaignstepruncopy3Inputs) => LocalizedString} */
const zh_hant1_campaignstepruncopy3 = zh_campaignstepruncopy3;

/** @type {(inputs: Campaignstepruncopy3Inputs) => LocalizedString} */
const de_campaignstepruncopy3 = en_campaignstepruncopy3;

/** @type {(inputs: Campaignstepruncopy3Inputs) => LocalizedString} */
const fr_campaignstepruncopy3 = en_campaignstepruncopy3;

/** @type {(inputs: Campaignstepruncopy3Inputs) => LocalizedString} */
const uk_campaignstepruncopy3 = en_campaignstepruncopy3;

/**
* | output |
* | --- |
* | "Start the generated development server in an isolated browser runtime—not a simulated preview." |
*
* @param {Campaignstepruncopy3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaignstepruncopy3 = /** @type {((inputs?: Campaignstepruncopy3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaignstepruncopy3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_campaignstepruncopy3(inputs)
	if (locale === "es") return es_campaignstepruncopy3(inputs)
	if (locale === "zh") return zh_campaignstepruncopy3(inputs)
	if (locale === "ja") return ja_campaignstepruncopy3(inputs)
	if (locale === "ko") return ko_campaignstepruncopy3(inputs)
	if (locale === "zh-Hant") return zh_hant1_campaignstepruncopy3(inputs)
	if (locale === "de") return de_campaignstepruncopy3(inputs)
	if (locale === "fr") return fr_campaignstepruncopy3(inputs)
	return uk_campaignstepruncopy3(inputs)
});
export { campaignstepruncopy3 as "campaignStepRunCopy" }