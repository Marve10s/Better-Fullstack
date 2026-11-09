/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ name: NonNullable<unknown> }} Builderwillsaveas3Inputs */



/**
* | output |
* | --- |
* | "Will be saved as: {name}" |
*
* @param {Builderwillsaveas3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderwillsaveas3 = /** @type {((inputs: Builderwillsaveas3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderwillsaveas3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((i, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ (`Se guardará como: ${i?.name}`)
	if (locale === "zh") return /** @type {LocalizedString} */ (`将保存为：${i?.name}`)
	if (locale === "ja") return /** @type {LocalizedString} */ (`${i?.name} として保存されます。`)
	if (locale === "ko") return /** @type {LocalizedString} */ (`다음 이름으로 저장됩니다: ${i?.name}`)
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ (`將儲存為：${i?.name}`)
	if (locale === "de") return /** @type {LocalizedString} */ (`Wird gespeichert als: ${i?.name}`)
	if (locale === "fr") return /** @type {LocalizedString} */ (`Sera enregistré sous : ${i?.name}`)
	if (locale === "uk") return /** @type {LocalizedString} */ (`Буде збережено як: ${i?.name}`)
	return /** @type {LocalizedString} */ (`Will be saved as: ${i?.name}`)
});
export { builderwillsaveas3 as "builderWillSaveAs" }