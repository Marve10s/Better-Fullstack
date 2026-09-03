/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofoutcomeexcludednote3Inputs */

const en_fixproofoutcomeexcludednote3 = /** @type {(inputs: Fixproofoutcomeexcludednote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`A provider quota error voided the run, so it counts for neither index.`)
};

const es_fixproofoutcomeexcludednote3 = /** @type {(inputs: Fixproofoutcomeexcludednote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Un error de cuota del proveedor anuló la ejecución, así que no cuenta para ninguno de los dos índices.`)
};

const zh_fixproofoutcomeexcludednote3 = /** @type {(inputs: Fixproofoutcomeexcludednote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`供应商配额报错让这次运行作废，因此它不计入任何一个指数。`)
};

const ja_fixproofoutcomeexcludednote3 = /** @type {(inputs: Fixproofoutcomeexcludednote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`プロバイダーのクォータエラーで実行が無効になったため、どちらの指数にも数えません。`)
};

const ko_fixproofoutcomeexcludednote3 = /** @type {(inputs: Fixproofoutcomeexcludednote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`제공업체 할당량 오류로 실행이 무효가 되어 두 지수 어디에도 넣지 않습니다.`)
};

const zh_hant1_fixproofoutcomeexcludednote3 = /** @type {(inputs: Fixproofoutcomeexcludednote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`供應商配額報錯讓這次執行作廢，因此它不計入任何一個指數。`)
};

const de_fixproofoutcomeexcludednote3 = /** @type {(inputs: Fixproofoutcomeexcludednote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ein Kontingentfehler des Anbieters hat den Lauf ungültig gemacht, er zählt daher für keinen der beiden Indizes.`)
};

const fr_fixproofoutcomeexcludednote3 = /** @type {(inputs: Fixproofoutcomeexcludednote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Une erreur de quota du fournisseur a annulé l'exécution : elle ne compte pour aucun des deux indices.`)
};

const uk_fixproofoutcomeexcludednote3 = /** @type {(inputs: Fixproofoutcomeexcludednote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Помилка квоти провайдера анулювала запуск, тому він не йде в жоден з індексів.`)
};

/**
* | output |
* | --- |
* | "A provider quota error voided the run, so it counts for neither index." |
*
* @param {Fixproofoutcomeexcludednote3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofoutcomeexcludednote3 = /** @type {((inputs?: Fixproofoutcomeexcludednote3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofoutcomeexcludednote3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofoutcomeexcludednote3(inputs)
	if (locale === "zh") return zh_fixproofoutcomeexcludednote3(inputs)
	if (locale === "ja") return ja_fixproofoutcomeexcludednote3(inputs)
	if (locale === "ko") return ko_fixproofoutcomeexcludednote3(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofoutcomeexcludednote3(inputs)
	if (locale === "de") return de_fixproofoutcomeexcludednote3(inputs)
	if (locale === "fr") return fr_fixproofoutcomeexcludednote3(inputs)
	if (locale === "uk") return uk_fixproofoutcomeexcludednote3(inputs)
	return en_fixproofoutcomeexcludednote3(inputs)
});
export { fixproofoutcomeexcludednote3 as "fixproofOutcomeExcludedNote" }