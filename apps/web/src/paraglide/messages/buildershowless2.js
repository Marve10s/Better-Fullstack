/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildershowless2Inputs */



/**
* | output |
* | --- |
* | "Show less" |
*
* @param {Buildershowless2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildershowless2 = /** @type {((inputs?: Buildershowless2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildershowless2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Mostrar menos")
	if (locale === "zh") return /** @type {LocalizedString} */ ("收起")
	if (locale === "ja") return /** @type {LocalizedString} */ ("折りたたむ")
	if (locale === "ko") return /** @type {LocalizedString} */ ("접기")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("收起")
	if (locale === "de") return /** @type {LocalizedString} */ ("Weniger anzeigen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Afficher moins")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Показати менше")
	return /** @type {LocalizedString} */ ("Show less")
});
export { buildershowless2 as "builderShowLess" }