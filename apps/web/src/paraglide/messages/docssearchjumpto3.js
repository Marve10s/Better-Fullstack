/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docssearchjumpto3Inputs */



/**
* | output |
* | --- |
* | "Jump to" |
*
* @param {Docssearchjumpto3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docssearchjumpto3 = /** @type {((inputs?: Docssearchjumpto3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docssearchjumpto3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Ir a")
	if (locale === "zh") return /** @type {LocalizedString} */ ("跳转到")
	if (locale === "ja") return /** @type {LocalizedString} */ ("移動")
	if (locale === "ko") return /** @type {LocalizedString} */ ("이동")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("跳至")
	if (locale === "de") return /** @type {LocalizedString} */ ("Springen zu")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Aller à")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Перейти до")
	return /** @type {LocalizedString} */ ("Jump to")
});
export { docssearchjumpto3 as "docsSearchJumpTo" }