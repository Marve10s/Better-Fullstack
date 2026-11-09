/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Comparegobackends2Inputs */



/**
* | output |
* | --- |
* | "Go backends (Gin, Echo)" |
*
* @param {Comparegobackends2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const comparegobackends2 = /** @type {((inputs?: Comparegobackends2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comparegobackends2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Backends Go (Gin, Echo)")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Go 后端（Gin、Echo）")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Go バックエンド (Gin、Echo)")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Go 백엔드(Gin, Echo)")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Go 後端（Gin、Echo）")
	if (locale === "de") return /** @type {LocalizedString} */ ("Go-Backends (Gin, Echo)")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Backends Go (Gin, Echo)")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Go-бекенди (Gin, Echo)")
	return /** @type {LocalizedString} */ ("Go backends (Gin, Echo)")
});
export { comparegobackends2 as "compareGoBackends" }