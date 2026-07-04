/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Navcommandcopied2Inputs */

const en_navcommandcopied2 = /** @type {(inputs: Navcommandcopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Command copied`)
};

const es_navcommandcopied2 = /** @type {(inputs: Navcommandcopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Comando copiado`)
};

const zh_navcommandcopied2 = /** @type {(inputs: Navcommandcopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`命令已复制`)
};

const ja_navcommandcopied2 = /** @type {(inputs: Navcommandcopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`コマンドがコピーされました`)
};

const ko_navcommandcopied2 = /** @type {(inputs: Navcommandcopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`명령이 복사되었습니다.`)
};

const zh_hant1_navcommandcopied2 = /** @type {(inputs: Navcommandcopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`命令已複製`)
};

const de_navcommandcopied2 = /** @type {(inputs: Navcommandcopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Befehl kopiert`)
};

const fr_navcommandcopied2 = /** @type {(inputs: Navcommandcopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Commande copiée`)
};

const uk_navcommandcopied2 = /** @type {(inputs: Navcommandcopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Команду скопійовано`)
};

/**
* | output |
* | --- |
* | "Command copied" |
*
* @param {Navcommandcopied2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const navcommandcopied2 = /** @type {((inputs?: Navcommandcopied2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Navcommandcopied2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_navcommandcopied2(inputs)
	if (locale === "es") return es_navcommandcopied2(inputs)
	if (locale === "zh") return zh_navcommandcopied2(inputs)
	if (locale === "ja") return ja_navcommandcopied2(inputs)
	if (locale === "ko") return ko_navcommandcopied2(inputs)
	if (locale === "zh-Hant") return zh_hant1_navcommandcopied2(inputs)
	if (locale === "de") return de_navcommandcopied2(inputs)
	if (locale === "fr") return fr_navcommandcopied2(inputs)
	return uk_navcommandcopied2(inputs)
});
export { navcommandcopied2 as "navCommandCopied" }