/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationreceiptvaliduntil4Inputs */

const en_docsverificationreceiptvaliduntil4 = /** @type {(inputs: Docsverificationreceiptvaliduntil4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Receipt valid until`)
};

const es_docsverificationreceiptvaliduntil4 = /** @type {(inputs: Docsverificationreceiptvaliduntil4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Comprobante válido hasta`)
};

const zh_docsverificationreceiptvaliduntil4 = /** @type {(inputs: Docsverificationreceiptvaliduntil4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`回执有效期至`)
};

const ja_docsverificationreceiptvaliduntil4 = /** @type {(inputs: Docsverificationreceiptvaliduntil4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`レシート有効期限`)
};

const ko_docsverificationreceiptvaliduntil4 = /** @type {(inputs: Docsverificationreceiptvaliduntil4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`증빙 유효 기한`)
};

const zh_hant1_docsverificationreceiptvaliduntil4 = /** @type {(inputs: Docsverificationreceiptvaliduntil4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`回執有效期限`)
};

const de_docsverificationreceiptvaliduntil4 = /** @type {(inputs: Docsverificationreceiptvaliduntil4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Beleg gültig bis`)
};

const fr_docsverificationreceiptvaliduntil4 = /** @type {(inputs: Docsverificationreceiptvaliduntil4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Reçu valable jusqu'au`)
};

const uk_docsverificationreceiptvaliduntil4 = /** @type {(inputs: Docsverificationreceiptvaliduntil4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Підтвердження дійсне до`)
};

/**
* | output |
* | --- |
* | "Receipt valid until" |
*
* @param {Docsverificationreceiptvaliduntil4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationreceiptvaliduntil4 = /** @type {((inputs?: Docsverificationreceiptvaliduntil4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationreceiptvaliduntil4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsverificationreceiptvaliduntil4(inputs)
	if (locale === "zh") return zh_docsverificationreceiptvaliduntil4(inputs)
	if (locale === "ja") return ja_docsverificationreceiptvaliduntil4(inputs)
	if (locale === "ko") return ko_docsverificationreceiptvaliduntil4(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsverificationreceiptvaliduntil4(inputs)
	if (locale === "de") return de_docsverificationreceiptvaliduntil4(inputs)
	if (locale === "fr") return fr_docsverificationreceiptvaliduntil4(inputs)
	if (locale === "uk") return uk_docsverificationreceiptvaliduntil4(inputs)
	return en_docsverificationreceiptvaliduntil4(inputs)
});
export { docsverificationreceiptvaliduntil4 as "docsVerificationReceiptValidUntil" }