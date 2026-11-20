/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presettrackjavaapiintent4Inputs */



/**
* | output |
* | --- |
* | "Ship Spring services" |
*
* @param {Presettrackjavaapiintent4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const presettrackjavaapiintent4 = /** @type {((inputs?: Presettrackjavaapiintent4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presettrackjavaapiintent4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Lanzar servicios Spring")
	if (locale === "zh") return /** @type {LocalizedString} */ ("发布 Spring 服务")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Spring サービスを出荷する")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Spring 서비스 출시")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("發布 Spring 服務")
	if (locale === "de") return /** @type {LocalizedString} */ ("Spring-Services ausliefern")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Livrer des services Spring")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Шипити Spring-сервіси")
	return /** @type {LocalizedString} */ ("Ship Spring services")
});
export { presettrackjavaapiintent4 as "presetTrackJavaApiIntent" }