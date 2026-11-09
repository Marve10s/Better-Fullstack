/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderrunfailed2Inputs */



/**
* | output |
* | --- |
* | "Run failed" |
*
* @param {Builderrunfailed2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderrunfailed2 = /** @type {((inputs?: Builderrunfailed2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderrunfailed2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("La ejecución falló")
	if (locale === "zh") return /** @type {LocalizedString} */ ("运行失败")
	if (locale === "ja") return /** @type {LocalizedString} */ ("実行に失敗しました")
	if (locale === "ko") return /** @type {LocalizedString} */ ("실행 실패")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("執行失敗")
	if (locale === "de") return /** @type {LocalizedString} */ ("Ausführung fehlgeschlagen")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Échec de l’exécution")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Помилка запуску")
	return /** @type {LocalizedString} */ ("Run failed")
});
export { builderrunfailed2 as "builderRunFailed" }