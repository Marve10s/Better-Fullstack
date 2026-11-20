/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Changelogopen1Inputs */



/**
* | output |
* | --- |
* | "Open changelog" |
*
* @param {Changelogopen1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const changelogopen1 = /** @type {((inputs?: Changelogopen1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changelogopen1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Abrir changelog")
	if (locale === "zh") return /** @type {LocalizedString} */ ("打开更新日志")
	if (locale === "ja") return /** @type {LocalizedString} */ ("変更履歴を開く")
	if (locale === "ko") return /** @type {LocalizedString} */ ("변경 로그 열기")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("打開更新日誌")
	if (locale === "de") return /** @type {LocalizedString} */ ("Änderungsprotokoll öffnen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Ouvrir le journal des modifications")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Відкрити журнал змін")
	return /** @type {LocalizedString} */ ("Open changelog")
});
export { changelogopen1 as "changelogOpen" }