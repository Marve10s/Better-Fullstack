/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Changelogrelease20261001highlightframework3Inputs */



/**
* | output |
* | --- |
* | "Pick SolidStart or TanStack Start" |
*
* @param {Changelogrelease20261001highlightframework3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const changelogrelease20261001highlightframework3 = /** @type {((inputs?: Changelogrelease20261001highlightframework3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changelogrelease20261001highlightframework3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Elige SolidStart o TanStack Start")
	if (locale === "zh") return /** @type {LocalizedString} */ ("选择 SolidStart 或 TanStack Start")
	if (locale === "ja") return /** @type {LocalizedString} */ ("SolidStart か TanStack Start を選択")
	if (locale === "ko") return /** @type {LocalizedString} */ ("SolidStart 또는 TanStack Start 선택")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("選擇 SolidStart 或 TanStack Start")
	if (locale === "de") return /** @type {LocalizedString} */ ("SolidStart oder TanStack Start wählen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Choisissez SolidStart ou TanStack Start")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Оберіть SolidStart або TanStack Start")
	return /** @type {LocalizedString} */ ("Pick SolidStart or TanStack Start")
});
export { changelogrelease20261001highlightframework3 as "changelogRelease20261001HighlightFramework" }