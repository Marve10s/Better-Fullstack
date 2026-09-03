/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofsourceprivate2Inputs */

const en_fixproofsourceprivate2 = /** @type {(inputs: Fixproofsourceprivate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Private repository`)
};

const es_fixproofsourceprivate2 = /** @type {(inputs: Fixproofsourceprivate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Repositorio privado`)
};

const zh_fixproofsourceprivate2 = /** @type {(inputs: Fixproofsourceprivate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`私有仓库`)
};

const ja_fixproofsourceprivate2 = /** @type {(inputs: Fixproofsourceprivate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`非公開リポジトリ`)
};

const ko_fixproofsourceprivate2 = /** @type {(inputs: Fixproofsourceprivate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`비공개 저장소`)
};

const zh_hant1_fixproofsourceprivate2 = /** @type {(inputs: Fixproofsourceprivate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`私有倉庫`)
};

const de_fixproofsourceprivate2 = /** @type {(inputs: Fixproofsourceprivate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Privates Repository`)
};

const fr_fixproofsourceprivate2 = /** @type {(inputs: Fixproofsourceprivate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dépôt privé`)
};

const uk_fixproofsourceprivate2 = /** @type {(inputs: Fixproofsourceprivate2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Приватний репозиторій`)
};

/**
* | output |
* | --- |
* | "Private repository" |
*
* @param {Fixproofsourceprivate2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofsourceprivate2 = /** @type {((inputs?: Fixproofsourceprivate2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofsourceprivate2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofsourceprivate2(inputs)
	if (locale === "zh") return zh_fixproofsourceprivate2(inputs)
	if (locale === "ja") return ja_fixproofsourceprivate2(inputs)
	if (locale === "ko") return ko_fixproofsourceprivate2(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofsourceprivate2(inputs)
	if (locale === "de") return de_fixproofsourceprivate2(inputs)
	if (locale === "fr") return fr_fixproofsourceprivate2(inputs)
	if (locale === "uk") return uk_fixproofsourceprivate2(inputs)
	return en_fixproofsourceprivate2(inputs)
});
export { fixproofsourceprivate2 as "fixproofSourcePrivate" }