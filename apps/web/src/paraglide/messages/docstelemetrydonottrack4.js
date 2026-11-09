/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docstelemetrydonottrack4Inputs */



/**
* | output |
* | --- |
* | "Browser analytics are disabled because Do Not Track is enabled." |
*
* @param {Docstelemetrydonottrack4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docstelemetrydonottrack4 = /** @type {((inputs?: Docstelemetrydonottrack4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docstelemetrydonottrack4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("La analítica del navegador está desactivada porque Do Not Track está activado.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("由于已开启 Do Not Track，浏览器分析已关闭。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Do Not Track が有効なため、ブラウザ分析は無効です。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("Do Not Track이 켜져 있어 브라우저 분석이 꺼져 있습니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("由於已啟用 Do Not Track，瀏覽器分析已停用。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Browser-Analysen sind deaktiviert, weil Do Not Track aktiviert ist.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Les analyses du navigateur sont désactivées car Do Not Track est activé.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Аналітику браузера вимкнено, бо ввімкнено Do Not Track.")
	return /** @type {LocalizedString} */ ("Browser analytics are disabled because Do Not Track is enabled.")
});
export { docstelemetrydonottrack4 as "docsTelemetryDoNotTrack" }