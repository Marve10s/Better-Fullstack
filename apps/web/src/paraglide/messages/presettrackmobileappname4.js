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

/**
* | output |
* | --- |
* | "Mobile App" |
*
* @param {Presettrackmobileappname4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const presettrackmobileappname4 = /** @type {((inputs?: Presettrackmobileappname4Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presettrackmobileappname4Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_presettrackmobileappname4(inputs)
	if (locale === "es") return es_presettrackmobileappname4(inputs)
	return zh_presettrackmobileappname4(inputs)
});
export { presettrackmobileappname4 as "presetTrackMobileAppName" }