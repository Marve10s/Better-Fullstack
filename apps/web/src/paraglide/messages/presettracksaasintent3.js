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

const ja_presettracksaasintent3 = /** @type {(inputs: Presettracksaasintent3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`サブスクリプションを販売する`)
};

const ko_presettracksaasintent3 = /** @type {(inputs: Presettracksaasintent3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`구독 판매`)
};

const zh_hant1_presettracksaasintent3 = /** @type {(inputs: Presettracksaasintent3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`銷售訂閱`)
};

const de_presettracksaasintent3 = /** @type {(inputs: Presettracksaasintent3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Abonnements verkaufen`)
};

const fr_presettracksaasintent3 = /** @type {(inputs: Presettracksaasintent3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Vendre des abonnements`)
};

/**
* | output |
* | --- |
* | "Sell subscriptions" |
*
* @param {Presettracksaasintent3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const presettracksaasintent3 = /** @type {((inputs?: Presettracksaasintent3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presettracksaasintent3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_presettracksaasintent3(inputs)
	if (locale === "es") return es_presettracksaasintent3(inputs)
	if (locale === "zh") return zh_presettracksaasintent3(inputs)
	if (locale === "ja") return ja_presettracksaasintent3(inputs)
	if (locale === "ko") return ko_presettracksaasintent3(inputs)
	if (locale === "zh-Hant") return zh_hant1_presettracksaasintent3(inputs)
	if (locale === "de") return de_presettracksaasintent3(inputs)
	return fr_presettracksaasintent3(inputs)
});
export { presettracksaasintent3 as "presetTrackSaasIntent" }