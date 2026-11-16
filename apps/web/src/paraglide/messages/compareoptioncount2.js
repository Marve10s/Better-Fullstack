/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Compareoptioncount2Inputs */



/**
* | output |
* | --- |
* | "{count} options" |
*
* @param {Compareoptioncount2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const compareoptioncount2 = /** @type {((inputs: Compareoptioncount2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compareoptioncount2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((i, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ (`${i?.count} opciones`)
	if (locale === "zh") return /** @type {LocalizedString} */ (`${i?.count} 个选项`)
	if (locale === "ja") return /** @type {LocalizedString} */ (`${i?.count} オプション`)
	if (locale === "ko") return /** @type {LocalizedString} */ (`${i?.count} 옵션`)
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ (`${i?.count} 個選項`)
	if (locale === "de") return /** @type {LocalizedString} */ (`${i?.count} Optionen`)
	if (locale === "fr") return /** @type {LocalizedString} */ (`${i?.count} options`)
	if (locale === "uk") return /** @type {LocalizedString} */ (`${i?.count} опцій`)
	return /** @type {LocalizedString} */ (`${i?.count} options`)
});
export { compareoptioncount2 as "compareOptionCount" }