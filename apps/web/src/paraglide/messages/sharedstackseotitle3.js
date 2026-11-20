/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Sharedstackseotitle3Inputs */



/**
* | output |
* | --- |
* | "Shared Stack \| Better Fullstack" |
*
* @param {Sharedstackseotitle3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const sharedstackseotitle3 = /** @type {((inputs?: Sharedstackseotitle3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sharedstackseotitle3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Stack compartido | Better Fullstack")
	if (locale === "zh") return /** @type {LocalizedString} */ ("共享 Stack | Better Fullstack")
	if (locale === "ja") return /** @type {LocalizedString} */ ("共有スタック | Better Fullstack")
	if (locale === "ko") return /** @type {LocalizedString} */ ("공유 스택 | Better Fullstack")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("共享 Stack | Better Fullstack")
	if (locale === "de") return /** @type {LocalizedString} */ ("Geteilter Stack | Better Fullstack")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Pile partagée | Better Fullstack")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Спільний стек | Better Fullstack")
	return /** @type {LocalizedString} */ ("Shared Stack | Better Fullstack")
});
export { sharedstackseotitle3 as "sharedStackSeoTitle" }