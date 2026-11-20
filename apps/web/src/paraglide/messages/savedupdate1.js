/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Savedupdate1Inputs */



/**
* | output |
* | --- |
* | "Update" |
*
* @param {Savedupdate1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const savedupdate1 = /** @type {((inputs?: Savedupdate1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Savedupdate1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Actualizar")
	if (locale === "zh") return /** @type {LocalizedString} */ ("更新")
	if (locale === "ja") return /** @type {LocalizedString} */ ("アップデート")
	if (locale === "ko") return /** @type {LocalizedString} */ ("업데이트")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("更新")
	if (locale === "de") return /** @type {LocalizedString} */ ("Aktualisieren")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Mise à jour")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Оновити")
	return /** @type {LocalizedString} */ ("Update")
});
export { savedupdate1 as "savedUpdate" }