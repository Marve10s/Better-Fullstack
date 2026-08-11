/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderrunfailed2Inputs */

const en_builderrunfailed2 = /** @type {(inputs: Builderrunfailed2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Run failed`)
};

const es_builderrunfailed2 = /** @type {(inputs: Builderrunfailed2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`La ejecución falló`)
};

const zh_builderrunfailed2 = /** @type {(inputs: Builderrunfailed2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`运行失败`)
};

const ja_builderrunfailed2 = /** @type {(inputs: Builderrunfailed2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`実行に失敗しました`)
};

const ko_builderrunfailed2 = /** @type {(inputs: Builderrunfailed2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`실행 실패`)
};

const zh_hant1_builderrunfailed2 = /** @type {(inputs: Builderrunfailed2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`執行失敗`)
};

const de_builderrunfailed2 = /** @type {(inputs: Builderrunfailed2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ausführung fehlgeschlagen`)
};

const fr_builderrunfailed2 = /** @type {(inputs: Builderrunfailed2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Échec de l’exécution`)
};

const uk_builderrunfailed2 = /** @type {(inputs: Builderrunfailed2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Помилка запуску`)
};

/**
* | output |
* | --- |
* | "Run failed" |
*
* @param {Builderrunfailed2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderrunfailed2 = /** @type {((inputs?: Builderrunfailed2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderrunfailed2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_builderrunfailed2(inputs)
	if (locale === "zh") return zh_builderrunfailed2(inputs)
	if (locale === "ja") return ja_builderrunfailed2(inputs)
	if (locale === "ko") return ko_builderrunfailed2(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderrunfailed2(inputs)
	if (locale === "de") return de_builderrunfailed2(inputs)
	if (locale === "fr") return fr_builderrunfailed2(inputs)
	if (locale === "uk") return uk_builderrunfailed2(inputs)
	return en_builderrunfailed2(inputs)
});
export { builderrunfailed2 as "builderRunFailed" }