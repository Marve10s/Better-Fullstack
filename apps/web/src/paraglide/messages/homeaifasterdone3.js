/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homeaifasterdone3Inputs */



/**
* | output |
* | --- |
* | "faster to a finished project" |
*
* @param {Homeaifasterdone3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const homeaifasterdone3 = /** @type {((inputs?: Homeaifasterdone3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homeaifasterdone3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("más rápido hasta un proyecto terminado")
	if (locale === "zh") return /** @type {LocalizedString} */ ("更快得到完成的项目")
	if (locale === "ja") return /** @type {LocalizedString} */ ("完成までが速くなる")
	if (locale === "ko") return /** @type {LocalizedString} */ ("완성까지 더 빠르게")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("更快得到完成的專案")
	if (locale === "de") return /** @type {LocalizedString} */ ("schneller zum fertigen Projekt")
	if (locale === "fr") return /** @type {LocalizedString} */ ("plus vite jusqu'au projet terminé")
	if (locale === "uk") return /** @type {LocalizedString} */ ("швидше до готового проєкту")
	return /** @type {LocalizedString} */ ("faster to a finished project")
});
export { homeaifasterdone3 as "homeAiFasterDone" }