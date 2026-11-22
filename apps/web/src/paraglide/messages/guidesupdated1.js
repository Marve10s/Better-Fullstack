/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ date: NonNullable<unknown> }} Guidesupdated1Inputs */



/**
* | output |
* | --- |
* | "Updated {date}" |
*
* @param {Guidesupdated1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const guidesupdated1 = /** @type {((inputs: Guidesupdated1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Guidesupdated1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((i, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ (`Actualizado ${i?.date}`)
	if (locale === "zh") return /** @type {LocalizedString} */ (`更新于 ${i?.date}`)
	if (locale === "ja") return /** @type {LocalizedString} */ (`${i?.date} を更新しました`)
	if (locale === "ko") return /** @type {LocalizedString} */ (`${i?.date} 업데이트됨`)
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ (`更新於 ${i?.date}`)
	if (locale === "de") return /** @type {LocalizedString} */ (`Aktualisiert ${i?.date}`)
	if (locale === "fr") return /** @type {LocalizedString} */ (`Mis à jour le ${i?.date}`)
	if (locale === "uk") return /** @type {LocalizedString} */ (`Оновлено ${i?.date}`)
	return /** @type {LocalizedString} */ (`Updated ${i?.date}`)
});
export { guidesupdated1 as "guidesUpdated" }