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

const ja_comparepaymentintegrations2 = /** @type {(inputs: Comparepaymentintegrations2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`支払いの統合`)
};

const ko_comparepaymentintegrations2 = /** @type {(inputs: Comparepaymentintegrations2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`결제 통합`)
};

const zh_hant1_comparepaymentintegrations2 = /** @type {(inputs: Comparepaymentintegrations2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`支付集成`)
};

const de_comparepaymentintegrations2 = /** @type {(inputs: Comparepaymentintegrations2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Zahlungsintegrationen`)
};

const fr_comparepaymentintegrations2 = /** @type {(inputs: Comparepaymentintegrations2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Intégrations de paiement`)
};

/**
* | output |
* | --- |
* | "Payment integrations" |
*
* @param {Comparepaymentintegrations2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const comparepaymentintegrations2 = /** @type {((inputs?: Comparepaymentintegrations2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comparepaymentintegrations2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_comparepaymentintegrations2(inputs)
	if (locale === "es") return es_comparepaymentintegrations2(inputs)
	if (locale === "zh") return zh_comparepaymentintegrations2(inputs)
	if (locale === "ja") return ja_comparepaymentintegrations2(inputs)
	if (locale === "ko") return ko_comparepaymentintegrations2(inputs)
	if (locale === "zh-Hant") return zh_hant1_comparepaymentintegrations2(inputs)
	if (locale === "de") return de_comparepaymentintegrations2(inputs)
	return fr_comparepaymentintegrations2(inputs)
});
export { comparepaymentintegrations2 as "comparePaymentIntegrations" }