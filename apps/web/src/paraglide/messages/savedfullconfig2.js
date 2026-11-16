/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Savedfullconfig2Inputs */



/**
* | output |
* | --- |
* | "Full saved configuration for this preset." |
*
* @param {Savedfullconfig2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const savedfullconfig2 = /** @type {((inputs?: Savedfullconfig2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Savedfullconfig2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Configuración completa guardada para esta plantilla.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("此预设的完整保存配置。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("このプリセットの完全に保存された設定。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("이 사전 설정의 전체 저장된 구성입니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("此預設的完整儲存配置。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Vollständig gespeicherte Konfiguration für diese Voreinstellung.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Configuration entièrement enregistrée pour ce préréglage.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Повна збережена конфігурація цього пресету.")
	return /** @type {LocalizedString} */ ("Full saved configuration for this preset.")
});
export { savedfullconfig2 as "savedFullConfig" }