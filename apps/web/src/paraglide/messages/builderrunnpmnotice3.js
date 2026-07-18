/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderrunnpmnotice3Inputs */

const en_builderrunnpmnotice3 = /** @type {(inputs: Builderrunnpmnotice3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The disposable runtime copy uses npm`)
};

const es_builderrunnpmnotice3 = /** @type {(inputs: Builderrunnpmnotice3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`La copia temporal de ejecución usa npm`)
};

const zh_builderrunnpmnotice3 = /** @type {(inputs: Builderrunnpmnotice3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`临时运行副本使用 npm`)
};

const ja_builderrunnpmnotice3 = /** @type {(inputs: Builderrunnpmnotice3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`一時的な実行用コピーでは npm を使用します`)
};

const ko_builderrunnpmnotice3 = /** @type {(inputs: Builderrunnpmnotice3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`임시 실행 복사본은 npm을 사용합니다`)
};

const zh_hant1_builderrunnpmnotice3 = /** @type {(inputs: Builderrunnpmnotice3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`暫時執行副本使用 npm`)
};

const de_builderrunnpmnotice3 = /** @type {(inputs: Builderrunnpmnotice3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Die temporäre Laufzeitkopie verwendet npm`)
};

const fr_builderrunnpmnotice3 = /** @type {(inputs: Builderrunnpmnotice3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`La copie d’exécution temporaire utilise npm`)
};

const uk_builderrunnpmnotice3 = /** @type {(inputs: Builderrunnpmnotice3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Тимчасова копія для запуску використовує npm`)
};

/**
* | output |
* | --- |
* | "The disposable runtime copy uses npm" |
*
* @param {Builderrunnpmnotice3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderrunnpmnotice3 = /** @type {((inputs?: Builderrunnpmnotice3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderrunnpmnotice3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderrunnpmnotice3(inputs)
	if (locale === "es") return es_builderrunnpmnotice3(inputs)
	if (locale === "zh") return zh_builderrunnpmnotice3(inputs)
	if (locale === "ja") return ja_builderrunnpmnotice3(inputs)
	if (locale === "ko") return ko_builderrunnpmnotice3(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderrunnpmnotice3(inputs)
	if (locale === "de") return de_builderrunnpmnotice3(inputs)
	if (locale === "fr") return fr_builderrunnpmnotice3(inputs)
	return uk_builderrunnpmnotice3(inputs)
});
export { builderrunnpmnotice3 as "builderRunNpmNotice" }