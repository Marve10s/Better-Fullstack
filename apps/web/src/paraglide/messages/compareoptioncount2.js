/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Compareoptioncount2Inputs */

const en_compareoptioncount2 = /** @type {(inputs: Compareoptioncount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} options`)
};

const es_compareoptioncount2 = /** @type {(inputs: Compareoptioncount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} opciones`)
};

const zh_compareoptioncount2 = /** @type {(inputs: Compareoptioncount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 个选项`)
};

const ja_compareoptioncount2 = /** @type {(inputs: Compareoptioncount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} オプション`)
};

const ko_compareoptioncount2 = /** @type {(inputs: Compareoptioncount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 옵션`)
};

const zh_hant1_compareoptioncount2 = /** @type {(inputs: Compareoptioncount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 個選項`)
};

const de_compareoptioncount2 = /** @type {(inputs: Compareoptioncount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} Optionen`)
};

const fr_compareoptioncount2 = /** @type {(inputs: Compareoptioncount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Options ${i?.count}`)
};

/**
* | output |
* | --- |
* | "{count} options" |
*
* @param {Compareoptioncount2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const compareoptioncount2 = /** @type {((inputs: Compareoptioncount2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compareoptioncount2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_compareoptioncount2(inputs)
	if (locale === "es") return es_compareoptioncount2(inputs)
	if (locale === "zh") return zh_compareoptioncount2(inputs)
	if (locale === "ja") return ja_compareoptioncount2(inputs)
	if (locale === "ko") return ko_compareoptioncount2(inputs)
	if (locale === "zh-Hant") return zh_hant1_compareoptioncount2(inputs)
	if (locale === "de") return de_compareoptioncount2(inputs)
	return fr_compareoptioncount2(inputs)
});
export { compareoptioncount2 as "compareOptionCount" }