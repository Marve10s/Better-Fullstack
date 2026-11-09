/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Comparegroupfrontend2Inputs */



/**
* | output |
* | --- |
* | "Frontend" |
*
* @param {Comparegroupfrontend2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const comparegroupfrontend2 = /** @type {((inputs?: Comparegroupfrontend2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comparegroupfrontend2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Frontend")
	if (locale === "zh") return /** @type {LocalizedString} */ ("前端")
	if (locale === "ja") return /** @type {LocalizedString} */ ("フロントエンド")
	if (locale === "ko") return /** @type {LocalizedString} */ ("프런트엔드")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("前端")
	if (locale === "de") return /** @type {LocalizedString} */ ("Frontend")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Frontend")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Фронтенд")
	return /** @type {LocalizedString} */ ("Frontend")
});
export { comparegroupfrontend2 as "compareGroupFrontend" }