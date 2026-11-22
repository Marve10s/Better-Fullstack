/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderastrointegration2Inputs */



/**
* | output |
* | --- |
* | "Astro Integration" |
*
* @param {Builderastrointegration2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderastrointegration2 = /** @type {((inputs?: Builderastrointegration2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderastrointegration2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Integración de Astro")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Astro 集成")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Astro 統合")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Astro 통합")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Astro 集成")
	if (locale === "de") return /** @type {LocalizedString} */ ("Astro Integration")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Intégration Astro")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Інтеграція Astro")
	return /** @type {LocalizedString} */ ("Astro Integration")
});
export { builderastrointegration2 as "builderAstroIntegration" }