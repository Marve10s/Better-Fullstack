/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderupdatepresetdescription3Inputs */



/**
* | output |
* | --- |
* | "Updating this preset will override the saved preset with your current stack configuration." |
*
* @param {Builderupdatepresetdescription3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderupdatepresetdescription3 = /** @type {((inputs?: Builderupdatepresetdescription3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderupdatepresetdescription3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Actualizar esta plantilla reemplazará la plantilla guardada con la configuración actual.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("更新此预设会用当前 stack 配置覆盖已保存的预设。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("このプリセットを更新すると、保存されたプリセットが現在のスタック構成で上書きされます。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("이 사전 설정을 업데이트하면 현재 스택 구성으로 저장된 사전 설정이 재정의됩니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("更新此預設會用目前 stack 配置覆蓋已儲存的預設。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Durch das Aktualisieren dieser Voreinstellung wird die gespeicherte Voreinstellung mit Ihrer aktuellen Stack-Konfiguration überschrieben.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("La mise à jour de ce préréglage remplacera le préréglage enregistré par votre configuration de pile actuelle.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Оновлення замінить цей пресет поточною конфігурацією стеку.")
	return /** @type {LocalizedString} */ ("Updating this preset will override the saved preset with your current stack configuration.")
});
export { builderupdatepresetdescription3 as "builderUpdatePresetDescription" }