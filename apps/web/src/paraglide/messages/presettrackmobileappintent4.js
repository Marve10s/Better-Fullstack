/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presettrackmobileappintent4Inputs */

const en_presettrackmobileappintent4 = /** @type {(inputs: Presettrackmobileappintent4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Start native`)
};

const es_presettrackmobileappintent4 = /** @type {(inputs: Presettrackmobileappintent4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Empezar nativo`)
};

const zh_presettrackmobileappintent4 = /** @type {(inputs: Presettrackmobileappintent4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`从原生开始`)
};

const ja_presettrackmobileappintent4 = /** @type {(inputs: Presettrackmobileappintent4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ネイティブを始める`)
};

const ko_presettrackmobileappintent4 = /** @type {(inputs: Presettrackmobileappintent4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`네이티브 시작`)
};

const zh_hant1_presettrackmobileappintent4 = /** @type {(inputs: Presettrackmobileappintent4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`從原生開始`)
};

const de_presettrackmobileappintent4 = /** @type {(inputs: Presettrackmobileappintent4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Beginnen Sie nativ`)
};

const fr_presettrackmobileappintent4 = /** @type {(inputs: Presettrackmobileappintent4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Commencer en mode natif`)
};

/**
* | output |
* | --- |
* | "Start native" |
*
* @param {Presettrackmobileappintent4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const presettrackmobileappintent4 = /** @type {((inputs?: Presettrackmobileappintent4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presettrackmobileappintent4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_presettrackmobileappintent4(inputs)
	if (locale === "es") return es_presettrackmobileappintent4(inputs)
	if (locale === "zh") return zh_presettrackmobileappintent4(inputs)
	if (locale === "ja") return ja_presettrackmobileappintent4(inputs)
	if (locale === "ko") return ko_presettrackmobileappintent4(inputs)
	if (locale === "zh-Hant") return zh_hant1_presettrackmobileappintent4(inputs)
	if (locale === "de") return de_presettrackmobileappintent4(inputs)
	return fr_presettrackmobileappintent4(inputs)
});
export { presettrackmobileappintent4 as "presetTrackMobileAppIntent" }