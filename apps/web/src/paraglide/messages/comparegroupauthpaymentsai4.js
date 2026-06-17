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

const ja_comparegroupauthpaymentsai4 = /** @type {(inputs: Comparegroupauthpaymentsai4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`認証、支払い、AI`)
};

const ko_comparegroupauthpaymentsai4 = /** @type {(inputs: Comparegroupauthpaymentsai4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`인증, 결제 및 AI`)
};

const zh_hant1_comparegroupauthpaymentsai4 = /** @type {(inputs: Comparegroupauthpaymentsai4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`認證、付款與 AI`)
};

const de_comparegroupauthpaymentsai4 = /** @type {(inputs: Comparegroupauthpaymentsai4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Authentifizierung, Zahlungen und AI`)
};

const fr_comparegroupauthpaymentsai4 = /** @type {(inputs: Comparegroupauthpaymentsai4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Authentification, paiements et AI`)
};

/**
* | output |
* | --- |
* | "Auth, Payments & AI" |
*
* @param {Comparegroupauthpaymentsai4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const comparegroupauthpaymentsai4 = /** @type {((inputs?: Comparegroupauthpaymentsai4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comparegroupauthpaymentsai4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_comparegroupauthpaymentsai4(inputs)
	if (locale === "es") return es_comparegroupauthpaymentsai4(inputs)
	if (locale === "zh") return zh_comparegroupauthpaymentsai4(inputs)
	if (locale === "ja") return ja_comparegroupauthpaymentsai4(inputs)
	if (locale === "ko") return ko_comparegroupauthpaymentsai4(inputs)
	if (locale === "zh-Hant") return zh_hant1_comparegroupauthpaymentsai4(inputs)
	if (locale === "de") return de_comparegroupauthpaymentsai4(inputs)
	return fr_comparegroupauthpaymentsai4(inputs)
});
export { comparegroupauthpaymentsai4 as "compareGroupAuthPaymentsAi" }