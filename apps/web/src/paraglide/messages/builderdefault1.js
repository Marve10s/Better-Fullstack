/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderdefault1Inputs */



/**
* | output |
* | --- |
* | "Default" |
*
* @param {Builderdefault1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderdefault1 = /** @type {((inputs?: Builderdefault1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderdefault1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Predeterminado")
	if (locale === "zh") return /** @type {LocalizedString} */ ("默认")
	if (locale === "ja") return /** @type {LocalizedString} */ ("デフォルト")
	if (locale === "ko") return /** @type {LocalizedString} */ ("기본")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("預設")
	if (locale === "de") return /** @type {LocalizedString} */ ("Standard")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Par défaut")
	if (locale === "uk") return /** @type {LocalizedString} */ ("За замовчуванням")
	return /** @type {LocalizedString} */ ("Default")
});
export { builderdefault1 as "builderDefault" }