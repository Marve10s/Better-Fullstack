/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Runherotitlea3Inputs */

const en_runherotitlea3 = /** @type {(inputs: Runherotitlea3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Run ScaffBench`)
};

const es_runherotitlea3 = /** @type {(inputs: Runherotitlea3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Run ScaffBench`)
};

const zh_runherotitlea3 = /** @type {(inputs: Runherotitlea3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`运行 ScaffBench`)
};

const ja_runherotitlea3 = /** @type {(inputs: Runherotitlea3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ScaffBenchを実行する`)
};

const ko_runherotitlea3 = /** @type {(inputs: Runherotitlea3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ScaffBench 실행`)
};

const zh_hant1_runherotitlea3 = /** @type {(inputs: Runherotitlea3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`運行 ScaffBench`)
};

const de_runherotitlea3 = /** @type {(inputs: Runherotitlea3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Run ScaffBench`)
};

const fr_runherotitlea3 = /** @type {(inputs: Runherotitlea3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Exécuter ScaffBench`)
};

/**
* | output |
* | --- |
* | "Run ScaffBench" |
*
* @param {Runherotitlea3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const runherotitlea3 = /** @type {((inputs?: Runherotitlea3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Runherotitlea3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_runherotitlea3(inputs)
	if (locale === "es") return es_runherotitlea3(inputs)
	if (locale === "zh") return zh_runherotitlea3(inputs)
	if (locale === "ja") return ja_runherotitlea3(inputs)
	if (locale === "ko") return ko_runherotitlea3(inputs)
	if (locale === "zh-Hant") return zh_hant1_runherotitlea3(inputs)
	if (locale === "de") return de_runherotitlea3(inputs)
	return fr_runherotitlea3(inputs)
});
export { runherotitlea3 as "runHeroTitleA" }