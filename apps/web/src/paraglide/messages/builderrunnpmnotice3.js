/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderrunnpmnotice3Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("La copia temporal de ejecución usa npm")
	if (locale === "zh") return /** @type {LocalizedString} */ ("临时运行副本使用 npm")
	if (locale === "ja") return /** @type {LocalizedString} */ ("一時的な実行用コピーでは npm を使用します")
	if (locale === "ko") return /** @type {LocalizedString} */ ("임시 실행 복사본은 npm을 사용합니다")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("暫時執行副本使用 npm")
	if (locale === "de") return /** @type {LocalizedString} */ ("Die temporäre Laufzeitkopie verwendet npm")
	if (locale === "fr") return /** @type {LocalizedString} */ ("La copie d’exécution temporaire utilise npm")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Тимчасова копія для запуску використовує npm")
	return /** @type {LocalizedString} */ ("The disposable runtime copy uses npm")
});
export { builderrunnpmnotice3 as "builderRunNpmNotice" }