/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Runflagstitle2Inputs */

const en_runflagstitle2 = /** @type {(inputs: Runflagstitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Tune the run`)
};

const es_runflagstitle2 = /** @type {(inputs: Runflagstitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ajusta la carrera`)
};

const zh_runflagstitle2 = /** @type {(inputs: Runflagstitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`调整运行`)
};

const ja_runflagstitle2 = /** @type {(inputs: Runflagstitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ランニングの調整`)
};

const ko_runflagstitle2 = /** @type {(inputs: Runflagstitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`달리기를 조정하세요`)
};

const zh_hant1_runflagstitle2 = /** @type {(inputs: Runflagstitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`調整運行`)
};

const de_runflagstitle2 = /** @type {(inputs: Runflagstitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Den Lauf optimieren`)
};

const fr_runflagstitle2 = /** @type {(inputs: Runflagstitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Accordez la course`)
};

/**
* | output |
* | --- |
* | "Tune the run" |
*
* @param {Runflagstitle2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const runflagstitle2 = /** @type {((inputs?: Runflagstitle2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Runflagstitle2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_runflagstitle2(inputs)
	if (locale === "es") return es_runflagstitle2(inputs)
	if (locale === "zh") return zh_runflagstitle2(inputs)
	if (locale === "ja") return ja_runflagstitle2(inputs)
	if (locale === "ko") return ko_runflagstitle2(inputs)
	if (locale === "zh-Hant") return zh_hant1_runflagstitle2(inputs)
	if (locale === "de") return de_runflagstitle2(inputs)
	return fr_runflagstitle2(inputs)
});
export { runflagstitle2 as "runFlagsTitle" }