/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderrunsavererun3Inputs */



/**
* | output |
* | --- |
* | "Save & rerun" |
*
* @param {Builderrunsavererun3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderrunsavererun3 = /** @type {((inputs?: Builderrunsavererun3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderrunsavererun3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Guardar y ejecutar")
	if (locale === "zh") return /** @type {LocalizedString} */ ("保存并重新运行")
	if (locale === "ja") return /** @type {LocalizedString} */ ("保存して再実行")
	if (locale === "ko") return /** @type {LocalizedString} */ ("저장 후 다시 실행")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("儲存並重新執行")
	if (locale === "de") return /** @type {LocalizedString} */ ("Speichern & neu starten")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Enregistrer et relancer")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Зберегти й перезапустити")
	return /** @type {LocalizedString} */ ("Save & rerun")
});
export { builderrunsavererun3 as "builderRunSaveRerun" }