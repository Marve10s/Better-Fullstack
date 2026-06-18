/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Comparedatabasecount2Inputs */

const en_comparedatabasecount2 = /** @type {(inputs: Comparedatabasecount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} databases`)
};

const es_comparedatabasecount2 = /** @type {(inputs: Comparedatabasecount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} bases de datos`)
};

const zh_comparedatabasecount2 = /** @type {(inputs: Comparedatabasecount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 个数据库`)
};

const ja_comparedatabasecount2 = /** @type {(inputs: Comparedatabasecount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} データベース`)
};

const ko_comparedatabasecount2 = /** @type {(inputs: Comparedatabasecount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 데이터베이스`)
};

const zh_hant1_comparedatabasecount2 = /** @type {(inputs: Comparedatabasecount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 個資料庫`)
};

const de_comparedatabasecount2 = /** @type {(inputs: Comparedatabasecount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} Datenbanken`)
};

const fr_comparedatabasecount2 = /** @type {(inputs: Comparedatabasecount2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Bases de données ${i?.count}`)
};

/**
* | output |
* | --- |
* | "{count} databases" |
*
* @param {Comparedatabasecount2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const comparedatabasecount2 = /** @type {((inputs: Comparedatabasecount2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comparedatabasecount2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_comparedatabasecount2(inputs)
	if (locale === "es") return es_comparedatabasecount2(inputs)
	if (locale === "zh") return zh_comparedatabasecount2(inputs)
	if (locale === "ja") return ja_comparedatabasecount2(inputs)
	if (locale === "ko") return ko_comparedatabasecount2(inputs)
	if (locale === "zh-Hant") return zh_hant1_comparedatabasecount2(inputs)
	if (locale === "de") return de_comparedatabasecount2(inputs)
	return fr_comparedatabasecount2(inputs)
});
export { comparedatabasecount2 as "compareDatabaseCount" }