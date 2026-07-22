/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderruntitle2Inputs */

const en_builderruntitle2 = /** @type {(inputs: Builderruntitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Run this stack`)
};

const es_builderruntitle2 = /** @type {(inputs: Builderruntitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ejecutar este stack`)
};

const zh_builderruntitle2 = /** @type {(inputs: Builderruntitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`运行此技术栈`)
};

const ja_builderruntitle2 = /** @type {(inputs: Builderruntitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`このスタックを実行`)
};

const ko_builderruntitle2 = /** @type {(inputs: Builderruntitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`이 스택 실행`)
};

const zh_hant1_builderruntitle2 = /** @type {(inputs: Builderruntitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`執行此技術棧`)
};

const de_builderruntitle2 = /** @type {(inputs: Builderruntitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Diesen Stack ausführen`)
};

const fr_builderruntitle2 = /** @type {(inputs: Builderruntitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Exécuter cette stack`)
};

const uk_builderruntitle2 = /** @type {(inputs: Builderruntitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Запустити цей стек`)
};

/**
* | output |
* | --- |
* | "Run this stack" |
*
* @param {Builderruntitle2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderruntitle2 = /** @type {((inputs?: Builderruntitle2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderruntitle2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderruntitle2(inputs)
	if (locale === "es") return es_builderruntitle2(inputs)
	if (locale === "zh") return zh_builderruntitle2(inputs)
	if (locale === "ja") return ja_builderruntitle2(inputs)
	if (locale === "ko") return ko_builderruntitle2(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderruntitle2(inputs)
	if (locale === "de") return de_builderruntitle2(inputs)
	if (locale === "fr") return fr_builderruntitle2(inputs)
	return uk_builderruntitle2(inputs)
});
export { builderruntitle2 as "builderRunTitle" }