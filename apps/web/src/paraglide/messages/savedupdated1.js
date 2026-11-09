/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Savedupdated1Inputs */



/**
* | output |
* | --- |
* | "Updated" |
*
* @param {Savedupdated1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const savedupdated1 = /** @type {((inputs?: Savedupdated1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Savedupdated1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Actualizado")
	if (locale === "zh") return /** @type {LocalizedString} */ ("已更新")
	if (locale === "ja") return /** @type {LocalizedString} */ ("更新されました")
	if (locale === "ko") return /** @type {LocalizedString} */ ("업데이트됨")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("已更新")
	if (locale === "de") return /** @type {LocalizedString} */ ("Aktualisiert")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Mis à jour")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Оновлено")
	return /** @type {LocalizedString} */ ("Updated")
});
export { savedupdated1 as "savedUpdated" }