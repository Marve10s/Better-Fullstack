/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcptoolschemadescription3Inputs */



/**
* | output |
* | --- |
* | "Valid options for any category, filterable by ecosystem" |
*
* @param {Mcptoolschemadescription3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const mcptoolschemadescription3 = /** @type {((inputs?: Mcptoolschemadescription3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcptoolschemadescription3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Opciones válidas para cualquier categoría, filtrables por ecosistema")
	if (locale === "zh") return /** @type {LocalizedString} */ ("任意类别的有效选项，可按生态筛选")
	if (locale === "ja") return /** @type {LocalizedString} */ ("あらゆるカテゴリに有効なオプション、エコシステムごとにフィルタリング可能")
	if (locale === "ko") return /** @type {LocalizedString} */ ("모든 카테고리에 유효한 옵션, 생태계별로 필터링 가능")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("任意類別的有效選項，可依生態篩選")
	if (locale === "de") return /** @type {LocalizedString} */ ("Gültige Optionen für jede Kategorie, filterbar nach Ökosystem")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Options valides pour n'importe quelle catégorie, filtrables par écosystème")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Доступні опції для будь-якої категорії з фільтром за екосистемою")
	return /** @type {LocalizedString} */ ("Valid options for any category, filterable by ecosystem")
});
export { mcptoolschemadescription3 as "mcpToolSchemaDescription" }