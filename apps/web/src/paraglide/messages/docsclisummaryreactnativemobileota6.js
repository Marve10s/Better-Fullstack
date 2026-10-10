/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryreactnativemobileota6Inputs */

const en_docsclisummaryreactnativemobileota6 = /** @type {(inputs: Docsclisummaryreactnativemobileota6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Over-the-air updates.`)
};

const es_docsclisummaryreactnativemobileota6 = /** @type {(inputs: Docsclisummaryreactnativemobileota6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Actualizaciones remotas.`)
};

const zh_docsclisummaryreactnativemobileota6 = /** @type {(inputs: Docsclisummaryreactnativemobileota6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`OTA 热更新。`)
};

const ja_docsclisummaryreactnativemobileota6 = /** @type {(inputs: Docsclisummaryreactnativemobileota6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`OTA アップデート。`)
};

const ko_docsclisummaryreactnativemobileota6 = /** @type {(inputs: Docsclisummaryreactnativemobileota6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`OTA 업데이트.`)
};

const zh_hant1_docsclisummaryreactnativemobileota6 = /** @type {(inputs: Docsclisummaryreactnativemobileota6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`OTA 更新。`)
};

const de_docsclisummaryreactnativemobileota6 = /** @type {(inputs: Docsclisummaryreactnativemobileota6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Updates aus der Ferne.`)
};

const fr_docsclisummaryreactnativemobileota6 = /** @type {(inputs: Docsclisummaryreactnativemobileota6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Mises à jour à distance.`)
};

const uk_docsclisummaryreactnativemobileota6 = /** @type {(inputs: Docsclisummaryreactnativemobileota6Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Дистанційні оновлення.`)
};

/**
* | output |
* | --- |
* | "Over-the-air updates." |
*
* @param {Docsclisummaryreactnativemobileota6Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryreactnativemobileota6 = /** @type {((inputs?: Docsclisummaryreactnativemobileota6Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryreactnativemobileota6Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryreactnativemobileota6(inputs)
	if (locale === "zh") return zh_docsclisummaryreactnativemobileota6(inputs)
	if (locale === "ja") return ja_docsclisummaryreactnativemobileota6(inputs)
	if (locale === "ko") return ko_docsclisummaryreactnativemobileota6(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryreactnativemobileota6(inputs)
	if (locale === "de") return de_docsclisummaryreactnativemobileota6(inputs)
	if (locale === "fr") return fr_docsclisummaryreactnativemobileota6(inputs)
	if (locale === "uk") return uk_docsclisummaryreactnativemobileota6(inputs)
	return en_docsclisummaryreactnativemobileota6(inputs)
});
export { docsclisummaryreactnativemobileota6 as "docsCliSummaryReactNativeMobileOta" }