/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummaryreactnativemobiledeeplinking7Inputs */

const en_docsclisummaryreactnativemobiledeeplinking7 = /** @type {(inputs: Docsclisummaryreactnativemobiledeeplinking7Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Deep linking.`)
};

const es_docsclisummaryreactnativemobiledeeplinking7 = /** @type {(inputs: Docsclisummaryreactnativemobiledeeplinking7Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Enlaces profundos.`)
};

const zh_docsclisummaryreactnativemobiledeeplinking7 = /** @type {(inputs: Docsclisummaryreactnativemobiledeeplinking7Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`深度链接。`)
};

const ja_docsclisummaryreactnativemobiledeeplinking7 = /** @type {(inputs: Docsclisummaryreactnativemobiledeeplinking7Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ディープリンク。`)
};

const ko_docsclisummaryreactnativemobiledeeplinking7 = /** @type {(inputs: Docsclisummaryreactnativemobiledeeplinking7Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`딥 링크.`)
};

const zh_hant1_docsclisummaryreactnativemobiledeeplinking7 = /** @type {(inputs: Docsclisummaryreactnativemobiledeeplinking7Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`深層連結。`)
};

const de_docsclisummaryreactnativemobiledeeplinking7 = /** @type {(inputs: Docsclisummaryreactnativemobiledeeplinking7Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Deep-Linking.`)
};

const fr_docsclisummaryreactnativemobiledeeplinking7 = /** @type {(inputs: Docsclisummaryreactnativemobiledeeplinking7Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Liens profonds.`)
};

const uk_docsclisummaryreactnativemobiledeeplinking7 = /** @type {(inputs: Docsclisummaryreactnativemobiledeeplinking7Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Глибокі посилання.`)
};

/**
* | output |
* | --- |
* | "Deep linking." |
*
* @param {Docsclisummaryreactnativemobiledeeplinking7Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummaryreactnativemobiledeeplinking7 = /** @type {((inputs?: Docsclisummaryreactnativemobiledeeplinking7Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummaryreactnativemobiledeeplinking7Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsclisummaryreactnativemobiledeeplinking7(inputs)
	if (locale === "zh") return zh_docsclisummaryreactnativemobiledeeplinking7(inputs)
	if (locale === "ja") return ja_docsclisummaryreactnativemobiledeeplinking7(inputs)
	if (locale === "ko") return ko_docsclisummaryreactnativemobiledeeplinking7(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsclisummaryreactnativemobiledeeplinking7(inputs)
	if (locale === "de") return de_docsclisummaryreactnativemobiledeeplinking7(inputs)
	if (locale === "fr") return fr_docsclisummaryreactnativemobiledeeplinking7(inputs)
	if (locale === "uk") return uk_docsclisummaryreactnativemobiledeeplinking7(inputs)
	return en_docsclisummaryreactnativemobiledeeplinking7(inputs)
});
export { docsclisummaryreactnativemobiledeeplinking7 as "docsCliSummaryReactNativeMobileDeepLinking" }