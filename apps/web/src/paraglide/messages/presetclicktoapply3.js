/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presetclicktoapply3Inputs */



/**
* | output |
* | --- |
* | "Click to apply" |
*
* @param {Presetclicktoapply3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const presetclicktoapply3 = /** @type {((inputs?: Presetclicktoapply3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presetclicktoapply3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Haz clic para aplicar")
	if (locale === "zh") return /** @type {LocalizedString} */ ("点击应用")
	if (locale === "ja") return /** @type {LocalizedString} */ ("クリックして適用")
	if (locale === "ko") return /** @type {LocalizedString} */ ("적용하려면 클릭하세요")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("點擊應用")
	if (locale === "de") return /** @type {LocalizedString} */ ("Zum Anwenden klicken")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Cliquez pour appliquer")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Натисніть, щоб застосувати")
	return /** @type {LocalizedString} */ ("Click to apply")
});
export { presetclicktoapply3 as "presetClickToApply" }