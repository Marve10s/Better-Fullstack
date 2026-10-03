/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docstelemetrydonottrack4Inputs */

const en_docstelemetrydonottrack4 = /** @type {(inputs: Docstelemetrydonottrack4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Browser analytics are disabled because Do Not Track is enabled.`)
};

const es_docstelemetrydonottrack4 = /** @type {(inputs: Docstelemetrydonottrack4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`La analítica del navegador está desactivada porque Do Not Track está activado.`)
};

const zh_docstelemetrydonottrack4 = /** @type {(inputs: Docstelemetrydonottrack4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`由于已开启 Do Not Track，浏览器分析已关闭。`)
};

const ja_docstelemetrydonottrack4 = /** @type {(inputs: Docstelemetrydonottrack4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Do Not Track が有効なため、ブラウザ分析は無効です。`)
};

const ko_docstelemetrydonottrack4 = /** @type {(inputs: Docstelemetrydonottrack4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Do Not Track이 켜져 있어 브라우저 분석이 꺼져 있습니다.`)
};

const zh_hant1_docstelemetrydonottrack4 = /** @type {(inputs: Docstelemetrydonottrack4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`由於已啟用 Do Not Track，瀏覽器分析已停用。`)
};

const de_docstelemetrydonottrack4 = /** @type {(inputs: Docstelemetrydonottrack4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Browser-Analysen sind deaktiviert, weil Do Not Track aktiviert ist.`)
};

const fr_docstelemetrydonottrack4 = /** @type {(inputs: Docstelemetrydonottrack4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Les analyses du navigateur sont désactivées car Do Not Track est activé.`)
};

const uk_docstelemetrydonottrack4 = /** @type {(inputs: Docstelemetrydonottrack4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Аналітику браузера вимкнено, бо ввімкнено Do Not Track.`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docstelemetrydonottrack4(inputs)
	if (locale === "zh") return zh_docstelemetrydonottrack4(inputs)
	if (locale === "ja") return ja_docstelemetrydonottrack4(inputs)
	if (locale === "ko") return ko_docstelemetrydonottrack4(inputs)
	if (locale === "zh-Hant") return zh_hant1_docstelemetrydonottrack4(inputs)
	if (locale === "de") return de_docstelemetrydonottrack4(inputs)
	if (locale === "fr") return fr_docstelemetrydonottrack4(inputs)
	if (locale === "uk") return uk_docstelemetrydonottrack4(inputs)
	return en_docstelemetrydonottrack4(inputs)
});
export { docstelemetrydonottrack4 as "docsTelemetryDoNotTrack" }