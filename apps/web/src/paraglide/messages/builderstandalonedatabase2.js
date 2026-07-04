/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderstandalonedatabase2Inputs */

const en_builderstandalonedatabase2 = /** @type {(inputs: Builderstandalonedatabase2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Standalone Database`)
};

const es_builderstandalonedatabase2 = /** @type {(inputs: Builderstandalonedatabase2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Base de datos independiente`)
};

const zh_builderstandalonedatabase2 = /** @type {(inputs: Builderstandalonedatabase2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`独立数据库`)
};

const ja_builderstandalonedatabase2 = /** @type {(inputs: Builderstandalonedatabase2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`スタンドアロンデータベース`)
};

const ko_builderstandalonedatabase2 = /** @type {(inputs: Builderstandalonedatabase2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`독립형 데이터베이스`)
};

const zh_hant1_builderstandalonedatabase2 = /** @type {(inputs: Builderstandalonedatabase2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`獨立資料庫`)
};

const de_builderstandalonedatabase2 = /** @type {(inputs: Builderstandalonedatabase2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Eigenständige Datenbank`)
};

const fr_builderstandalonedatabase2 = /** @type {(inputs: Builderstandalonedatabase2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Base de données autonome`)
};

const uk_builderstandalonedatabase2 = /** @type {(inputs: Builderstandalonedatabase2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Автономна база даних`)
};

/**
* | output |
* | --- |
* | "Standalone Database" |
*
* @param {Builderstandalonedatabase2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderstandalonedatabase2 = /** @type {((inputs?: Builderstandalonedatabase2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderstandalonedatabase2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderstandalonedatabase2(inputs)
	if (locale === "es") return es_builderstandalonedatabase2(inputs)
	if (locale === "zh") return zh_builderstandalonedatabase2(inputs)
	if (locale === "ja") return ja_builderstandalonedatabase2(inputs)
	if (locale === "ko") return ko_builderstandalonedatabase2(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderstandalonedatabase2(inputs)
	if (locale === "de") return de_builderstandalonedatabase2(inputs)
	if (locale === "fr") return fr_builderstandalonedatabase2(inputs)
	return uk_builderstandalonedatabase2(inputs)
});
export { builderstandalonedatabase2 as "builderStandaloneDatabase" }