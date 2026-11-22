/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsnoresultsprefix3Inputs */



/**
* | output |
* | --- |
* | "No results for" |
*
* @param {Docsnoresultsprefix3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsnoresultsprefix3 = /** @type {((inputs?: Docsnoresultsprefix3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsnoresultsprefix3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Sin resultados para")
	if (locale === "zh") return /** @type {LocalizedString} */ ("没有结果：")
	if (locale === "ja") return /** @type {LocalizedString} */ ("結果はありません")
	if (locale === "ko") return /** @type {LocalizedString} */ ("다음에 대한 검색결과가 없습니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("沒有結果：")
	if (locale === "de") return /** @type {LocalizedString} */ ("Keine Ergebnisse für")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Aucun résultat pour")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Немає результатів для")
	return /** @type {LocalizedString} */ ("No results for")
});
export { docsnoresultsprefix3 as "docsNoResultsPrefix" }