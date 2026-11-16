/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildergroupother2Inputs */



/**
* | output |
* | --- |
* | "Other" |
*
* @param {Buildergroupother2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildergroupother2 = /** @type {((inputs?: Buildergroupother2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildergroupother2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Otros")
	if (locale === "zh") return /** @type {LocalizedString} */ ("其他")
	if (locale === "ja") return /** @type {LocalizedString} */ ("その他")
	if (locale === "ko") return /** @type {LocalizedString} */ ("기타")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("其他")
	if (locale === "de") return /** @type {LocalizedString} */ ("Andere")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Autre")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Інше")
	return /** @type {LocalizedString} */ ("Other")
});
export { buildergroupother2 as "builderGroupOther" }