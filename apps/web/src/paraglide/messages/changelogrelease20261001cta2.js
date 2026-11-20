/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Changelogrelease20261001cta2Inputs */



/**
* | output |
* | --- |
* | "Open Future Stack" |
*
* @param {Changelogrelease20261001cta2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const changelogrelease20261001cta2 = /** @type {((inputs?: Changelogrelease20261001cta2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changelogrelease20261001cta2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Abrir Future Stack")
	if (locale === "zh") return /** @type {LocalizedString} */ ("打开 Future Stack")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Future Stack を開く")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Future Stack 열기")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("開啟 Future Stack")
	if (locale === "de") return /** @type {LocalizedString} */ ("Future Stack öffnen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Ouvrir Future Stack")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Відкрити Future Stack")
	return /** @type {LocalizedString} */ ("Open Future Stack")
});
export { changelogrelease20261001cta2 as "changelogRelease20261001Cta" }