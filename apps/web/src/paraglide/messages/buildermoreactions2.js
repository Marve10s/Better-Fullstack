/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildermoreactions2Inputs */



/**
* | output |
* | --- |
* | "More actions" |
*
* @param {Buildermoreactions2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildermoreactions2 = /** @type {((inputs?: Buildermoreactions2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildermoreactions2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Más acciones")
	if (locale === "zh") return /** @type {LocalizedString} */ ("更多操作")
	if (locale === "ja") return /** @type {LocalizedString} */ ("その他のアクション")
	if (locale === "ko") return /** @type {LocalizedString} */ ("추가 작업")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("更多操作")
	if (locale === "de") return /** @type {LocalizedString} */ ("Weitere Aktionen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Plus d'actions")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Більше дій")
	return /** @type {LocalizedString} */ ("More actions")
});
export { buildermoreactions2 as "builderMoreActions" }