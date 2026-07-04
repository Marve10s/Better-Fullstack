/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsnoresultsprefix3Inputs */

const en_docsnoresultsprefix3 = /** @type {(inputs: Docsnoresultsprefix3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No results for`)
};

const es_docsnoresultsprefix3 = /** @type {(inputs: Docsnoresultsprefix3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sin resultados para`)
};

const zh_docsnoresultsprefix3 = /** @type {(inputs: Docsnoresultsprefix3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`没有结果：`)
};

const ja_docsnoresultsprefix3 = /** @type {(inputs: Docsnoresultsprefix3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`結果はありません`)
};

const ko_docsnoresultsprefix3 = /** @type {(inputs: Docsnoresultsprefix3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`다음에 대한 검색결과가 없습니다.`)
};

const zh_hant1_docsnoresultsprefix3 = /** @type {(inputs: Docsnoresultsprefix3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`沒有結果：`)
};

const de_docsnoresultsprefix3 = /** @type {(inputs: Docsnoresultsprefix3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Keine Ergebnisse für`)
};

const fr_docsnoresultsprefix3 = /** @type {(inputs: Docsnoresultsprefix3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Aucun résultat pour`)
};

const uk_docsnoresultsprefix3 = /** @type {(inputs: Docsnoresultsprefix3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Немає результатів для`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_docsnoresultsprefix3(inputs)
	if (locale === "es") return es_docsnoresultsprefix3(inputs)
	if (locale === "zh") return zh_docsnoresultsprefix3(inputs)
	if (locale === "ja") return ja_docsnoresultsprefix3(inputs)
	if (locale === "ko") return ko_docsnoresultsprefix3(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsnoresultsprefix3(inputs)
	if (locale === "de") return de_docsnoresultsprefix3(inputs)
	if (locale === "fr") return fr_docsnoresultsprefix3(inputs)
	return uk_docsnoresultsprefix3(inputs)
});
export { docsnoresultsprefix3 as "docsNoResultsPrefix" }