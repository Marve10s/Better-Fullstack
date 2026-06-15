/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presettracksaasintent3Inputs */

const en_presettracksaasintent3 = /** @type {(inputs: Presettracksaasintent3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sell subscriptions`)
};

const es_presettracksaasintent3 = /** @type {(inputs: Presettracksaasintent3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Vender suscripciones`)
};

const zh_presettracksaasintent3 = /** @type {(inputs: Presettracksaasintent3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`销售订阅`)
};

/**
* | output |
* | --- |
* | "Sell subscriptions" |
*
* @param {Presettracksaasintent3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const presettracksaasintent3 = /** @type {((inputs?: Presettracksaasintent3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presettracksaasintent3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_presettracksaasintent3(inputs)
	if (locale === "es") return es_presettracksaasintent3(inputs)
	return zh_presettracksaasintent3(inputs)
});
export { presettracksaasintent3 as "presetTrackSaasIntent" }