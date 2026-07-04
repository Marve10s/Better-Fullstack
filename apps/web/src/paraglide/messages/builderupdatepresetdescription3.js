/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderupdatepresetdescription3Inputs */

const en_builderupdatepresetdescription3 = /** @type {(inputs: Builderupdatepresetdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Updating this preset will override the saved preset with your current stack configuration.`)
};

const es_builderupdatepresetdescription3 = /** @type {(inputs: Builderupdatepresetdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Actualizar esta plantilla reemplazará la plantilla guardada con la configuración actual.`)
};

const zh_builderupdatepresetdescription3 = /** @type {(inputs: Builderupdatepresetdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`更新此预设会用当前 stack 配置覆盖已保存的预设。`)
};

const ja_builderupdatepresetdescription3 = /** @type {(inputs: Builderupdatepresetdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`このプリセットを更新すると、保存されたプリセットが現在のスタック構成で上書きされます。`)
};

const ko_builderupdatepresetdescription3 = /** @type {(inputs: Builderupdatepresetdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`이 사전 설정을 업데이트하면 현재 스택 구성으로 저장된 사전 설정이 재정의됩니다.`)
};

const zh_hant1_builderupdatepresetdescription3 = /** @type {(inputs: Builderupdatepresetdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`更新此預設會用目前 stack 配置覆蓋已儲存的預設。`)
};

const de_builderupdatepresetdescription3 = /** @type {(inputs: Builderupdatepresetdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Durch das Aktualisieren dieser Voreinstellung wird die gespeicherte Voreinstellung mit Ihrer aktuellen Stack-Konfiguration überschrieben.`)
};

const fr_builderupdatepresetdescription3 = /** @type {(inputs: Builderupdatepresetdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`La mise à jour de ce préréglage remplacera le préréglage enregistré par votre configuration de pile actuelle.`)
};

/**
* | output |
* | --- |
* | "Updating this preset will override the saved preset with your current stack configuration." |
*
* @param {Builderupdatepresetdescription3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const builderupdatepresetdescription3 = /** @type {((inputs?: Builderupdatepresetdescription3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderupdatepresetdescription3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderupdatepresetdescription3(inputs)
	if (locale === "es") return es_builderupdatepresetdescription3(inputs)
	if (locale === "zh") return zh_builderupdatepresetdescription3(inputs)
	if (locale === "ja") return ja_builderupdatepresetdescription3(inputs)
	if (locale === "ko") return ko_builderupdatepresetdescription3(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderupdatepresetdescription3(inputs)
	if (locale === "de") return de_builderupdatepresetdescription3(inputs)
	return fr_builderupdatepresetdescription3(inputs)
});
export { builderupdatepresetdescription3 as "builderUpdatePresetDescription" }