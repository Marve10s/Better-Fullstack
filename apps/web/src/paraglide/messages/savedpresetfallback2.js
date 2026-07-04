/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Savedpresetfallback2Inputs */

const en_savedpresetfallback2 = /** @type {(inputs: Savedpresetfallback2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Saved preset`)
};

const es_savedpresetfallback2 = /** @type {(inputs: Savedpresetfallback2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Plantilla guardada`)
};

const zh_savedpresetfallback2 = /** @type {(inputs: Savedpresetfallback2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已保存预设`)
};

const ja_savedpresetfallback2 = /** @type {(inputs: Savedpresetfallback2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`保存されたプリセット`)
};

const ko_savedpresetfallback2 = /** @type {(inputs: Savedpresetfallback2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`사전 설정이 저장되었습니다.`)
};

const zh_hant1_savedpresetfallback2 = /** @type {(inputs: Savedpresetfallback2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已儲存預設`)
};

const de_savedpresetfallback2 = /** @type {(inputs: Savedpresetfallback2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Voreinstellung gespeichert`)
};

const fr_savedpresetfallback2 = /** @type {(inputs: Savedpresetfallback2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Préréglage enregistré`)
};

/**
* | output |
* | --- |
* | "Saved preset" |
*
* @param {Savedpresetfallback2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const savedpresetfallback2 = /** @type {((inputs?: Savedpresetfallback2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Savedpresetfallback2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_savedpresetfallback2(inputs)
	if (locale === "es") return es_savedpresetfallback2(inputs)
	if (locale === "zh") return zh_savedpresetfallback2(inputs)
	if (locale === "ja") return ja_savedpresetfallback2(inputs)
	if (locale === "ko") return ko_savedpresetfallback2(inputs)
	if (locale === "zh-Hant") return zh_hant1_savedpresetfallback2(inputs)
	if (locale === "de") return de_savedpresetfallback2(inputs)
	return fr_savedpresetfallback2(inputs)
});
export { savedpresetfallback2 as "savedPresetFallback" }