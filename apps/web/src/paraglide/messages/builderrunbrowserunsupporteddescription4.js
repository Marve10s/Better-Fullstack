/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderrunbrowserunsupporteddescription4Inputs */



/**
* | output |
* | --- |
* | "Use a current Chromium browser, allow cross-site cookies for WebContainer domains, and reload this page." |
*
* @param {Builderrunbrowserunsupporteddescription4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderrunbrowserunsupporteddescription4 = /** @type {((inputs?: Builderrunbrowserunsupporteddescription4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderrunbrowserunsupporteddescription4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Usa un navegador Chromium actual, permite cookies entre sitios para los dominios WebContainer y recarga la página.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("请使用最新的 Chromium 浏览器，允许 WebContainer 域的跨站 Cookie，然后重新加载此页面。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("最新の Chromium ブラウザを使用し、WebContainer ドメインのサイト間 Cookie を許可してからページを再読み込みしてください。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("최신 Chromium 브라우저를 사용하고 WebContainer 도메인의 사이트 간 쿠키를 허용한 뒤 페이지를 새로고침하세요.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("請使用最新的 Chromium 瀏覽器，允許 WebContainer 網域的跨網站 Cookie，然後重新載入此頁面。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Verwende einen aktuellen Chromium-Browser, erlaube websiteübergreifende Cookies für WebContainer-Domains und lade die Seite neu.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Utilisez un navigateur Chromium récent, autorisez les cookies intersites pour les domaines WebContainer et rechargez cette page.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Використовуйте сучасний Chromium-браузер, дозвольте міжсайтові cookie для доменів WebContainer і перезавантажте сторінку.")
	return /** @type {LocalizedString} */ ("Use a current Chromium browser, allow cross-site cookies for WebContainer domains, and reload this page.")
});
export { builderrunbrowserunsupporteddescription4 as "builderRunBrowserUnsupportedDescription" }