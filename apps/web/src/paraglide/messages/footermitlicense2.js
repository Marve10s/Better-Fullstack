/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Footermitlicense2Inputs */



/**
* | output |
* | --- |
* | "MIT License" |
*
* @param {Footermitlicense2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const footermitlicense2 = /** @type {((inputs?: Footermitlicense2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Footermitlicense2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Licencia MIT")
	if (locale === "zh") return /** @type {LocalizedString} */ ("MIT 许可证")
	if (locale === "ja") return /** @type {LocalizedString} */ ("MITライセンス")
	if (locale === "ko") return /** @type {LocalizedString} */ ("MIT 라이센스")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("MIT 許可證")
	if (locale === "de") return /** @type {LocalizedString} */ ("MIT-Lizenz")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Licence MIT")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Ліцензія MIT")
	return /** @type {LocalizedString} */ ("MIT License")
});
export { footermitlicense2 as "footerMitLicense" }