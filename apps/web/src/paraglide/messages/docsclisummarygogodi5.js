/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarygogodi5Inputs */



/**
* | output |
* | --- |
* | "Go dependency injection." |
*
* @param {Docsclisummarygogodi5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarygogodi5 = /** @type {((inputs?: Docsclisummarygogodi5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarygogodi5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Inyección de dependencias en Go.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Go 依赖注入。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Go の依存性注入。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Go 의존성 주입.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Go 相依性注入。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Dependency Injection für Go.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Injection de dépendances Go.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Впровадження залежностей у Go.")
	return /** @type {LocalizedString} */ ("Go dependency injection.")
});
export { docsclisummarygogodi5 as "docsCliSummaryGoGoDi" }