/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryreactnativemobilestorage6Inputs */



/**
* | output |
* | --- |
* | "On-device storage." |
*
* @param {Docsclisummaryreactnativemobilestorage6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryreactnativemobilestorage6 = /** @type {((inputs?: Docsclisummaryreactnativemobilestorage6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryreactnativemobilestorage6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Almacenamiento en el dispositivo.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("设备端存储。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("端末内ストレージ。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("기기 내 저장소.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("裝置端儲存。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Speicher auf dem Gerät.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Stockage sur l’appareil.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Сховище на пристрої.")
	return /** @type {LocalizedString} */ ("On-device storage.")
});
export { docsclisummaryreactnativemobilestorage6 as "docsCliSummaryReactNativeMobileStorage" }