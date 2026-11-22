/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presettrackrestapiname4Inputs */



/**
* | output |
* | --- |
* | "REST API" |
*
* @param {Presettrackrestapiname4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const presettrackrestapiname4 = /** @type {((inputs?: Presettrackrestapiname4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presettrackrestapiname4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("REST API")
	if (locale === "zh") return /** @type {LocalizedString} */ ("REST API")
	if (locale === "ja") return /** @type {LocalizedString} */ ("REST API")
	if (locale === "ko") return /** @type {LocalizedString} */ ("REST API")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("REST API")
	if (locale === "de") return /** @type {LocalizedString} */ ("REST API")
	if (locale === "fr") return /** @type {LocalizedString} */ ("REST API")
	if (locale === "uk") return /** @type {LocalizedString} */ ("REST API")
	return /** @type {LocalizedString} */ ("REST API")
});
export { presettrackrestapiname4 as "presetTrackRestApiName" }