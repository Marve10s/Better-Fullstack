/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderstepfinalize2Inputs */



/**
* | output |
* | --- |
* | "Finalize" |
*
* @param {Builderstepfinalize2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderstepfinalize2 = /** @type {((inputs?: Builderstepfinalize2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderstepfinalize2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Finalizar")
	if (locale === "zh") return /** @type {LocalizedString} */ ("完成")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ファイナライズ")
	if (locale === "ko") return /** @type {LocalizedString} */ ("마무리")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("完成")
	if (locale === "de") return /** @type {LocalizedString} */ ("Abschließen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Finaliser")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Фіналізація")
	return /** @type {LocalizedString} */ ("Finalize")
});
export { builderstepfinalize2 as "builderStepFinalize" }