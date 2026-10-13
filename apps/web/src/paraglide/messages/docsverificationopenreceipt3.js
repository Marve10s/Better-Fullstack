/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationopenreceipt3Inputs */

const en_docsverificationopenreceipt3 = /** @type {(inputs: Docsverificationopenreceipt3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Open release receipt`)
};

const es_docsverificationopenreceipt3 = /** @type {(inputs: Docsverificationopenreceipt3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Abrir comprobante de la versión`)
};

const zh_docsverificationopenreceipt3 = /** @type {(inputs: Docsverificationopenreceipt3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`打开发布回执`)
};

const ja_docsverificationopenreceipt3 = /** @type {(inputs: Docsverificationopenreceipt3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`リリースレシートを開く`)
};

const ko_docsverificationopenreceipt3 = /** @type {(inputs: Docsverificationopenreceipt3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`릴리스 증빙 열기`)
};

const zh_hant1_docsverificationopenreceipt3 = /** @type {(inputs: Docsverificationopenreceipt3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`開啟發行回執`)
};

const de_docsverificationopenreceipt3 = /** @type {(inputs: Docsverificationopenreceipt3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Release-Beleg öffnen`)
};

const fr_docsverificationopenreceipt3 = /** @type {(inputs: Docsverificationopenreceipt3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ouvrir le reçu de version`)
};

const uk_docsverificationopenreceipt3 = /** @type {(inputs: Docsverificationopenreceipt3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Відкрити підтвердження релізу`)
};

/**
* | output |
* | --- |
* | "Open release receipt" |
*
* @param {Docsverificationopenreceipt3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationopenreceipt3 = /** @type {((inputs?: Docsverificationopenreceipt3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationopenreceipt3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsverificationopenreceipt3(inputs)
	if (locale === "zh") return zh_docsverificationopenreceipt3(inputs)
	if (locale === "ja") return ja_docsverificationopenreceipt3(inputs)
	if (locale === "ko") return ko_docsverificationopenreceipt3(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsverificationopenreceipt3(inputs)
	if (locale === "de") return de_docsverificationopenreceipt3(inputs)
	if (locale === "fr") return fr_docsverificationopenreceipt3(inputs)
	if (locale === "uk") return uk_docsverificationopenreceipt3(inputs)
	return en_docsverificationopenreceipt3(inputs)
});
export { docsverificationopenreceipt3 as "docsVerificationOpenReceipt" }