/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Changelogrelease20261001highlightpreset3Inputs */



/**
* | output |
* | --- |
* | "Solid, Effect, and TanStack in one preset" |
*
* @param {Changelogrelease20261001highlightpreset3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const changelogrelease20261001highlightpreset3 = /** @type {((inputs?: Changelogrelease20261001highlightpreset3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changelogrelease20261001highlightpreset3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Solid, Effect y TanStack en una sola plantilla")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Solid、Effect 和 TanStack 集于一个预设")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Solid、Effect、TanStack を1つのプリセットに")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Solid, Effect, TanStack을 하나의 사전 설정으로")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Solid、Effect 與 TanStack 集結於一個預設")
	if (locale === "de") return /** @type {LocalizedString} */ ("Solid, Effect und TanStack in einer Voreinstellung")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Solid, Effect et TanStack dans un seul préréglage")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Solid, Effect і TanStack в одному пресеті")
	return /** @type {LocalizedString} */ ("Solid, Effect, and TanStack in one preset")
});
export { changelogrelease20261001highlightpreset3 as "changelogRelease20261001HighlightPreset" }