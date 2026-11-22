/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Actionsreset1Inputs */



/**
* | output |
* | --- |
* | "Reset" |
*
* @param {Actionsreset1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const actionsreset1 = /** @type {((inputs?: Actionsreset1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Actionsreset1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Restablecer")
	if (locale === "zh") return /** @type {LocalizedString} */ ("重置")
	if (locale === "ja") return /** @type {LocalizedString} */ ("リセット")
	if (locale === "ko") return /** @type {LocalizedString} */ ("초기화")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("重置")
	if (locale === "de") return /** @type {LocalizedString} */ ("Zurücksetzen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Réinitialiser")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Скинути")
	return /** @type {LocalizedString} */ ("Reset")
});
export { actionsreset1 as "actionsReset" }