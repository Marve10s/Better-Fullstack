/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Comparepaymentintegrations2Inputs */

const en_comparepaymentintegrations2 = /** @type {(inputs: Comparepaymentintegrations2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Payment integrations`)
};

const es_comparepaymentintegrations2 = /** @type {(inputs: Comparepaymentintegrations2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Integraciones de pago`)
};

const zh_comparepaymentintegrations2 = /** @type {(inputs: Comparepaymentintegrations2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`支付集成`)
};

/**
* | output |
* | --- |
* | "Payment integrations" |
*
* @param {Comparepaymentintegrations2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const comparepaymentintegrations2 = /** @type {((inputs?: Comparepaymentintegrations2Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comparepaymentintegrations2Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_comparepaymentintegrations2(inputs)
	if (locale === "es") return es_comparepaymentintegrations2(inputs)
	return zh_comparepaymentintegrations2(inputs)
});
export { comparepaymentintegrations2 as "comparePaymentIntegrations" }