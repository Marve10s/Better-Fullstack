/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofsourcepublic2Inputs */

const en_fixproofsourcepublic2 = /** @type {(inputs: Fixproofsourcepublic2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Public repository`)
};

const es_fixproofsourcepublic2 = /** @type {(inputs: Fixproofsourcepublic2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Repositorio público`)
};

const zh_fixproofsourcepublic2 = /** @type {(inputs: Fixproofsourcepublic2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`公开仓库`)
};

const ja_fixproofsourcepublic2 = /** @type {(inputs: Fixproofsourcepublic2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`公開リポジトリ`)
};

const ko_fixproofsourcepublic2 = /** @type {(inputs: Fixproofsourcepublic2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`공개 저장소`)
};

const zh_hant1_fixproofsourcepublic2 = /** @type {(inputs: Fixproofsourcepublic2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`公開倉庫`)
};

const de_fixproofsourcepublic2 = /** @type {(inputs: Fixproofsourcepublic2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Öffentliches Repository`)
};

const fr_fixproofsourcepublic2 = /** @type {(inputs: Fixproofsourcepublic2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dépôt public`)
};

const uk_fixproofsourcepublic2 = /** @type {(inputs: Fixproofsourcepublic2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Публічний репозиторій`)
};

/**
* | output |
* | --- |
* | "Public repository" |
*
* @param {Fixproofsourcepublic2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofsourcepublic2 = /** @type {((inputs?: Fixproofsourcepublic2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofsourcepublic2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofsourcepublic2(inputs)
	if (locale === "zh") return zh_fixproofsourcepublic2(inputs)
	if (locale === "ja") return ja_fixproofsourcepublic2(inputs)
	if (locale === "ko") return ko_fixproofsourcepublic2(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofsourcepublic2(inputs)
	if (locale === "de") return de_fixproofsourcepublic2(inputs)
	if (locale === "fr") return fr_fixproofsourcepublic2(inputs)
	if (locale === "uk") return uk_fixproofsourcepublic2(inputs)
	return en_fixproofsourcepublic2(inputs)
});
export { fixproofsourcepublic2 as "fixproofSourcePublic" }