/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ file: NonNullable<unknown> }} Mcppasteinto2Inputs */



/**
* | output |
* | --- |
* | "paste into {file}" |
*
* @param {Mcppasteinto2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const mcppasteinto2 = /** @type {((inputs: Mcppasteinto2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcppasteinto2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((i, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ (`pegar en ${i?.file}`)
	if (locale === "zh") return /** @type {LocalizedString} */ (`粘贴到 ${i?.file}`)
	if (locale === "ja") return /** @type {LocalizedString} */ (`${i?.file} に貼り付けます`)
	if (locale === "ko") return /** @type {LocalizedString} */ (`${i?.file}에 붙여넣기`)
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ (`貼到 ${i?.file}`)
	if (locale === "de") return /** @type {LocalizedString} */ (`Einfügen in ${i?.file}`)
	if (locale === "fr") return /** @type {LocalizedString} */ (`coller dans ${i?.file}`)
	if (locale === "uk") return /** @type {LocalizedString} */ (`вставте в ${i?.file}`)
	return /** @type {LocalizedString} */ (`paste into ${i?.file}`)
});
export { mcppasteinto2 as "mcpPasteInto" }