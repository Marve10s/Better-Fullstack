/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presettrackrestapiname4Inputs */

const en_presettrackrestapiname4 = /** @type {(inputs: Presettrackrestapiname4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`REST API`)
};

const es_presettrackrestapiname4 = /** @type {(inputs: Presettrackrestapiname4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`REST API`)
};

const zh_presettrackrestapiname4 = /** @type {(inputs: Presettrackrestapiname4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`REST API`)
};

/**
* | output |
* | --- |
* | "REST API" |
*
* @param {Presettrackrestapiname4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const presettrackrestapiname4 = /** @type {((inputs?: Presettrackrestapiname4Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presettrackrestapiname4Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_presettrackrestapiname4(inputs)
	if (locale === "es") return es_presettrackrestapiname4(inputs)
	return zh_presettrackrestapiname4(inputs)
});
export { presettrackrestapiname4 as "presetTrackRestApiName" }