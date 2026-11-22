/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposerapplications2Inputs */



/**
* | output |
* | --- |
* | "Applications" |
*
* @param {Buildercomposerapplications2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposerapplications2 = /** @type {((inputs?: Buildercomposerapplications2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposerapplications2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Aplicaciones")
	if (locale === "zh") return /** @type {LocalizedString} */ ("应用")
	if (locale === "ja") return /** @type {LocalizedString} */ ("アプリケーション")
	if (locale === "ko") return /** @type {LocalizedString} */ ("애플리케이션")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("應用程式")
	if (locale === "de") return /** @type {LocalizedString} */ ("Anwendungen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Applications")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Застосунки")
	return /** @type {LocalizedString} */ ("Applications")
});
export { buildercomposerapplications2 as "builderComposerApplications" }