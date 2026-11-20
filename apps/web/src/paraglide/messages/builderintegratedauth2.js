/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderintegratedauth2Inputs */



/**
* | output |
* | --- |
* | "Integrated Auth" |
*
* @param {Builderintegratedauth2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderintegratedauth2 = /** @type {((inputs?: Builderintegratedauth2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderintegratedauth2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Auth integrada")
	if (locale === "zh") return /** @type {LocalizedString} */ ("集成认证")
	if (locale === "ja") return /** @type {LocalizedString} */ ("統合認証")
	if (locale === "ko") return /** @type {LocalizedString} */ ("통합 인증")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("整合認證")
	if (locale === "de") return /** @type {LocalizedString} */ ("Integrierte Auth")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Authentification intégrée")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Вбудована автентифікація")
	return /** @type {LocalizedString} */ ("Integrated Auth")
});
export { builderintegratedauth2 as "builderIntegratedAuth" }