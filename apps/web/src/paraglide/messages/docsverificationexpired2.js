/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationexpired2Inputs */

const en_docsverificationexpired2 = /** @type {(inputs: Docsverificationexpired2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The latest release receipt has expired.`)
};

const es_docsverificationexpired2 = /** @type {(inputs: Docsverificationexpired2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`El comprobante más reciente de la versión ha caducado.`)
};

const zh_docsverificationexpired2 = /** @type {(inputs: Docsverificationexpired2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最新的发布回执已过期。`)
};

const ja_docsverificationexpired2 = /** @type {(inputs: Docsverificationexpired2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最新のリリースレシートは有効期限が切れています。`)
};

const ko_docsverificationexpired2 = /** @type {(inputs: Docsverificationexpired2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`최신 릴리스 증빙이 만료되었습니다.`)
};

const zh_hant1_docsverificationexpired2 = /** @type {(inputs: Docsverificationexpired2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最新的發行回執已過期。`)
};

const de_docsverificationexpired2 = /** @type {(inputs: Docsverificationexpired2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Der neueste Release-Beleg ist abgelaufen.`)
};

const fr_docsverificationexpired2 = /** @type {(inputs: Docsverificationexpired2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Le dernier reçu de version a expiré.`)
};

const uk_docsverificationexpired2 = /** @type {(inputs: Docsverificationexpired2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Термін дії останнього підтвердження релізу минув.`)
};

/**
* | output |
* | --- |
* | "The latest release receipt has expired." |
*
* @param {Docsverificationexpired2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationexpired2 = /** @type {((inputs?: Docsverificationexpired2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationexpired2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsverificationexpired2(inputs)
	if (locale === "zh") return zh_docsverificationexpired2(inputs)
	if (locale === "ja") return ja_docsverificationexpired2(inputs)
	if (locale === "ko") return ko_docsverificationexpired2(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsverificationexpired2(inputs)
	if (locale === "de") return de_docsverificationexpired2(inputs)
	if (locale === "fr") return fr_docsverificationexpired2(inputs)
	if (locale === "uk") return uk_docsverificationexpired2(inputs)
	return en_docsverificationexpired2(inputs)
});
export { docsverificationexpired2 as "docsVerificationExpired" }