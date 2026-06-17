/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ name: NonNullable<unknown> }} Savedpresetsaved2Inputs */

const en_savedpresetsaved2 = /** @type {(inputs: Savedpresetsaved2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Saved preset: ${i?.name}`)
};

const es_savedpresetsaved2 = /** @type {(inputs: Savedpresetsaved2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Plantilla guardada: ${i?.name}`)
};

const zh_savedpresetsaved2 = /** @type {(inputs: Savedpresetsaved2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`已保存预设：${i?.name}`)
};

const ja_savedpresetsaved2 = /** @type {(inputs: Savedpresetsaved2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`保存されたプリセット: ${i?.name}`)
};

const ko_savedpresetsaved2 = /** @type {(inputs: Savedpresetsaved2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`저장된 사전 설정: ${i?.name}`)
};

const zh_hant1_savedpresetsaved2 = /** @type {(inputs: Savedpresetsaved2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`已儲存預設：${i?.name}`)
};

const de_savedpresetsaved2 = /** @type {(inputs: Savedpresetsaved2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Gespeicherte Voreinstellung: ${i?.name}`)
};

const fr_savedpresetsaved2 = /** @type {(inputs: Savedpresetsaved2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Préréglage enregistré : ${i?.name}`)
};

/**
* | output |
* | --- |
* | "Saved preset: {name}" |
*
* @param {Savedpresetsaved2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const savedpresetsaved2 = /** @type {((inputs: Savedpresetsaved2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Savedpresetsaved2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_savedpresetsaved2(inputs)
	if (locale === "es") return es_savedpresetsaved2(inputs)
	if (locale === "zh") return zh_savedpresetsaved2(inputs)
	if (locale === "ja") return ja_savedpresetsaved2(inputs)
	if (locale === "ko") return ko_savedpresetsaved2(inputs)
	if (locale === "zh-Hant") return zh_hant1_savedpresetsaved2(inputs)
	if (locale === "de") return de_savedpresetsaved2(inputs)
	return fr_savedpresetsaved2(inputs)
});
export { savedpresetsaved2 as "savedPresetSaved" }