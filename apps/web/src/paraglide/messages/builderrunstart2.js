/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderrunstart2Inputs */

const en_builderrunstart2 = /** @type {(inputs: Builderrunstart2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Run stack`)
};

const es_builderrunstart2 = /** @type {(inputs: Builderrunstart2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ejecutar stack`)
};

const zh_builderrunstart2 = /** @type {(inputs: Builderrunstart2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`运行技术栈`)
};

const ja_builderrunstart2 = /** @type {(inputs: Builderrunstart2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`スタックを実行`)
};

const ko_builderrunstart2 = /** @type {(inputs: Builderrunstart2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`스택 실행`)
};

const zh_hant1_builderrunstart2 = /** @type {(inputs: Builderrunstart2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`執行技術棧`)
};

const de_builderrunstart2 = /** @type {(inputs: Builderrunstart2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Stack ausführen`)
};

const fr_builderrunstart2 = /** @type {(inputs: Builderrunstart2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Exécuter la stack`)
};

const uk_builderrunstart2 = /** @type {(inputs: Builderrunstart2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Запустити стек`)
};

/**
* | output |
* | --- |
* | "Run stack" |
*
* @param {Builderrunstart2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderrunstart2 = /** @type {((inputs?: Builderrunstart2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderrunstart2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_builderrunstart2(inputs)
	if (locale === "zh") return zh_builderrunstart2(inputs)
	if (locale === "ja") return ja_builderrunstart2(inputs)
	if (locale === "ko") return ko_builderrunstart2(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderrunstart2(inputs)
	if (locale === "de") return de_builderrunstart2(inputs)
	if (locale === "fr") return fr_builderrunstart2(inputs)
	if (locale === "uk") return uk_builderrunstart2(inputs)
	return en_builderrunstart2(inputs)
});
export { builderrunstart2 as "builderRunStart" }