/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Savedpresetrenamed2Inputs */

const en_savedpresetrenamed2 = /** @type {(inputs: Savedpresetrenamed2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Preset renamed`)
};

const es_savedpresetrenamed2 = /** @type {(inputs: Savedpresetrenamed2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Plantilla renombrada`)
};

const zh_savedpresetrenamed2 = /** @type {(inputs: Savedpresetrenamed2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`预设已重命名`)
};

const ja_savedpresetrenamed2 = /** @type {(inputs: Savedpresetrenamed2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`プリセットの名前が変更されました`)
};

const ko_savedpresetrenamed2 = /** @type {(inputs: Savedpresetrenamed2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`사전 설정 이름이 변경됨`)
};

const zh_hant1_savedpresetrenamed2 = /** @type {(inputs: Savedpresetrenamed2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`預設已重新命名`)
};

const de_savedpresetrenamed2 = /** @type {(inputs: Savedpresetrenamed2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Voreinstellung umbenannt`)
};

const fr_savedpresetrenamed2 = /** @type {(inputs: Savedpresetrenamed2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Préréglage renommé`)
};

/**
* | output |
* | --- |
* | "Preset renamed" |
*
* @param {Savedpresetrenamed2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const savedpresetrenamed2 = /** @type {((inputs?: Savedpresetrenamed2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Savedpresetrenamed2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_savedpresetrenamed2(inputs)
	if (locale === "es") return es_savedpresetrenamed2(inputs)
	if (locale === "zh") return zh_savedpresetrenamed2(inputs)
	if (locale === "ja") return ja_savedpresetrenamed2(inputs)
	if (locale === "ko") return ko_savedpresetrenamed2(inputs)
	if (locale === "zh-Hant") return zh_hant1_savedpresetrenamed2(inputs)
	if (locale === "de") return de_savedpresetrenamed2(inputs)
	return fr_savedpresetrenamed2(inputs)
});
export { savedpresetrenamed2 as "savedPresetRenamed" }