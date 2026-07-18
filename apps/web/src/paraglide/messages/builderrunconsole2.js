/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderrunconsole2Inputs */

const en_builderrunconsole2 = /** @type {(inputs: Builderrunconsole2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Runtime output`)
};

const es_builderrunconsole2 = /** @type {(inputs: Builderrunconsole2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Salida de ejecución`)
};

const zh_builderrunconsole2 = /** @type {(inputs: Builderrunconsole2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`运行时输出`)
};

const ja_builderrunconsole2 = /** @type {(inputs: Builderrunconsole2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ランタイム出力`)
};

const ko_builderrunconsole2 = /** @type {(inputs: Builderrunconsole2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`런타임 출력`)
};

const zh_hant1_builderrunconsole2 = /** @type {(inputs: Builderrunconsole2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`執行階段輸出`)
};

const de_builderrunconsole2 = /** @type {(inputs: Builderrunconsole2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Laufzeitausgabe`)
};

const fr_builderrunconsole2 = /** @type {(inputs: Builderrunconsole2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Sortie d’exécution`)
};

const uk_builderrunconsole2 = /** @type {(inputs: Builderrunconsole2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Вивід середовища`)
};

/**
* | output |
* | --- |
* | "Runtime output" |
*
* @param {Builderrunconsole2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderrunconsole2 = /** @type {((inputs?: Builderrunconsole2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderrunconsole2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderrunconsole2(inputs)
	if (locale === "es") return es_builderrunconsole2(inputs)
	if (locale === "zh") return zh_builderrunconsole2(inputs)
	if (locale === "ja") return ja_builderrunconsole2(inputs)
	if (locale === "ko") return ko_builderrunconsole2(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderrunconsole2(inputs)
	if (locale === "de") return de_builderrunconsole2(inputs)
	if (locale === "fr") return fr_builderrunconsole2(inputs)
	return uk_builderrunconsole2(inputs)
});
export { builderrunconsole2 as "builderRunConsole" }