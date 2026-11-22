/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homestartershapefullstack3Inputs */



/**
* | output |
* | --- |
* | "Full stack" |
*
* @param {Homestartershapefullstack3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homestartershapefullstack3 = /** @type {((inputs?: Homestartershapefullstack3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homestartershapefullstack3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Full stack")
	if (locale === "zh") return /** @type {LocalizedString} */ ("全栈")
	if (locale === "ja") return /** @type {LocalizedString} */ ("フルスタック")
	if (locale === "ko") return /** @type {LocalizedString} */ ("풀스택")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("全端")
	if (locale === "de") return /** @type {LocalizedString} */ ("Full Stack")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Full stack")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Full stack")
	return /** @type {LocalizedString} */ ("Full stack")
});
export { homestartershapefullstack3 as "homeStarterShapeFullstack" }