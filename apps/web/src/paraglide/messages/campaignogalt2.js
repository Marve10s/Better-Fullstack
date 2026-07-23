/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaignogalt2Inputs */

const en_campaignogalt2 = /** @type {(inputs: Campaignogalt2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Run Before You Clone with Better Fullstack`)
};

/** @type {(inputs: Campaignogalt2Inputs) => LocalizedString} */
const es_campaignogalt2 = en_campaignogalt2;

/** @type {(inputs: Campaignogalt2Inputs) => LocalizedString} */
const zh_campaignogalt2 = en_campaignogalt2;

/** @type {(inputs: Campaignogalt2Inputs) => LocalizedString} */
const ja_campaignogalt2 = en_campaignogalt2;

/** @type {(inputs: Campaignogalt2Inputs) => LocalizedString} */
const ko_campaignogalt2 = en_campaignogalt2;

/** @type {(inputs: Campaignogalt2Inputs) => LocalizedString} */
const zh_hant1_campaignogalt2 = zh_campaignogalt2;

/** @type {(inputs: Campaignogalt2Inputs) => LocalizedString} */
const de_campaignogalt2 = en_campaignogalt2;

/** @type {(inputs: Campaignogalt2Inputs) => LocalizedString} */
const fr_campaignogalt2 = en_campaignogalt2;

/** @type {(inputs: Campaignogalt2Inputs) => LocalizedString} */
const uk_campaignogalt2 = en_campaignogalt2;

/**
* | output |
* | --- |
* | "Run Before You Clone with Better Fullstack" |
*
* @param {Campaignogalt2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaignogalt2 = /** @type {((inputs?: Campaignogalt2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaignogalt2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_campaignogalt2(inputs)
	if (locale === "es") return es_campaignogalt2(inputs)
	if (locale === "zh") return zh_campaignogalt2(inputs)
	if (locale === "ja") return ja_campaignogalt2(inputs)
	if (locale === "ko") return ko_campaignogalt2(inputs)
	if (locale === "zh-Hant") return zh_hant1_campaignogalt2(inputs)
	if (locale === "de") return de_campaignogalt2(inputs)
	if (locale === "fr") return fr_campaignogalt2(inputs)
	return uk_campaignogalt2(inputs)
});
export { campaignogalt2 as "campaignOgAlt" }