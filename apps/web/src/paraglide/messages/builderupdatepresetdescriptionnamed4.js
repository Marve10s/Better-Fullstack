/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ name: NonNullable<unknown> }} Builderupdatepresetdescriptionnamed4Inputs */



/**
* | output |
* | --- |
* | "Updating \"{name}\" will override the saved preset with your current stack configuration." |
*
* @param {Builderupdatepresetdescriptionnamed4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderupdatepresetdescriptionnamed4 = /** @type {((inputs: Builderupdatepresetdescriptionnamed4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderupdatepresetdescriptionnamed4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((i, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ (`Actualizar "${i?.name}" reemplazará la plantilla guardada con la configuración actual.`)
	if (locale === "zh") return /** @type {LocalizedString} */ (`更新 "${i?.name}" 会用当前 stack 配置覆盖已保存的预设。`)
	if (locale === "ja") return /** @type {LocalizedString} */ (`「${i?.name}」を更新すると、保存されたプリセットが現在のスタック構成で上書きされます。`)
	if (locale === "ko") return /** @type {LocalizedString} */ (`"${i?.name}"을 업데이트하면 저장된 사전 설정이 현재 스택 구성으로 재정의됩니다.`)
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ (`更新 "${i?.name}" 會用目前 stack 配置覆寫已儲存的預設。`)
	if (locale === "de") return /** @type {LocalizedString} */ (`Durch das Aktualisieren von „${i?.name}“ wird die gespeicherte Voreinstellung mit Ihrer aktuellen Stack-Konfiguration überschrieben.`)
	if (locale === "fr") return /** @type {LocalizedString} */ (`La mise à jour de "${i?.name}" remplacera le préréglage enregistré par votre configuration de pile actuelle.`)
	if (locale === "uk") return /** @type {LocalizedString} */ (`Оновлення "${i?.name}" замінить збережений пресет поточною конфігурацією стеку.`)
	return /** @type {LocalizedString} */ (`Updating "${i?.name}" will override the saved preset with your current stack configuration.`)
});
export { builderupdatepresetdescriptionnamed4 as "builderUpdatePresetDescriptionNamed" }