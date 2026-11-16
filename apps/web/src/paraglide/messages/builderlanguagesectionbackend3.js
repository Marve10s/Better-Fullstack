/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderlanguagesectionbackend3Inputs */



/**
* | output |
* | --- |
* | "Backend" |
*
* @param {Builderlanguagesectionbackend3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderlanguagesectionbackend3 = /** @type {((inputs?: Builderlanguagesectionbackend3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderlanguagesectionbackend3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Backend")
	if (locale === "zh") return /** @type {LocalizedString} */ ("后端")
	if (locale === "ja") return /** @type {LocalizedString} */ ("バックエンド")
	if (locale === "ko") return /** @type {LocalizedString} */ ("백엔드")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("後端")
	if (locale === "de") return /** @type {LocalizedString} */ ("Backend")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Backend")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Бекенд")
	return /** @type {LocalizedString} */ ("Backend")
});
export { builderlanguagesectionbackend3 as "builderLanguageSectionBackend" }