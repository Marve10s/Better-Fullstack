/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Footerbuiltby2Inputs */

const en_footerbuiltby2 = /** @type {(inputs: Footerbuiltby2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Built by`)
};

const es_footerbuiltby2 = /** @type {(inputs: Footerbuiltby2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Construido por`)
};

const zh_footerbuiltby2 = /** @type {(inputs: Footerbuiltby2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`构建者`)
};

const ja_footerbuiltby2 = /** @type {(inputs: Footerbuiltby2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`によって建てられました`)
};

const ko_footerbuiltby2 = /** @type {(inputs: Footerbuiltby2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`제작사`)
};

const zh_hant1_footerbuiltby2 = /** @type {(inputs: Footerbuiltby2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`建構者`)
};

const de_footerbuiltby2 = /** @type {(inputs: Footerbuiltby2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Gebaut von`)
};

const fr_footerbuiltby2 = /** @type {(inputs: Footerbuiltby2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Construit par`)
};

/**
* | output |
* | --- |
* | "Built by" |
*
* @param {Footerbuiltby2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const footerbuiltby2 = /** @type {((inputs?: Footerbuiltby2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Footerbuiltby2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_footerbuiltby2(inputs)
	if (locale === "es") return es_footerbuiltby2(inputs)
	if (locale === "zh") return zh_footerbuiltby2(inputs)
	if (locale === "ja") return ja_footerbuiltby2(inputs)
	if (locale === "ko") return ko_footerbuiltby2(inputs)
	if (locale === "zh-Hant") return zh_hant1_footerbuiltby2(inputs)
	if (locale === "de") return de_footerbuiltby2(inputs)
	return fr_footerbuiltby2(inputs)
});
export { footerbuiltby2 as "footerBuiltBy" }