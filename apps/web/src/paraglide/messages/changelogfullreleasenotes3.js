/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Changelogfullreleasenotes3Inputs */



/**
* | output |
* | --- |
* | "Full release notes" |
*
* @param {Changelogfullreleasenotes3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const changelogfullreleasenotes3 = /** @type {((inputs?: Changelogfullreleasenotes3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changelogfullreleasenotes3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Notas completas de la versión")
	if (locale === "zh") return /** @type {LocalizedString} */ ("完整发布说明")
	if (locale === "ja") return /** @type {LocalizedString} */ ("完全なリリースノート")
	if (locale === "ko") return /** @type {LocalizedString} */ ("전체 릴리스 노트")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("完整發布說明")
	if (locale === "de") return /** @type {LocalizedString} */ ("Vollständige Versionshinweise")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Notes de version complètes")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Повні нотатки до релізу")
	return /** @type {LocalizedString} */ ("Full release notes")
});
export { changelogfullreleasenotes3 as "changelogFullReleaseNotes" }