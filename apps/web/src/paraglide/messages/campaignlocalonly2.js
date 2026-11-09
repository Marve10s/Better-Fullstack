/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaignlocalonly2Inputs */



/**
* | output |
* | --- |
* | "Runs locally in your browser" |
*
* @param {Campaignlocalonly2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaignlocalonly2 = /** @type {((inputs?: Campaignlocalonly2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaignlocalonly2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Se ejecuta localmente en tu navegador")
	if (locale === "zh") return /** @type {LocalizedString} */ ("在你的浏览器中本地运行")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ブラウザ内でローカルに実行")
	if (locale === "ko") return /** @type {LocalizedString} */ ("브라우저에서 로컬로 실행")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("在你的瀏覽器中本機執行")
	if (locale === "de") return /** @type {LocalizedString} */ ("Läuft lokal in deinem Browser")
	if (locale === "fr") return /** @type {LocalizedString} */ ("S'exécute localement dans votre navigateur")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Працює локально у вашому браузері")
	return /** @type {LocalizedString} */ ("Runs locally in your browser")
});
export { campaignlocalonly2 as "campaignLocalOnly" }