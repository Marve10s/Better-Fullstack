/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarycommonyolo4Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Omitir las confirmaciones de seguridad, donde se admita.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("在支持的情况下跳过安全确认。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("対応している場合、安全確認をスキップします。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("지원되는 경우 안전 확인을 건너뜁니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("在支援的情況下略過安全確認。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Sicherheitsbestätigungen überspringen, sofern unterstützt.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Ignorer les confirmations de sécurité, si cette fonction est prise en charge.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Пропустити підтвердження безпеки, якщо це підтримується.")
	return /** @type {LocalizedString} */ ("Skip safety confirmations where supported.")
});
export { docsclisummarycommonyolo4 as "docsCliSummaryCommonYolo" }