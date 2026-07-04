/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presettrackmobileappname4Inputs */

const en_presettrackmobileappname4 = /** @type {(inputs: Presettrackmobileappname4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Mobile App`)
};

const es_presettrackmobileappname4 = /** @type {(inputs: Presettrackmobileappname4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`App móvil`)
};

const zh_presettrackmobileappname4 = /** @type {(inputs: Presettrackmobileappname4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`移动应用`)
};

const ja_presettrackmobileappname4 = /** @type {(inputs: Presettrackmobileappname4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`モバイルアプリ`)
};

const ko_presettrackmobileappname4 = /** @type {(inputs: Presettrackmobileappname4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`모바일 앱`)
};

const zh_hant1_presettrackmobileappname4 = /** @type {(inputs: Presettrackmobileappname4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`行動應用`)
};

const de_presettrackmobileappname4 = /** @type {(inputs: Presettrackmobileappname4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Mobile App`)
};

const fr_presettrackmobileappname4 = /** @type {(inputs: Presettrackmobileappname4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Application mobile`)
};

/**
* | output |
* | --- |
* | "Mobile App" |
*
* @param {Presettrackmobileappname4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const presettrackmobileappname4 = /** @type {((inputs?: Presettrackmobileappname4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presettrackmobileappname4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_presettrackmobileappname4(inputs)
	if (locale === "es") return es_presettrackmobileappname4(inputs)
	if (locale === "zh") return zh_presettrackmobileappname4(inputs)
	if (locale === "ja") return ja_presettrackmobileappname4(inputs)
	if (locale === "ko") return ko_presettrackmobileappname4(inputs)
	if (locale === "zh-Hant") return zh_hant1_presettrackmobileappname4(inputs)
	if (locale === "de") return de_presettrackmobileappname4(inputs)
	return fr_presettrackmobileappname4(inputs)
});
export { presettrackmobileappname4 as "presetTrackMobileAppName" }