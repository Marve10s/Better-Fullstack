/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Runflagspecs2Inputs */

const en_runflagspecs2 = /** @type {(inputs: Runflagspecs2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`the full 13-spec suite by default, or a comma-separated subset of spec ids`)
};

const es_runflagspecs2 = /** @type {(inputs: Runflagspecs2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`El conjunto completo de 13 especificaciones por defecto, o un subconjunto de identificadores de especificaciones separados por comas.`)
};

const zh_runflagspecs2 = /** @type {(inputs: Runflagspecs2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`默认情况下，使用完整的 13 个规范套件；或者使用以逗号分隔的规范 ID 子集。`)
};

const ja_runflagspecs2 = /** @type {(inputs: Runflagspecs2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`デフォルトでは13個の仕様すべて、またはカンマ区切りの仕様IDのサブセット`)
};

const ko_runflagspecs2 = /** @type {(inputs: Runflagspecs2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`기본적으로 13개 사양 전체 또는 쉼표로 구분된 사양 ID 하위 집합을 사용할 수 있습니다.`)
};

const zh_hant1_runflagspecs2 = /** @type {(inputs: Runflagspecs2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`預設情況下，使用完整的 13 個規範套件；或使用以逗號分隔的規範 ID 子集。`)
};

const de_runflagspecs2 = /** @type {(inputs: Runflagspecs2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Standardmäßig die vollständige Suite mit 13 Spezifikationen oder eine durch Kommas getrennte Teilmenge der Spezifikations-IDs.`)
};

const fr_runflagspecs2 = /** @type {(inputs: Runflagspecs2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`par défaut, la suite complète de 13 spécifications, ou un sous-ensemble d'identifiants de spécifications séparés par des virgules.`)
};

const uk_runflagspecs2 = /** @type {(inputs: Runflagspecs2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`повний набір із 13 специфікацій за замовчуванням або підмножина специфікацій, розділених комами`)
};

/**
* | output |
* | --- |
* | "the full 13-spec suite by default, or a comma-separated subset of spec ids" |
*
* @param {Runflagspecs2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const runflagspecs2 = /** @type {((inputs?: Runflagspecs2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Runflagspecs2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_runflagspecs2(inputs)
	if (locale === "es") return es_runflagspecs2(inputs)
	if (locale === "zh") return zh_runflagspecs2(inputs)
	if (locale === "ja") return ja_runflagspecs2(inputs)
	if (locale === "ko") return ko_runflagspecs2(inputs)
	if (locale === "zh-Hant") return zh_hant1_runflagspecs2(inputs)
	if (locale === "de") return de_runflagspecs2(inputs)
	if (locale === "fr") return fr_runflagspecs2(inputs)
	return uk_runflagspecs2(inputs)
});
export { runflagspecs2 as "runFlagSpecs" }