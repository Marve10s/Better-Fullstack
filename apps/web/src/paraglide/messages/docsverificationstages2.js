/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationstages2Inputs */



/**
* | output |
* | --- |
* | "Required stages" |
*
* @param {Docsverificationstages2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationstages2 = /** @type {((inputs?: Docsverificationstages2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationstages2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Etapas obligatorias")
	if (locale === "zh") return /** @type {LocalizedString} */ ("必需阶段")
	if (locale === "ja") return /** @type {LocalizedString} */ ("必須ステージ")
	if (locale === "ko") return /** @type {LocalizedString} */ ("필수 단계")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("必要階段")
	if (locale === "de") return /** @type {LocalizedString} */ ("Erforderliche Phasen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Étapes requises")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Обовʼязкові етапи")
	return /** @type {LocalizedString} */ ("Required stages")
});
export { docsverificationstages2 as "docsVerificationStages" }