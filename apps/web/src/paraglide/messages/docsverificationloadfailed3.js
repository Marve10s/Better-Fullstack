/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationloadfailed3Inputs */

const en_docsverificationloadfailed3 = /** @type {(inputs: Docsverificationloadfailed3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The current release receipt could not be loaded.`)
};

const es_docsverificationloadfailed3 = /** @type {(inputs: Docsverificationloadfailed3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No se pudo cargar el comprobante de versión actual.`)
};

const zh_docsverificationloadfailed3 = /** @type {(inputs: Docsverificationloadfailed3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`无法加载当前的发布回执。`)
};

const ja_docsverificationloadfailed3 = /** @type {(inputs: Docsverificationloadfailed3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`現在のリリースレシートを読み込めませんでした。`)
};

const ko_docsverificationloadfailed3 = /** @type {(inputs: Docsverificationloadfailed3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`현재 릴리스 증빙을 불러오지 못했습니다.`)
};

const zh_hant1_docsverificationloadfailed3 = /** @type {(inputs: Docsverificationloadfailed3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`無法載入目前的發行回執。`)
};

const de_docsverificationloadfailed3 = /** @type {(inputs: Docsverificationloadfailed3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Der aktuelle Release-Beleg konnte nicht geladen werden.`)
};

const fr_docsverificationloadfailed3 = /** @type {(inputs: Docsverificationloadfailed3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Le reçu de version actuel n'a pas pu être chargé.`)
};

const uk_docsverificationloadfailed3 = /** @type {(inputs: Docsverificationloadfailed3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Не вдалося завантажити актуальне підтвердження релізу.`)
};

/**
* | output |
* | --- |
* | "The current release receipt could not be loaded." |
*
* @param {Docsverificationloadfailed3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationloadfailed3 = /** @type {((inputs?: Docsverificationloadfailed3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationloadfailed3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsverificationloadfailed3(inputs)
	if (locale === "zh") return zh_docsverificationloadfailed3(inputs)
	if (locale === "ja") return ja_docsverificationloadfailed3(inputs)
	if (locale === "ko") return ko_docsverificationloadfailed3(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsverificationloadfailed3(inputs)
	if (locale === "de") return de_docsverificationloadfailed3(inputs)
	if (locale === "fr") return fr_docsverificationloadfailed3(inputs)
	if (locale === "uk") return uk_docsverificationloadfailed3(inputs)
	return en_docsverificationloadfailed3(inputs)
});
export { docsverificationloadfailed3 as "docsVerificationLoadFailed" }