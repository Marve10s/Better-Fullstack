/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Runseotitle2Inputs */

const en_runseotitle2 = /** @type {(inputs: Runseotitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Run ScaffBench yourself`)
};

const es_runseotitle2 = /** @type {(inputs: Runseotitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ejecuta ScaffBench tú mismo`)
};

const zh_runseotitle2 = /** @type {(inputs: Runseotitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`自行运行 ScaffBench`)
};

const ja_runseotitle2 = /** @type {(inputs: Runseotitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ScaffBenchを自分で実行してみましょう`)
};

const ko_runseotitle2 = /** @type {(inputs: Runseotitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ScaffBench를 직접 실행해 보세요.`)
};

const zh_hant1_runseotitle2 = /** @type {(inputs: Runseotitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`自行運行 ScaffBench`)
};

const de_runseotitle2 = /** @type {(inputs: Runseotitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Betreibe ScaffBench selbst`)
};

const fr_runseotitle2 = /** @type {(inputs: Runseotitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Exécutez ScaffBench vous-même`)
};

/**
* | output |
* | --- |
* | "Run ScaffBench yourself" |
*
* @param {Runseotitle2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const runseotitle2 = /** @type {((inputs?: Runseotitle2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Runseotitle2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_runseotitle2(inputs)
	if (locale === "es") return es_runseotitle2(inputs)
	if (locale === "zh") return zh_runseotitle2(inputs)
	if (locale === "ja") return ja_runseotitle2(inputs)
	if (locale === "ko") return ko_runseotitle2(inputs)
	if (locale === "zh-Hant") return zh_hant1_runseotitle2(inputs)
	if (locale === "de") return de_runseotitle2(inputs)
	return fr_runseotitle2(inputs)
});
export { runseotitle2 as "runSeoTitle" }