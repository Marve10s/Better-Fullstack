/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationreceiptcreated3Inputs */

const en_docsverificationreceiptcreated3 = /** @type {(inputs: Docsverificationreceiptcreated3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Receipt created`)
};

const es_docsverificationreceiptcreated3 = /** @type {(inputs: Docsverificationreceiptcreated3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Comprobante creado`)
};

const zh_docsverificationreceiptcreated3 = /** @type {(inputs: Docsverificationreceiptcreated3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`回执创建时间`)
};

const ja_docsverificationreceiptcreated3 = /** @type {(inputs: Docsverificationreceiptcreated3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`レシート作成日時`)
};

const ko_docsverificationreceiptcreated3 = /** @type {(inputs: Docsverificationreceiptcreated3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`증빙 생성 시각`)
};

const zh_hant1_docsverificationreceiptcreated3 = /** @type {(inputs: Docsverificationreceiptcreated3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`回執建立時間`)
};

const de_docsverificationreceiptcreated3 = /** @type {(inputs: Docsverificationreceiptcreated3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Beleg erstellt`)
};

const fr_docsverificationreceiptcreated3 = /** @type {(inputs: Docsverificationreceiptcreated3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Reçu créé le`)
};

const uk_docsverificationreceiptcreated3 = /** @type {(inputs: Docsverificationreceiptcreated3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Підтвердження створено`)
};

/**
* | output |
* | --- |
* | "Receipt created" |
*
* @param {Docsverificationreceiptcreated3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationreceiptcreated3 = /** @type {((inputs?: Docsverificationreceiptcreated3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationreceiptcreated3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsverificationreceiptcreated3(inputs)
	if (locale === "zh") return zh_docsverificationreceiptcreated3(inputs)
	if (locale === "ja") return ja_docsverificationreceiptcreated3(inputs)
	if (locale === "ko") return ko_docsverificationreceiptcreated3(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsverificationreceiptcreated3(inputs)
	if (locale === "de") return de_docsverificationreceiptcreated3(inputs)
	if (locale === "fr") return fr_docsverificationreceiptcreated3(inputs)
	if (locale === "uk") return uk_docsverificationreceiptcreated3(inputs)
	return en_docsverificationreceiptcreated3(inputs)
});
export { docsverificationreceiptcreated3 as "docsVerificationReceiptCreated" }