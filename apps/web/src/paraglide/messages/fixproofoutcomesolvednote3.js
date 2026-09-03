/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofoutcomesolvednote3Inputs */

const en_fixproofoutcomesolvednote3 = /** @type {(inputs: Fixproofoutcomesolvednote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Every hidden check passed and nothing regressed.`)
};

const es_fixproofoutcomesolvednote3 = /** @type {(inputs: Fixproofoutcomesolvednote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pasaron todas las comprobaciones ocultas y nada se rompió.`)
};

const zh_fixproofoutcomesolvednote3 = /** @type {(inputs: Fixproofoutcomesolvednote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`所有隐藏检查都通过，也没有任何回归。`)
};

const ja_fixproofoutcomesolvednote3 = /** @type {(inputs: Fixproofoutcomesolvednote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`すべての非公開チェックに合格し、リグレッションもありませんでした。`)
};

const ko_fixproofoutcomesolvednote3 = /** @type {(inputs: Fixproofoutcomesolvednote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`모든 비공개 검사를 통과했고 회귀도 없었습니다.`)
};

const zh_hant1_fixproofoutcomesolvednote3 = /** @type {(inputs: Fixproofoutcomesolvednote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`所有隱藏檢查都通過，也沒有任何迴歸。`)
};

const de_fixproofoutcomesolvednote3 = /** @type {(inputs: Fixproofoutcomesolvednote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Jede verborgene Prüfung wurde bestanden und es gab keine Regression.`)
};

const fr_fixproofoutcomesolvednote3 = /** @type {(inputs: Fixproofoutcomesolvednote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Toutes les vérifications cachées sont passées et rien n'a régressé.`)
};

const uk_fixproofoutcomesolvednote3 = /** @type {(inputs: Fixproofoutcomesolvednote3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Усі приховані перевірки пройшли, і нічого не зламалося.`)
};

/**
* | output |
* | --- |
* | "Every hidden check passed and nothing regressed." |
*
* @param {Fixproofoutcomesolvednote3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofoutcomesolvednote3 = /** @type {((inputs?: Fixproofoutcomesolvednote3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofoutcomesolvednote3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofoutcomesolvednote3(inputs)
	if (locale === "zh") return zh_fixproofoutcomesolvednote3(inputs)
	if (locale === "ja") return ja_fixproofoutcomesolvednote3(inputs)
	if (locale === "ko") return ko_fixproofoutcomesolvednote3(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofoutcomesolvednote3(inputs)
	if (locale === "de") return de_fixproofoutcomesolvednote3(inputs)
	if (locale === "fr") return fr_fixproofoutcomesolvednote3(inputs)
	if (locale === "uk") return uk_fixproofoutcomesolvednote3(inputs)
	return en_fixproofoutcomesolvednote3(inputs)
});
export { fixproofoutcomesolvednote3 as "fixproofOutcomeSolvedNote" }