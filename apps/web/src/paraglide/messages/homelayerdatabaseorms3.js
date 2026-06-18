/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homelayerdatabaseorms3Inputs */

const en_homelayerdatabaseorms3 = /** @type {(inputs: Homelayerdatabaseorms3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`DATABASE ORMs`)
};

const es_homelayerdatabaseorms3 = /** @type {(inputs: Homelayerdatabaseorms3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ORMs DE BASE DE DATOS`)
};

const zh_homelayerdatabaseorms3 = /** @type {(inputs: Homelayerdatabaseorms3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`数据库 ORM`)
};

const ja_homelayerdatabaseorms3 = /** @type {(inputs: Homelayerdatabaseorms3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`データベース ORM`)
};

const ko_homelayerdatabaseorms3 = /** @type {(inputs: Homelayerdatabaseorms3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`데이터베이스 ORM`)
};

const zh_hant1_homelayerdatabaseorms3 = /** @type {(inputs: Homelayerdatabaseorms3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`資料庫 ORM`)
};

const de_homelayerdatabaseorms3 = /** @type {(inputs: Homelayerdatabaseorms3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`DATENBANK-ORMs`)
};

const fr_homelayerdatabaseorms3 = /** @type {(inputs: Homelayerdatabaseorms3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ORM DE BASE DE DONNÉES`)
};

/**
* | output |
* | --- |
* | "DATABASE ORMs" |
*
* @param {Homelayerdatabaseorms3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const homelayerdatabaseorms3 = /** @type {((inputs?: Homelayerdatabaseorms3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homelayerdatabaseorms3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homelayerdatabaseorms3(inputs)
	if (locale === "es") return es_homelayerdatabaseorms3(inputs)
	if (locale === "zh") return zh_homelayerdatabaseorms3(inputs)
	if (locale === "ja") return ja_homelayerdatabaseorms3(inputs)
	if (locale === "ko") return ko_homelayerdatabaseorms3(inputs)
	if (locale === "zh-Hant") return zh_hant1_homelayerdatabaseorms3(inputs)
	if (locale === "de") return de_homelayerdatabaseorms3(inputs)
	return fr_homelayerdatabaseorms3(inputs)
});
export { homelayerdatabaseorms3 as "homeLayerDatabaseOrms" }