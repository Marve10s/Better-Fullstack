/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcptoolschemadescription3Inputs */

const en_mcptoolschemadescription3 = /** @type {(inputs: Mcptoolschemadescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Valid options for any category, filterable by ecosystem`)
};

const es_mcptoolschemadescription3 = /** @type {(inputs: Mcptoolschemadescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Opciones válidas para cualquier categoría, filtrables por ecosistema`)
};

const zh_mcptoolschemadescription3 = /** @type {(inputs: Mcptoolschemadescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`任意类别的有效选项，可按生态筛选`)
};

const ja_mcptoolschemadescription3 = /** @type {(inputs: Mcptoolschemadescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`あらゆるカテゴリに有効なオプション、エコシステムごとにフィルタリング可能`)
};

const ko_mcptoolschemadescription3 = /** @type {(inputs: Mcptoolschemadescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`모든 카테고리에 유효한 옵션, 생태계별로 필터링 가능`)
};

const zh_hant1_mcptoolschemadescription3 = /** @type {(inputs: Mcptoolschemadescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`任意類別的有效選項，可依生態篩選`)
};

const de_mcptoolschemadescription3 = /** @type {(inputs: Mcptoolschemadescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Gültige Optionen für jede Kategorie, filterbar nach Ökosystem`)
};

const fr_mcptoolschemadescription3 = /** @type {(inputs: Mcptoolschemadescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Options valides pour n'importe quelle catégorie, filtrables par écosystème`)
};

/**
* | output |
* | --- |
* | "Valid options for any category, filterable by ecosystem" |
*
* @param {Mcptoolschemadescription3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const mcptoolschemadescription3 = /** @type {((inputs?: Mcptoolschemadescription3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcptoolschemadescription3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcptoolschemadescription3(inputs)
	if (locale === "es") return es_mcptoolschemadescription3(inputs)
	if (locale === "zh") return zh_mcptoolschemadescription3(inputs)
	if (locale === "ja") return ja_mcptoolschemadescription3(inputs)
	if (locale === "ko") return ko_mcptoolschemadescription3(inputs)
	if (locale === "zh-Hant") return zh_hant1_mcptoolschemadescription3(inputs)
	if (locale === "de") return de_mcptoolschemadescription3(inputs)
	return fr_mcptoolschemadescription3(inputs)
});
export { mcptoolschemadescription3 as "mcpToolSchemaDescription" }