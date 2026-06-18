/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ name: NonNullable<unknown> }} Savedpresetloaded2Inputs */

const en_savedpresetloaded2 = /** @type {(inputs: Savedpresetloaded2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Loaded preset: ${i?.name}`)
};

const es_savedpresetloaded2 = /** @type {(inputs: Savedpresetloaded2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Plantilla cargada: ${i?.name}`)
};

const zh_savedpresetloaded2 = /** @type {(inputs: Savedpresetloaded2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`已加载预设：${i?.name}`)
};

const ja_savedpresetloaded2 = /** @type {(inputs: Savedpresetloaded2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`ロードされたプリセット: ${i?.name}`)
};

const ko_savedpresetloaded2 = /** @type {(inputs: Savedpresetloaded2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`로드된 사전 설정: ${i?.name}`)
};

const zh_hant1_savedpresetloaded2 = /** @type {(inputs: Savedpresetloaded2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`已載入預設：${i?.name}`)
};

const de_savedpresetloaded2 = /** @type {(inputs: Savedpresetloaded2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Geladene Voreinstellung: ${i?.name}`)
};

const fr_savedpresetloaded2 = /** @type {(inputs: Savedpresetloaded2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Préréglage chargé : ${i?.name}`)
};

/**
* | output |
* | --- |
* | "Loaded preset: {name}" |
*
* @param {Savedpresetloaded2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const savedpresetloaded2 = /** @type {((inputs: Savedpresetloaded2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Savedpresetloaded2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_savedpresetloaded2(inputs)
	if (locale === "es") return es_savedpresetloaded2(inputs)
	if (locale === "zh") return zh_savedpresetloaded2(inputs)
	if (locale === "ja") return ja_savedpresetloaded2(inputs)
	if (locale === "ko") return ko_savedpresetloaded2(inputs)
	if (locale === "zh-Hant") return zh_hant1_savedpresetloaded2(inputs)
	if (locale === "de") return de_savedpresetloaded2(inputs)
	return fr_savedpresetloaded2(inputs)
});
export { savedpresetloaded2 as "savedPresetLoaded" }