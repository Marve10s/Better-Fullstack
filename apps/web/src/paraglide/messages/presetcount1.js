/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ count: NonNullable<unknown> }} Presetcount1Inputs */

const en_presetcount1 = /** @type {(inputs: Presetcount1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} presets`)
};

const es_presetcount1 = /** @type {(inputs: Presetcount1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} plantillas`)
};

const zh_presetcount1 = /** @type {(inputs: Presetcount1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 个预设`)
};

const ja_presetcount1 = /** @type {(inputs: Presetcount1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} プリセット`)
};

const ko_presetcount1 = /** @type {(inputs: Presetcount1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 사전 설정`)
};

const zh_hant1_presetcount1 = /** @type {(inputs: Presetcount1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} 個預設`)
};

const de_presetcount1 = /** @type {(inputs: Presetcount1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} Voreinstellungen`)
};

const fr_presetcount1 = /** @type {(inputs: Presetcount1Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.count} préréglages`)
};

/**
* | output |
* | --- |
* | "{count} presets" |
*
* @param {Presetcount1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const presetcount1 = /** @type {((inputs: Presetcount1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presetcount1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_presetcount1(inputs)
	if (locale === "es") return es_presetcount1(inputs)
	if (locale === "zh") return zh_presetcount1(inputs)
	if (locale === "ja") return ja_presetcount1(inputs)
	if (locale === "ko") return ko_presetcount1(inputs)
	if (locale === "zh-Hant") return zh_hant1_presetcount1(inputs)
	if (locale === "de") return de_presetcount1(inputs)
	return fr_presetcount1(inputs)
});
export { presetcount1 as "presetCount" }