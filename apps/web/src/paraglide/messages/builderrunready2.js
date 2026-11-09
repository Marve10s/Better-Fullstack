/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderrunready2Inputs */



/**
* | output |
* | --- |
* | "Development server ready" |
*
* @param {Builderrunready2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderrunready2 = /** @type {((inputs?: Builderrunready2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderrunready2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Servidor de desarrollo listo")
	if (locale === "zh") return /** @type {LocalizedString} */ ("开发服务器已就绪")
	if (locale === "ja") return /** @type {LocalizedString} */ ("開発サーバーの準備完了")
	if (locale === "ko") return /** @type {LocalizedString} */ ("개발 서버 준비 완료")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("開發伺服器已就緒")
	if (locale === "de") return /** @type {LocalizedString} */ ("Entwicklungsserver bereit")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Serveur de développement prêt")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Сервер розробки готовий")
	return /** @type {LocalizedString} */ ("Development server ready")
});
export { builderrunready2 as "builderRunReady" }