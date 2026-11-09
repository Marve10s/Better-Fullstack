/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Comparemonorepo1Inputs */



/**
* | output |
* | --- |
* | "Monorepo (Turborepo)" |
*
* @param {Comparemonorepo1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const comparemonorepo1 = /** @type {((inputs?: Comparemonorepo1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comparemonorepo1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Monorepo (Turborepo)")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Monorepo（Turborepo）")
	if (locale === "ja") return /** @type {LocalizedString} */ ("モノレポ (Turborepo)")
	if (locale === "ko") return /** @type {LocalizedString} */ ("모노레포(터보레포)")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Monorepo（Turborepo）")
	if (locale === "de") return /** @type {LocalizedString} */ ("Monorepo (Turborepo)")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Monorepo (Turborepo)")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Монорепо (Turborepo)")
	return /** @type {LocalizedString} */ ("Monorepo (Turborepo)")
});
export { comparemonorepo1 as "compareMonorepo" }