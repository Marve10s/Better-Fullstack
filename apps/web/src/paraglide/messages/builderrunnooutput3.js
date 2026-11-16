/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderrunnooutput3Inputs */



/**
* | output |
* | --- |
* | "Waiting for runtime output" |
*
* @param {Builderrunnooutput3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderrunnooutput3 = /** @type {((inputs?: Builderrunnooutput3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderrunnooutput3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Esperando salida del entorno")
	if (locale === "zh") return /** @type {LocalizedString} */ ("正在等待运行时输出")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ランタイム出力を待機中")
	if (locale === "ko") return /** @type {LocalizedString} */ ("런타임 출력 대기 중")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("正在等待執行階段輸出")
	if (locale === "de") return /** @type {LocalizedString} */ ("Warte auf Laufzeitausgabe")
	if (locale === "fr") return /** @type {LocalizedString} */ ("En attente de la sortie d’exécution")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Очікування виводу середовища")
	return /** @type {LocalizedString} */ ("Waiting for runtime output")
});
export { builderrunnooutput3 as "builderRunNoOutput" }