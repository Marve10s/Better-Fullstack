/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderrunbrowserunsupporteddescription4Inputs */

const en_builderrunbrowserunsupporteddescription4 = /** @type {(inputs: Builderrunbrowserunsupporteddescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Use a current Chromium browser, allow cross-site cookies for WebContainer domains, and reload this page.`)
};

const es_builderrunbrowserunsupporteddescription4 = /** @type {(inputs: Builderrunbrowserunsupporteddescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Usa un navegador Chromium actual, permite cookies entre sitios para los dominios WebContainer y recarga la página.`)
};

const zh_builderrunbrowserunsupporteddescription4 = /** @type {(inputs: Builderrunbrowserunsupporteddescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`请使用最新的 Chromium 浏览器，允许 WebContainer 域的跨站 Cookie，然后重新加载此页面。`)
};

const ja_builderrunbrowserunsupporteddescription4 = /** @type {(inputs: Builderrunbrowserunsupporteddescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`最新の Chromium ブラウザを使用し、WebContainer ドメインのサイト間 Cookie を許可してからページを再読み込みしてください。`)
};

const ko_builderrunbrowserunsupporteddescription4 = /** @type {(inputs: Builderrunbrowserunsupporteddescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`최신 Chromium 브라우저를 사용하고 WebContainer 도메인의 사이트 간 쿠키를 허용한 뒤 페이지를 새로고침하세요.`)
};

const zh_hant1_builderrunbrowserunsupporteddescription4 = /** @type {(inputs: Builderrunbrowserunsupporteddescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`請使用最新的 Chromium 瀏覽器，允許 WebContainer 網域的跨網站 Cookie，然後重新載入此頁面。`)
};

const de_builderrunbrowserunsupporteddescription4 = /** @type {(inputs: Builderrunbrowserunsupporteddescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Verwende einen aktuellen Chromium-Browser, erlaube websiteübergreifende Cookies für WebContainer-Domains und lade die Seite neu.`)
};

const fr_builderrunbrowserunsupporteddescription4 = /** @type {(inputs: Builderrunbrowserunsupporteddescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Utilisez un navigateur Chromium récent, autorisez les cookies intersites pour les domaines WebContainer et rechargez cette page.`)
};

const uk_builderrunbrowserunsupporteddescription4 = /** @type {(inputs: Builderrunbrowserunsupporteddescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Використовуйте сучасний Chromium-браузер, дозвольте міжсайтові cookie для доменів WebContainer і перезавантажте сторінку.`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderrunbrowserunsupporteddescription4(inputs)
	if (locale === "es") return es_builderrunbrowserunsupporteddescription4(inputs)
	if (locale === "zh") return zh_builderrunbrowserunsupporteddescription4(inputs)
	if (locale === "ja") return ja_builderrunbrowserunsupporteddescription4(inputs)
	if (locale === "ko") return ko_builderrunbrowserunsupporteddescription4(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderrunbrowserunsupporteddescription4(inputs)
	if (locale === "de") return de_builderrunbrowserunsupporteddescription4(inputs)
	if (locale === "fr") return fr_builderrunbrowserunsupporteddescription4(inputs)
	return uk_builderrunbrowserunsupporteddescription4(inputs)
});
export { builderrunbrowserunsupporteddescription4 as "builderRunBrowserUnsupportedDescription" }