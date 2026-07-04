/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ ecosystem: NonNullable<unknown> }} Builderfrontendgroup2Inputs */

const en_builderfrontendgroup2 = /** @type {(inputs: Builderfrontendgroup2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystem} Frontend`)
};

const es_builderfrontendgroup2 = /** @type {(inputs: Builderfrontendgroup2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Frontend ${i?.ecosystem}`)
};

const zh_builderfrontendgroup2 = /** @type {(inputs: Builderfrontendgroup2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystem} 前端`)
};

const ja_builderfrontendgroup2 = /** @type {(inputs: Builderfrontendgroup2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystem} フロントエンド`)
};

const ko_builderfrontendgroup2 = /** @type {(inputs: Builderfrontendgroup2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystem} 프런트엔드`)
};

const zh_hant1_builderfrontendgroup2 = /** @type {(inputs: Builderfrontendgroup2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystem} 前端`)
};

const de_builderfrontendgroup2 = /** @type {(inputs: Builderfrontendgroup2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystem} Frontend`)
};

const fr_builderfrontendgroup2 = /** @type {(inputs: Builderfrontendgroup2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystem} Frontal`)
};

/**
* | output |
* | --- |
* | "{ecosystem} Frontend" |
*
* @param {Builderfrontendgroup2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const builderfrontendgroup2 = /** @type {((inputs: Builderfrontendgroup2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderfrontendgroup2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderfrontendgroup2(inputs)
	if (locale === "es") return es_builderfrontendgroup2(inputs)
	if (locale === "zh") return zh_builderfrontendgroup2(inputs)
	if (locale === "ja") return ja_builderfrontendgroup2(inputs)
	if (locale === "ko") return ko_builderfrontendgroup2(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderfrontendgroup2(inputs)
	if (locale === "de") return de_builderfrontendgroup2(inputs)
	return fr_builderfrontendgroup2(inputs)
});
export { builderfrontendgroup2 as "builderFrontendGroup" }