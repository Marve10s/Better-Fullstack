/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderback1Inputs */



/**
* | output |
* | --- |
* | "Back" |
*
* @param {Builderback1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderback1 = /** @type {((inputs?: Builderback1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderback1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Atrás")
	if (locale === "zh") return /** @type {LocalizedString} */ ("返回")
	if (locale === "ja") return /** @type {LocalizedString} */ ("戻る")
	if (locale === "ko") return /** @type {LocalizedString} */ ("뒤로")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("返回")
	if (locale === "de") return /** @type {LocalizedString} */ ("Zurück")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Retour")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Назад")
	return /** @type {LocalizedString} */ ("Back")
});
export { builderback1 as "builderBack" }