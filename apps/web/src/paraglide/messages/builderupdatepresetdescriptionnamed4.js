/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ name: NonNullable<unknown> }} Builderupdatepresetdescriptionnamed4Inputs */

const en_builderupdatepresetdescriptionnamed4 = /** @type {(inputs: Builderupdatepresetdescriptionnamed4Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Updating "${i?.name}" will override the saved preset with your current stack configuration.`)
};

const es_builderupdatepresetdescriptionnamed4 = /** @type {(inputs: Builderupdatepresetdescriptionnamed4Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Actualizar "${i?.name}" reemplazará la plantilla guardada con la configuración actual.`)
};

const zh_builderupdatepresetdescriptionnamed4 = /** @type {(inputs: Builderupdatepresetdescriptionnamed4Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`更新 "${i?.name}" 会用当前 stack 配置覆盖已保存的预设。`)
};

const ja_builderupdatepresetdescriptionnamed4 = /** @type {(inputs: Builderupdatepresetdescriptionnamed4Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`「${i?.name}」を更新すると、保存されたプリセットが現在のスタック構成で上書きされます。`)
};

const ko_builderupdatepresetdescriptionnamed4 = /** @type {(inputs: Builderupdatepresetdescriptionnamed4Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`"${i?.name}"을 업데이트하면 저장된 사전 설정이 현재 스택 구성으로 재정의됩니다.`)
};

const zh_hant1_builderupdatepresetdescriptionnamed4 = /** @type {(inputs: Builderupdatepresetdescriptionnamed4Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`更新 "${i?.name}" 會用目前 stack 配置覆寫已儲存的預設。`)
};

const de_builderupdatepresetdescriptionnamed4 = /** @type {(inputs: Builderupdatepresetdescriptionnamed4Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Durch das Aktualisieren von „${i?.name}“ wird die gespeicherte Voreinstellung mit Ihrer aktuellen Stack-Konfiguration überschrieben.`)
};

const fr_builderupdatepresetdescriptionnamed4 = /** @type {(inputs: Builderupdatepresetdescriptionnamed4Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`La mise à jour de "${i?.name}" remplacera le préréglage enregistré par votre configuration de pile actuelle.`)
};

/**
* | output |
* | --- |
* | "Updating \"{name}\" will override the saved preset with your current stack configuration." |
*
* @param {Builderupdatepresetdescriptionnamed4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const builderupdatepresetdescriptionnamed4 = /** @type {((inputs: Builderupdatepresetdescriptionnamed4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderupdatepresetdescriptionnamed4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderupdatepresetdescriptionnamed4(inputs)
	if (locale === "es") return es_builderupdatepresetdescriptionnamed4(inputs)
	if (locale === "zh") return zh_builderupdatepresetdescriptionnamed4(inputs)
	if (locale === "ja") return ja_builderupdatepresetdescriptionnamed4(inputs)
	if (locale === "ko") return ko_builderupdatepresetdescriptionnamed4(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderupdatepresetdescriptionnamed4(inputs)
	if (locale === "de") return de_builderupdatepresetdescriptionnamed4(inputs)
	return fr_builderupdatepresetdescriptionnamed4(inputs)
});
export { builderupdatepresetdescriptionnamed4 as "builderUpdatePresetDescriptionNamed" }