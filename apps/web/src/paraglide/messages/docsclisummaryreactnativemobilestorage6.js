/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryreactnativemobilestorage6Inputs */

const en_docsclisummaryreactnativemobilestorage6 = /** @type {(inputs: Docsclisummaryreactnativemobilestorage6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`On-device storage.`)
};

const es_docsclisummaryreactnativemobilestorage6 = /** @type {(inputs: Docsclisummaryreactnativemobilestorage6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Almacenamiento en el dispositivo.`)
};

const zh_docsclisummaryreactnativemobilestorage6 = /** @type {(inputs: Docsclisummaryreactnativemobilestorage6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`设备端存储。`)
};

const ja_docsclisummaryreactnativemobilestorage6 = /** @type {(inputs: Docsclisummaryreactnativemobilestorage6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`端末内ストレージ。`)
};

const ko_docsclisummaryreactnativemobilestorage6 = /** @type {(inputs: Docsclisummaryreactnativemobilestorage6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`기기 내 저장소.`)
};

const zh_hant1_docsclisummaryreactnativemobilestorage6 = /** @type {(inputs: Docsclisummaryreactnativemobilestorage6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`裝置端儲存。`)
};

const de_docsclisummaryreactnativemobilestorage6 = /** @type {(inputs: Docsclisummaryreactnativemobilestorage6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Speicher auf dem Gerät.`)
};

const fr_docsclisummaryreactnativemobilestorage6 = /** @type {(inputs: Docsclisummaryreactnativemobilestorage6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Stockage sur l’appareil.`)
};

const uk_docsclisummaryreactnativemobilestorage6 = /** @type {(inputs: Docsclisummaryreactnativemobilestorage6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Сховище на пристрої.`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryreactnativemobilestorage6(inputs)
	if (locale === "zh") return zh_docsclisummaryreactnativemobilestorage6(inputs)
	if (locale === "ja") return ja_docsclisummaryreactnativemobilestorage6(inputs)
	if (locale === "ko") return ko_docsclisummaryreactnativemobilestorage6(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryreactnativemobilestorage6(inputs)
	if (locale === "de") return de_docsclisummaryreactnativemobilestorage6(inputs)
	if (locale === "fr") return fr_docsclisummaryreactnativemobilestorage6(inputs)
	if (locale === "uk") return uk_docsclisummaryreactnativemobilestorage6(inputs)
	return en_docsclisummaryreactnativemobilestorage6(inputs)
});
export { docsclisummaryreactnativemobilestorage6 as "docsCliSummaryReactNativeMobileStorage" }