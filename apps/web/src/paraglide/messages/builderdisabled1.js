/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderdisabled1Inputs */



/**
* | output |
* | --- |
* | "Disabled" |
*
* @param {Builderdisabled1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderdisabled1 = /** @type {((inputs?: Builderdisabled1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderdisabled1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Desactivado")
	if (locale === "zh") return /** @type {LocalizedString} */ ("已禁用")
	if (locale === "ja") return /** @type {LocalizedString} */ ("無効")
	if (locale === "ko") return /** @type {LocalizedString} */ ("비활성화됨")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("已停用")
	if (locale === "de") return /** @type {LocalizedString} */ ("Deaktiviert")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Désactivé")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Вимкнено")
	return /** @type {LocalizedString} */ ("Disabled")
});
export { builderdisabled1 as "builderDisabled" }