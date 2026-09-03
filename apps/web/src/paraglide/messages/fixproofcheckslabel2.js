/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofcheckslabel2Inputs */

const en_fixproofcheckslabel2 = /** @type {(inputs: Fixproofcheckslabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Checks passed`)
};

const es_fixproofcheckslabel2 = /** @type {(inputs: Fixproofcheckslabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Comprobaciones superadas`)
};

const zh_fixproofcheckslabel2 = /** @type {(inputs: Fixproofcheckslabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`通过的检查`)
};

const ja_fixproofcheckslabel2 = /** @type {(inputs: Fixproofcheckslabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`合格したチェック`)
};

const ko_fixproofcheckslabel2 = /** @type {(inputs: Fixproofcheckslabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`통과한 검사`)
};

const zh_hant1_fixproofcheckslabel2 = /** @type {(inputs: Fixproofcheckslabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`通過的檢查`)
};

const de_fixproofcheckslabel2 = /** @type {(inputs: Fixproofcheckslabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Bestandene Prüfungen`)
};

const fr_fixproofcheckslabel2 = /** @type {(inputs: Fixproofcheckslabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Vérifications passées`)
};

const uk_fixproofcheckslabel2 = /** @type {(inputs: Fixproofcheckslabel2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Пройдені перевірки`)
};

/**
* | output |
* | --- |
* | "Checks passed" |
*
* @param {Fixproofcheckslabel2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofcheckslabel2 = /** @type {((inputs?: Fixproofcheckslabel2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofcheckslabel2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofcheckslabel2(inputs)
	if (locale === "zh") return zh_fixproofcheckslabel2(inputs)
	if (locale === "ja") return ja_fixproofcheckslabel2(inputs)
	if (locale === "ko") return ko_fixproofcheckslabel2(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofcheckslabel2(inputs)
	if (locale === "de") return de_fixproofcheckslabel2(inputs)
	if (locale === "fr") return fr_fixproofcheckslabel2(inputs)
	if (locale === "uk") return uk_fixproofcheckslabel2(inputs)
	return en_fixproofcheckslabel2(inputs)
});
export { fixproofcheckslabel2 as "fixproofChecksLabel" }