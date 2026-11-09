/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposersharehint3Inputs */



/**
* | output |
* | --- |
* | "Copy a link to this configuration" |
*
* @param {Buildercomposersharehint3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposersharehint3 = /** @type {((inputs?: Buildercomposersharehint3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposersharehint3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Copia un enlace a esta configuración")
	if (locale === "zh") return /** @type {LocalizedString} */ ("复制此配置的链接")
	if (locale === "ja") return /** @type {LocalizedString} */ ("この構成へのリンクをコピー")
	if (locale === "ko") return /** @type {LocalizedString} */ ("이 구성의 링크 복사")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("複製此設定的連結")
	if (locale === "de") return /** @type {LocalizedString} */ ("Link zu dieser Konfiguration kopieren")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Copier un lien vers cette configuration")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Скопіювати посилання на цю конфігурацію")
	return /** @type {LocalizedString} */ ("Copy a link to this configuration")
});
export { buildercomposersharehint3 as "builderComposerShareHint" }