/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Footerchangelog1Inputs */



/**
* | output |
* | --- |
* | "Changelog" |
*
* @param {Footerchangelog1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const footerchangelog1 = /** @type {((inputs?: Footerchangelog1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Footerchangelog1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Changelog")
	if (locale === "zh") return /** @type {LocalizedString} */ ("更新日志")
	if (locale === "ja") return /** @type {LocalizedString} */ ("変更履歴")
	if (locale === "ko") return /** @type {LocalizedString} */ ("변경 내역")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("更新日誌")
	if (locale === "de") return /** @type {LocalizedString} */ ("Änderungsprotokoll")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Journal des modifications")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Журнал змін")
	return /** @type {LocalizedString} */ ("Changelog")
});
export { footerchangelog1 as "footerChangelog" }