/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Changelogrelease20261001title2Inputs */



/**
* | output |
* | --- |
* | "Future Stack preset" |
*
* @param {Changelogrelease20261001title2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const changelogrelease20261001title2 = /** @type {((inputs?: Changelogrelease20261001title2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changelogrelease20261001title2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Nueva plantilla: Future Stack")
	if (locale === "zh") return /** @type {LocalizedString} */ ("全新预设：Future Stack")
	if (locale === "ja") return /** @type {LocalizedString} */ ("新しいプリセット: Future Stack")
	if (locale === "ko") return /** @type {LocalizedString} */ ("새 사전 설정: Future Stack")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("全新預設：Future Stack")
	if (locale === "de") return /** @type {LocalizedString} */ ("Neue Voreinstellung: Future Stack")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Nouveau préréglage : Future Stack")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Новий пресет: Future Stack")
	return /** @type {LocalizedString} */ ("Future Stack preset")
});
export { changelogrelease20261001title2 as "changelogRelease20261001Title" }