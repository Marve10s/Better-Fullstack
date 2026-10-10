/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarycommonyolo4Inputs */

const en_docsclisummarycommonyolo4 = /** @type {(inputs: Docsclisummarycommonyolo4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Skip safety confirmations where supported.`)
};

const es_docsclisummarycommonyolo4 = /** @type {(inputs: Docsclisummarycommonyolo4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Omitir las confirmaciones de seguridad, donde se admita.`)
};

const zh_docsclisummarycommonyolo4 = /** @type {(inputs: Docsclisummarycommonyolo4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`在支持的情况下跳过安全确认。`)
};

const ja_docsclisummarycommonyolo4 = /** @type {(inputs: Docsclisummarycommonyolo4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`対応している場合、安全確認をスキップします。`)
};

const ko_docsclisummarycommonyolo4 = /** @type {(inputs: Docsclisummarycommonyolo4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`지원되는 경우 안전 확인을 건너뜁니다.`)
};

const zh_hant1_docsclisummarycommonyolo4 = /** @type {(inputs: Docsclisummarycommonyolo4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`在支援的情況下略過安全確認。`)
};

const de_docsclisummarycommonyolo4 = /** @type {(inputs: Docsclisummarycommonyolo4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sicherheitsbestätigungen überspringen, sofern unterstützt.`)
};

const fr_docsclisummarycommonyolo4 = /** @type {(inputs: Docsclisummarycommonyolo4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ignorer les confirmations de sécurité, si cette fonction est prise en charge.`)
};

const uk_docsclisummarycommonyolo4 = /** @type {(inputs: Docsclisummarycommonyolo4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Пропустити підтвердження безпеки, якщо це підтримується.`)
};

/**
* | output |
* | --- |
* | "Skip safety confirmations where supported." |
*
* @param {Docsclisummarycommonyolo4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarycommonyolo4 = /** @type {((inputs?: Docsclisummarycommonyolo4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarycommonyolo4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummarycommonyolo4(inputs)
	if (locale === "zh") return zh_docsclisummarycommonyolo4(inputs)
	if (locale === "ja") return ja_docsclisummarycommonyolo4(inputs)
	if (locale === "ko") return ko_docsclisummarycommonyolo4(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummarycommonyolo4(inputs)
	if (locale === "de") return de_docsclisummarycommonyolo4(inputs)
	if (locale === "fr") return fr_docsclisummarycommonyolo4(inputs)
	if (locale === "uk") return uk_docsclisummarycommonyolo4(inputs)
	return en_docsclisummarycommonyolo4(inputs)
});
export { docsclisummarycommonyolo4 as "docsCliSummaryCommonYolo" }