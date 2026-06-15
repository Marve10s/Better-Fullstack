/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Comparegroupauthpaymentsai4Inputs */

const en_comparegroupauthpaymentsai4 = /** @type {(inputs: Comparegroupauthpaymentsai4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Auth, Payments & AI`)
};

const es_comparegroupauthpaymentsai4 = /** @type {(inputs: Comparegroupauthpaymentsai4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Auth, pagos e IA`)
};

const zh_comparegroupauthpaymentsai4 = /** @type {(inputs: Comparegroupauthpaymentsai4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`认证、支付与 AI`)
};

/**
* | output |
* | --- |
* | "Auth, Payments & AI" |
*
* @param {Comparegroupauthpaymentsai4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const comparegroupauthpaymentsai4 = /** @type {((inputs?: Comparegroupauthpaymentsai4Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comparegroupauthpaymentsai4Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_comparegroupauthpaymentsai4(inputs)
	if (locale === "es") return es_comparegroupauthpaymentsai4(inputs)
	return zh_comparegroupauthpaymentsai4(inputs)
});
export { comparegroupauthpaymentsai4 as "compareGroupAuthPaymentsAi" }