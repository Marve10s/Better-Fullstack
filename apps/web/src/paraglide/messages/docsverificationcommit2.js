/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationcommit2Inputs */



/**
* | output |
* | --- |
* | "Commit" |
*
* @param {Docsverificationcommit2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationcommit2 = /** @type {((inputs?: Docsverificationcommit2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationcommit2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Commit")
	if (locale === "zh") return /** @type {LocalizedString} */ ("提交")
	if (locale === "ja") return /** @type {LocalizedString} */ ("コミット")
	if (locale === "ko") return /** @type {LocalizedString} */ ("커밋")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Commit")
	if (locale === "de") return /** @type {LocalizedString} */ ("Commit")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Commit")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Коміт")
	return /** @type {LocalizedString} */ ("Commit")
});
export { docsverificationcommit2 as "docsVerificationCommit" }