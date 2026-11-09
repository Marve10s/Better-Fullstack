/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposerconfigures2Inputs */



/**
* | output |
* | --- |
* | "Then choose" |
*
* @param {Buildercomposerconfigures2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposerconfigures2 = /** @type {((inputs?: Buildercomposerconfigures2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposerconfigures2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Luego elige")
	if (locale === "zh") return /** @type {LocalizedString} */ ("然后选择")
	if (locale === "ja") return /** @type {LocalizedString} */ ("次に選択")
	if (locale === "ko") return /** @type {LocalizedString} */ ("다음 선택")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("然後選擇")
	if (locale === "de") return /** @type {LocalizedString} */ ("Dann wählen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Puis choisissez")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Потім оберіть")
	return /** @type {LocalizedString} */ ("Then choose")
});
export { buildercomposerconfigures2 as "builderComposerConfigures" }