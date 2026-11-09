/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navupdates1Inputs */



/**
* | output |
* | --- |
* | "Updates" |
*
* @param {Navupdates1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const navupdates1 = /** @type {((inputs?: Navupdates1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navupdates1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Novedades")
	if (locale === "zh") return /** @type {LocalizedString} */ ("更新")
	if (locale === "ja") return /** @type {LocalizedString} */ ("アップデート")
	if (locale === "ko") return /** @type {LocalizedString} */ ("업데이트")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("更新")
	if (locale === "de") return /** @type {LocalizedString} */ ("Updates")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Nouveautés")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Оновлення")
	return /** @type {LocalizedString} */ ("Updates")
});
export { navupdates1 as "navUpdates" }