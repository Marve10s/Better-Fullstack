/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderrunnooutput3Inputs */

const en_builderrunnooutput3 = /** @type {(inputs: Builderrunnooutput3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Waiting for runtime output`)
};

const es_builderrunnooutput3 = /** @type {(inputs: Builderrunnooutput3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Esperando salida del entorno`)
};

const zh_builderrunnooutput3 = /** @type {(inputs: Builderrunnooutput3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`正在等待运行时输出`)
};

const ja_builderrunnooutput3 = /** @type {(inputs: Builderrunnooutput3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ランタイム出力を待機中`)
};

const ko_builderrunnooutput3 = /** @type {(inputs: Builderrunnooutput3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`런타임 출력 대기 중`)
};

const zh_hant1_builderrunnooutput3 = /** @type {(inputs: Builderrunnooutput3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`正在等待執行階段輸出`)
};

const de_builderrunnooutput3 = /** @type {(inputs: Builderrunnooutput3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Warte auf Laufzeitausgabe`)
};

const fr_builderrunnooutput3 = /** @type {(inputs: Builderrunnooutput3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`En attente de la sortie d’exécution`)
};

const uk_builderrunnooutput3 = /** @type {(inputs: Builderrunnooutput3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Очікування виводу середовища`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_builderrunnooutput3(inputs)
	if (locale === "zh") return zh_builderrunnooutput3(inputs)
	if (locale === "ja") return ja_builderrunnooutput3(inputs)
	if (locale === "ko") return ko_builderrunnooutput3(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderrunnooutput3(inputs)
	if (locale === "de") return de_builderrunnooutput3(inputs)
	if (locale === "fr") return fr_builderrunnooutput3(inputs)
	if (locale === "uk") return uk_builderrunnooutput3(inputs)
	return en_builderrunnooutput3(inputs)
});
export { builderrunnooutput3 as "builderRunNoOutput" }