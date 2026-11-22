/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Changeloglatestupdate2Inputs */



/**
* | output |
* | --- |
* | "Latest update" |
*
* @param {Changeloglatestupdate2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const changeloglatestupdate2 = /** @type {((inputs?: Changeloglatestupdate2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changeloglatestupdate2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Última actualización")
	if (locale === "zh") return /** @type {LocalizedString} */ ("最新更新")
	if (locale === "ja") return /** @type {LocalizedString} */ ("最新のアップデート")
	if (locale === "ko") return /** @type {LocalizedString} */ ("최신 업데이트")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("最新更新")
	if (locale === "de") return /** @type {LocalizedString} */ ("Neuestes Update")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Dernière mise à jour")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Останнє оновлення")
	return /** @type {LocalizedString} */ ("Latest update")
});
export { changeloglatestupdate2 as "changelogLatestUpdate" }