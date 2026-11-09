/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presetfuturestacktanstackstart5Inputs */



/**
* | output |
* | --- |
* | "TanStack Start on Solid, with TanStack Router end to end" |
*
* @param {Presetfuturestacktanstackstart5Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const presetfuturestacktanstackstart5 = /** @type {((inputs?: Presetfuturestacktanstackstart5Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presetfuturestacktanstackstart5Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("TanStack Start sobre Solid, con TanStack Router de principio a fin")
	if (locale === "zh") return /** @type {LocalizedString} */ ("基于 Solid 的 TanStack Start，全程使用 TanStack Router")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Solid 上の TanStack Start、TanStack Router で一貫")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Solid 기반 TanStack Start, 처음부터 끝까지 TanStack Router")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("基於 Solid 的 TanStack Start，全程使用 TanStack Router")
	if (locale === "de") return /** @type {LocalizedString} */ ("TanStack Start auf Solid, durchgehend mit TanStack Router")
	if (locale === "fr") return /** @type {LocalizedString} */ ("TanStack Start sur Solid, avec TanStack Router de bout en bout")
	if (locale === "uk") return /** @type {LocalizedString} */ ("TanStack Start на Solid із TanStack Router від початку до кінця")
	return /** @type {LocalizedString} */ ("TanStack Start on Solid, with TanStack Router end to end")
});
export { presetfuturestacktanstackstart5 as "presetFutureStackTanStackStart" }