/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Changelogclose1Inputs */



/**
* | output |
* | --- |
* | "Close changelog" |
*
* @param {Changelogclose1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const changelogclose1 = /** @type {((inputs?: Changelogclose1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changelogclose1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Cerrar changelog")
	if (locale === "zh") return /** @type {LocalizedString} */ ("关闭更新日志")
	if (locale === "ja") return /** @type {LocalizedString} */ ("変更履歴を閉じる")
	if (locale === "ko") return /** @type {LocalizedString} */ ("변경 로그 닫기")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("關閉更新日誌")
	if (locale === "de") return /** @type {LocalizedString} */ ("Änderungsprotokoll schließen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Fermer le journal des modifications")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Закрити журнал змін")
	return /** @type {LocalizedString} */ ("Close changelog")
});
export { changelogclose1 as "changelogClose" }