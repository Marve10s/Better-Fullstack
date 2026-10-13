/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationnoreceipt3Inputs */

const en_docsverificationnoreceipt3 = /** @type {(inputs: Docsverificationnoreceipt3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No current release receipt is available.`)
};

const es_docsverificationnoreceipt3 = /** @type {(inputs: Docsverificationnoreceipt3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No hay ningún comprobante de versión actual disponible.`)
};

const zh_docsverificationnoreceipt3 = /** @type {(inputs: Docsverificationnoreceipt3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`当前没有可用的发布回执。`)
};

const ja_docsverificationnoreceipt3 = /** @type {(inputs: Docsverificationnoreceipt3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`現在のリリースレシートはありません。`)
};

const ko_docsverificationnoreceipt3 = /** @type {(inputs: Docsverificationnoreceipt3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`현재 릴리스 증빙이 없습니다.`)
};

const zh_hant1_docsverificationnoreceipt3 = /** @type {(inputs: Docsverificationnoreceipt3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`目前沒有可用的發行回執。`)
};

const de_docsverificationnoreceipt3 = /** @type {(inputs: Docsverificationnoreceipt3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Es ist kein aktueller Release-Beleg verfügbar.`)
};

const fr_docsverificationnoreceipt3 = /** @type {(inputs: Docsverificationnoreceipt3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Aucun reçu de version actuel n'est disponible.`)
};

const uk_docsverificationnoreceipt3 = /** @type {(inputs: Docsverificationnoreceipt3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Немає актуального підтвердження релізу.`)
};

/**
* | output |
* | --- |
* | "No current release receipt is available." |
*
* @param {Docsverificationnoreceipt3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationnoreceipt3 = /** @type {((inputs?: Docsverificationnoreceipt3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationnoreceipt3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsverificationnoreceipt3(inputs)
	if (locale === "zh") return zh_docsverificationnoreceipt3(inputs)
	if (locale === "ja") return ja_docsverificationnoreceipt3(inputs)
	if (locale === "ko") return ko_docsverificationnoreceipt3(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsverificationnoreceipt3(inputs)
	if (locale === "de") return de_docsverificationnoreceipt3(inputs)
	if (locale === "fr") return fr_docsverificationnoreceipt3(inputs)
	if (locale === "uk") return uk_docsverificationnoreceipt3(inputs)
	return en_docsverificationnoreceipt3(inputs)
});
export { docsverificationnoreceipt3 as "docsVerificationNoReceipt" }