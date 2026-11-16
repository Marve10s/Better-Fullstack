/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Savedviewfullstack3Inputs */



/**
* | output |
* | --- |
* | "View Full Stack" |
*
* @param {Savedviewfullstack3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const savedviewfullstack3 = /** @type {((inputs?: Savedviewfullstack3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Savedviewfullstack3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Ver stack completo")
	if (locale === "zh") return /** @type {LocalizedString} */ ("查看完整 Stack")
	if (locale === "ja") return /** @type {LocalizedString} */ ("フルスタックを表示")
	if (locale === "ko") return /** @type {LocalizedString} */ ("전체 스택 보기")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("看完整 Stack")
	if (locale === "de") return /** @type {LocalizedString} */ ("Vollständigen Stack anzeigen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Voir la pile complète")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Переглянути фулстек")
	return /** @type {LocalizedString} */ ("View Full Stack")
});
export { savedviewfullstack3 as "savedViewFullStack" }