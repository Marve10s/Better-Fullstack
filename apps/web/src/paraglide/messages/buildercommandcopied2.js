/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercommandcopied2Inputs */

const en_buildercommandcopied2 = /** @type {(inputs: Buildercommandcopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Command copied`)
};

const es_buildercommandcopied2 = /** @type {(inputs: Buildercommandcopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Comando copiado`)
};

const zh_buildercommandcopied2 = /** @type {(inputs: Buildercommandcopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`命令已复制`)
};

const ja_buildercommandcopied2 = /** @type {(inputs: Buildercommandcopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`コマンドがコピーされました`)
};

const ko_buildercommandcopied2 = /** @type {(inputs: Buildercommandcopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`명령이 복사되었습니다.`)
};

const zh_hant1_buildercommandcopied2 = /** @type {(inputs: Buildercommandcopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`命令已複製`)
};

const de_buildercommandcopied2 = /** @type {(inputs: Buildercommandcopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Befehl kopiert`)
};

const fr_buildercommandcopied2 = /** @type {(inputs: Buildercommandcopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Commande copiée`)
};

const uk_buildercommandcopied2 = /** @type {(inputs: Buildercommandcopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Команду скопійовано`)
};

/**
* | output |
* | --- |
* | "Command copied" |
*
* @param {Buildercommandcopied2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercommandcopied2 = /** @type {((inputs?: Buildercommandcopied2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercommandcopied2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildercommandcopied2(inputs)
	if (locale === "es") return es_buildercommandcopied2(inputs)
	if (locale === "zh") return zh_buildercommandcopied2(inputs)
	if (locale === "ja") return ja_buildercommandcopied2(inputs)
	if (locale === "ko") return ko_buildercommandcopied2(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildercommandcopied2(inputs)
	if (locale === "de") return de_buildercommandcopied2(inputs)
	if (locale === "fr") return fr_buildercommandcopied2(inputs)
	return uk_buildercommandcopied2(inputs)
});
export { buildercommandcopied2 as "builderCommandCopied" }