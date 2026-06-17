/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderupdatepreset2Inputs */

const en_builderupdatepreset2 = /** @type {(inputs: Builderupdatepreset2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Update Preset`)
};

const es_builderupdatepreset2 = /** @type {(inputs: Builderupdatepreset2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Actualizar plantilla`)
};

const zh_builderupdatepreset2 = /** @type {(inputs: Builderupdatepreset2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`更新预设`)
};

const ja_builderupdatepreset2 = /** @type {(inputs: Builderupdatepreset2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`プリセットの更新`)
};

const ko_builderupdatepreset2 = /** @type {(inputs: Builderupdatepreset2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`사전 설정 업데이트`)
};

const zh_hant1_builderupdatepreset2 = /** @type {(inputs: Builderupdatepreset2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`更新預設`)
};

const de_builderupdatepreset2 = /** @type {(inputs: Builderupdatepreset2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Voreinstellung aktualisieren`)
};

const fr_builderupdatepreset2 = /** @type {(inputs: Builderupdatepreset2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Mettre à jour le préréglage`)
};

/**
* | output |
* | --- |
* | "Update Preset" |
*
* @param {Builderupdatepreset2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const builderupdatepreset2 = /** @type {((inputs?: Builderupdatepreset2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderupdatepreset2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderupdatepreset2(inputs)
	if (locale === "es") return es_builderupdatepreset2(inputs)
	if (locale === "zh") return zh_builderupdatepreset2(inputs)
	if (locale === "ja") return ja_builderupdatepreset2(inputs)
	if (locale === "ko") return ko_builderupdatepreset2(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderupdatepreset2(inputs)
	if (locale === "de") return de_builderupdatepreset2(inputs)
	return fr_builderupdatepreset2(inputs)
});
export { builderupdatepreset2 as "builderUpdatePreset" }