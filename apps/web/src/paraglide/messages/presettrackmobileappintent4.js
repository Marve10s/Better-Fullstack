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

/**
* | output |
* | --- |
* | "Start native" |
*
* @param {Presettrackmobileappintent4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const presettrackmobileappintent4 = /** @type {((inputs?: Presettrackmobileappintent4Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presettrackmobileappintent4Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_presettrackmobileappintent4(inputs)
	if (locale === "es") return es_presettrackmobileappintent4(inputs)
	return zh_presettrackmobileappintent4(inputs)
});
export { presettrackmobileappintent4 as "presetTrackMobileAppIntent" }