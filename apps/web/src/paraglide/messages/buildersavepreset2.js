/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildersavepreset2Inputs */

const en_buildersavepreset2 = /** @type {(inputs: Buildersavepreset2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Save preset`)
};

const es_buildersavepreset2 = /** @type {(inputs: Buildersavepreset2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Guardar plantilla`)
};

const zh_buildersavepreset2 = /** @type {(inputs: Buildersavepreset2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`保存预设`)
};

const ja_buildersavepreset2 = /** @type {(inputs: Buildersavepreset2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`プリセットの保存`)
};

const ko_buildersavepreset2 = /** @type {(inputs: Buildersavepreset2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`사전 설정 저장`)
};

const zh_hant1_buildersavepreset2 = /** @type {(inputs: Buildersavepreset2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`儲存預設`)
};

const de_buildersavepreset2 = /** @type {(inputs: Buildersavepreset2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Voreinstellung speichern`)
};

const fr_buildersavepreset2 = /** @type {(inputs: Buildersavepreset2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Enregistrer le préréglage`)
};

/**
* | output |
* | --- |
* | "Save preset" |
*
* @param {Buildersavepreset2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const buildersavepreset2 = /** @type {((inputs?: Buildersavepreset2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildersavepreset2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildersavepreset2(inputs)
	if (locale === "es") return es_buildersavepreset2(inputs)
	if (locale === "zh") return zh_buildersavepreset2(inputs)
	if (locale === "ja") return ja_buildersavepreset2(inputs)
	if (locale === "ko") return ko_buildersavepreset2(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildersavepreset2(inputs)
	if (locale === "de") return de_buildersavepreset2(inputs)
	return fr_buildersavepreset2(inputs)
});
export { buildersavepreset2 as "builderSavePreset" }