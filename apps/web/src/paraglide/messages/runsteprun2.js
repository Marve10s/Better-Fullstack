/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Runsteprun2Inputs */

const en_runsteprun2 = /** @type {(inputs: Runsteprun2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Run the benchmark`)
};

const es_runsteprun2 = /** @type {(inputs: Runsteprun2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ejecutar la prueba de rendimiento`)
};

const zh_runsteprun2 = /** @type {(inputs: Runsteprun2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`运行基准测试`)
};

const ja_runsteprun2 = /** @type {(inputs: Runsteprun2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ベンチマークを実行する`)
};

const ko_runsteprun2 = /** @type {(inputs: Runsteprun2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`벤치마크를 실행하세요`)
};

const zh_hant1_runsteprun2 = /** @type {(inputs: Runsteprun2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`運行基準測試`)
};

const de_runsteprun2 = /** @type {(inputs: Runsteprun2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Führen Sie den Benchmark aus.`)
};

const fr_runsteprun2 = /** @type {(inputs: Runsteprun2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Exécuter le test de performance`)
};

/**
* | output |
* | --- |
* | "Run the benchmark" |
*
* @param {Runsteprun2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const runsteprun2 = /** @type {((inputs?: Runsteprun2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Runsteprun2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_runsteprun2(inputs)
	if (locale === "es") return es_runsteprun2(inputs)
	if (locale === "zh") return zh_runsteprun2(inputs)
	if (locale === "ja") return ja_runsteprun2(inputs)
	if (locale === "ko") return ko_runsteprun2(inputs)
	if (locale === "zh-Hant") return zh_hant1_runsteprun2(inputs)
	if (locale === "de") return de_runsteprun2(inputs)
	return fr_runsteprun2(inputs)
});
export { runsteprun2 as "runStepRun" }