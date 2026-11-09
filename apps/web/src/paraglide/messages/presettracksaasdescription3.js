/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presettracksaasdescription3Inputs */



/**
* | output |
* | --- |
* | "Next.js with auth, relational data, payments, email, and a deployment-ready app shape." |
*
* @param {Presettracksaasdescription3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const presettracksaasdescription3 = /** @type {((inputs?: Presettracksaasdescription3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presettracksaasdescription3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Next.js con auth, datos relacionales, pagos, email y una app lista para despliegue.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Next.js，包含认证、关系型数据、支付、email，以及可部署的应用结构。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Next.js には、認証、リレーショナル データ、支払い、電子メール、およびすぐに展開できるアプリの形状が含まれます。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Next.js 인증, 관계형 데이터, 결제, 이메일 및 배포 가능한 앱 형태가 포함됩니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Next.js，包含認證、關係型資料、付款、email，以及可部署的應用程式結構。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Next.js mit Authentifizierung, relationalen Daten, Zahlungen, E-Mail und einer einsatzbereiten App-Form.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Next.js avec authentification, données relationnelles, paiements, e-mail et forme d'application prête à être déployée.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Next.js з автентифікацією, реляційними даними, платежами, email і структурою застосунку, готовою до деплою.")
	return /** @type {LocalizedString} */ ("Next.js with auth, relational data, payments, email, and a deployment-ready app shape.")
});
export { presettracksaasdescription3 as "presetTrackSaasDescription" }