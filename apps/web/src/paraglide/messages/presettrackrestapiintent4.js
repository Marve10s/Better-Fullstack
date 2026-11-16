/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presettrackrestapiintent4Inputs */



/**
* | output |
* | --- |
* | "Expose a service" |
*
* @param {Presettrackrestapiintent4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const presettrackrestapiintent4 = /** @type {((inputs?: Presettrackrestapiintent4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presettrackrestapiintent4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Exponer un servicio")
	if (locale === "zh") return /** @type {LocalizedString} */ ("开放接口")
	if (locale === "ja") return /** @type {LocalizedString} */ ("サービスを公開する")
	if (locale === "ko") return /** @type {LocalizedString} */ ("서비스 공개")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("開放介面")
	if (locale === "de") return /** @type {LocalizedString} */ ("Einen Dienst bereitstellen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Exposer un service")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Відкрити сервіс назовні")
	return /** @type {LocalizedString} */ ("Expose a service")
});
export { presettrackrestapiintent4 as "presetTrackRestApiIntent" }