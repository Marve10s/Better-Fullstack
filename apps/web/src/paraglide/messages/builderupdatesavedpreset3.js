/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderupdatesavedpreset3Inputs */

const en_builderupdatesavedpreset3 = /** @type {(inputs: Builderupdatesavedpreset3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Update Saved Preset`)
};

const es_builderupdatesavedpreset3 = /** @type {(inputs: Builderupdatesavedpreset3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Actualizar plantilla guardada`)
};

const zh_builderupdatesavedpreset3 = /** @type {(inputs: Builderupdatesavedpreset3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`更新已保存预设`)
};

const ja_builderupdatesavedpreset3 = /** @type {(inputs: Builderupdatesavedpreset3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`保存されたプリセットを更新する`)
};

const ko_builderupdatesavedpreset3 = /** @type {(inputs: Builderupdatesavedpreset3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`저장된 사전 설정 업데이트`)
};

const zh_hant1_builderupdatesavedpreset3 = /** @type {(inputs: Builderupdatesavedpreset3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`更新已儲存預設`)
};

const de_builderupdatesavedpreset3 = /** @type {(inputs: Builderupdatesavedpreset3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Gespeicherte Voreinstellung aktualisieren`)
};

const fr_builderupdatesavedpreset3 = /** @type {(inputs: Builderupdatesavedpreset3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Mettre à jour le préréglage enregistré`)
};

/**
* | output |
* | --- |
* | "Update Saved Preset" |
*
* @param {Builderupdatesavedpreset3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const builderupdatesavedpreset3 = /** @type {((inputs?: Builderupdatesavedpreset3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderupdatesavedpreset3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderupdatesavedpreset3(inputs)
	if (locale === "es") return es_builderupdatesavedpreset3(inputs)
	if (locale === "zh") return zh_builderupdatesavedpreset3(inputs)
	if (locale === "ja") return ja_builderupdatesavedpreset3(inputs)
	if (locale === "ko") return ko_builderupdatesavedpreset3(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderupdatesavedpreset3(inputs)
	if (locale === "de") return de_builderupdatesavedpreset3(inputs)
	return fr_builderupdatesavedpreset3(inputs)
});
export { builderupdatesavedpreset3 as "builderUpdateSavedPreset" }