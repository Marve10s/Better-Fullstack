/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presettracksaasdescription3Inputs */

const en_presettracksaasdescription3 = /** @type {(inputs: Presettracksaasdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Next.js with auth, relational data, payments, email, and a deployment-ready app shape.`)
};

const es_presettracksaasdescription3 = /** @type {(inputs: Presettracksaasdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Next.js con auth, datos relacionales, pagos, email y una app lista para despliegue.`)
};

const zh_presettracksaasdescription3 = /** @type {(inputs: Presettracksaasdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Next.js，包含认证、关系型数据、支付、email，以及可部署的应用结构。`)
};

const ja_presettracksaasdescription3 = /** @type {(inputs: Presettracksaasdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Next.js には、認証、リレーショナル データ、支払い、電子メール、およびすぐに展開できるアプリの形状が含まれます。`)
};

const ko_presettracksaasdescription3 = /** @type {(inputs: Presettracksaasdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Next.js 인증, 관계형 데이터, 결제, 이메일 및 배포 가능한 앱 형태가 포함됩니다.`)
};

const zh_hant1_presettracksaasdescription3 = /** @type {(inputs: Presettracksaasdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Next.js，包含認證、關係型資料、付款、email，以及可部署的應用程式結構。`)
};

const de_presettracksaasdescription3 = /** @type {(inputs: Presettracksaasdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Next.js mit Authentifizierung, relationalen Daten, Zahlungen, E-Mail und einer einsatzbereiten App-Form.`)
};

const fr_presettracksaasdescription3 = /** @type {(inputs: Presettracksaasdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Next.js avec authentification, données relationnelles, paiements, e-mail et forme d'application prête à être déployée.`)
};

/**
* | output |
* | --- |
* | "Next.js with auth, relational data, payments, email, and a deployment-ready app shape." |
*
* @param {Presettracksaasdescription3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const presettracksaasdescription3 = /** @type {((inputs?: Presettracksaasdescription3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presettracksaasdescription3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_presettracksaasdescription3(inputs)
	if (locale === "es") return es_presettracksaasdescription3(inputs)
	if (locale === "zh") return zh_presettracksaasdescription3(inputs)
	if (locale === "ja") return ja_presettracksaasdescription3(inputs)
	if (locale === "ko") return ko_presettracksaasdescription3(inputs)
	if (locale === "zh-Hant") return zh_hant1_presettracksaasdescription3(inputs)
	if (locale === "de") return de_presettracksaasdescription3(inputs)
	return fr_presettracksaasdescription3(inputs)
});
export { presettracksaasdescription3 as "presetTrackSaasDescription" }