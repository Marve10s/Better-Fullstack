/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Comparelibrarycount2Inputs */

const en_comparelibrarycount2 = /** @type {(inputs: Comparelibrarycount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} libraries`)
};

const es_comparelibrarycount2 = /** @type {(inputs: Comparelibrarycount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} librerías`)
};

const zh_comparelibrarycount2 = /** @type {(inputs: Comparelibrarycount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 个库`)
};

const ja_comparelibrarycount2 = /** @type {(inputs: Comparelibrarycount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} ライブラリ`)
};

const ko_comparelibrarycount2 = /** @type {(inputs: Comparelibrarycount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 라이브러리`)
};

const zh_hant1_comparelibrarycount2 = /** @type {(inputs: Comparelibrarycount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 個庫`)
};

const de_comparelibrarycount2 = /** @type {(inputs: Comparelibrarycount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} Bibliotheken`)
};

const fr_comparelibrarycount2 = /** @type {(inputs: Comparelibrarycount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Bibliothèques ${i?.count}`)
};

/**
* | output |
* | --- |
* | "{count} libraries" |
*
* @param {Comparelibrarycount2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const comparelibrarycount2 = /** @type {((inputs: Comparelibrarycount2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comparelibrarycount2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_comparelibrarycount2(inputs)
	if (locale === "es") return es_comparelibrarycount2(inputs)
	if (locale === "zh") return zh_comparelibrarycount2(inputs)
	if (locale === "ja") return ja_comparelibrarycount2(inputs)
	if (locale === "ko") return ko_comparelibrarycount2(inputs)
	if (locale === "zh-Hant") return zh_hant1_comparelibrarycount2(inputs)
	if (locale === "de") return de_comparelibrarycount2(inputs)
	return fr_comparelibrarycount2(inputs)
});
export { comparelibrarycount2 as "compareLibraryCount" }