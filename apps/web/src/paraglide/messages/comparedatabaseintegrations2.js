/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Comparedatabaseintegrations2Inputs */

const en_comparedatabaseintegrations2 = /** @type {(inputs: Comparedatabaseintegrations2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Database integrations`)
};

const es_comparedatabaseintegrations2 = /** @type {(inputs: Comparedatabaseintegrations2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Integraciones de base de datos`)
};

const zh_comparedatabaseintegrations2 = /** @type {(inputs: Comparedatabaseintegrations2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`数据库集成`)
};

const ja_comparedatabaseintegrations2 = /** @type {(inputs: Comparedatabaseintegrations2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`データベースの統合`)
};

const ko_comparedatabaseintegrations2 = /** @type {(inputs: Comparedatabaseintegrations2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`데이터베이스 통합`)
};

const zh_hant1_comparedatabaseintegrations2 = /** @type {(inputs: Comparedatabaseintegrations2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`資料庫集成`)
};

const de_comparedatabaseintegrations2 = /** @type {(inputs: Comparedatabaseintegrations2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Datenbankintegrationen`)
};

const fr_comparedatabaseintegrations2 = /** @type {(inputs: Comparedatabaseintegrations2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Intégrations de bases de données`)
};

/**
* | output |
* | --- |
* | "Database integrations" |
*
* @param {Comparedatabaseintegrations2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const comparedatabaseintegrations2 = /** @type {((inputs?: Comparedatabaseintegrations2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comparedatabaseintegrations2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_comparedatabaseintegrations2(inputs)
	if (locale === "es") return es_comparedatabaseintegrations2(inputs)
	if (locale === "zh") return zh_comparedatabaseintegrations2(inputs)
	if (locale === "ja") return ja_comparedatabaseintegrations2(inputs)
	if (locale === "ko") return ko_comparedatabaseintegrations2(inputs)
	if (locale === "zh-Hant") return zh_hant1_comparedatabaseintegrations2(inputs)
	if (locale === "de") return de_comparedatabaseintegrations2(inputs)
	return fr_comparedatabaseintegrations2(inputs)
});
export { comparedatabaseintegrations2 as "compareDatabaseIntegrations" }