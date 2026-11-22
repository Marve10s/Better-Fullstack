/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Changeloglatestrelease2Inputs */



/**
* | output |
* | --- |
* | "Latest release" |
*
* @param {Changeloglatestrelease2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const changeloglatestrelease2 = /** @type {((inputs?: Changeloglatestrelease2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changeloglatestrelease2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Última versión")
	if (locale === "zh") return /** @type {LocalizedString} */ ("最新版本")
	if (locale === "ja") return /** @type {LocalizedString} */ ("最新リリース")
	if (locale === "ko") return /** @type {LocalizedString} */ ("최신 릴리스")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("最新版本")
	if (locale === "de") return /** @type {LocalizedString} */ ("Neueste Veröffentlichung")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Dernière version")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Останній випуск")
	return /** @type {LocalizedString} */ ("Latest release")
});
export { changeloglatestrelease2 as "changelogLatestRelease" }