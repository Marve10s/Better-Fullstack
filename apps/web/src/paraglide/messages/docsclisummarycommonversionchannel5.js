/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarycommonversionchannel5Inputs */



/**
* | output |
* | --- |
* | "Dependency version channel." |
*
* @param {Docsclisummarycommonversionchannel5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarycommonversionchannel5 = /** @type {((inputs?: Docsclisummarycommonversionchannel5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarycommonversionchannel5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Canal de versiones de las dependencias.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("依赖版本通道。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("依存関係のバージョンチャネル。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("의존성 버전 채널.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("相依套件的版本通道。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Versionskanal für Abhängigkeiten.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Canal de versions des dépendances.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Канал версій залежностей.")
	return /** @type {LocalizedString} */ ("Dependency version channel.")
});
export { docsclisummarycommonversionchannel5 as "docsCliSummaryCommonVersionChannel" }