/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Stackcommandcopied2Inputs */

const en_stackcommandcopied2 = /** @type {(inputs: Stackcommandcopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Command copied to clipboard!`)
};

const es_stackcommandcopied2 = /** @type {(inputs: Stackcommandcopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Comando copiado al portapapeles.`)
};

const zh_stackcommandcopied2 = /** @type {(inputs: Stackcommandcopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`命令已复制到剪贴板！`)
};

const ja_stackcommandcopied2 = /** @type {(inputs: Stackcommandcopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`コマンドがクリップボードにコピーされました!`)
};

const ko_stackcommandcopied2 = /** @type {(inputs: Stackcommandcopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`명령이 클립보드에 복사되었습니다!`)
};

const zh_hant1_stackcommandcopied2 = /** @type {(inputs: Stackcommandcopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`命令已複製到剪貼簿！`)
};

const de_stackcommandcopied2 = /** @type {(inputs: Stackcommandcopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Befehl in die Zwischenablage kopiert!`)
};

const fr_stackcommandcopied2 = /** @type {(inputs: Stackcommandcopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Commande copiée dans le presse-papier !`)
};

const uk_stackcommandcopied2 = /** @type {(inputs: Stackcommandcopied2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Команду скопійовано в буфер обміну!`)
};

/**
* | output |
* | --- |
* | "Command copied to clipboard!" |
*
* @param {Stackcommandcopied2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const stackcommandcopied2 = /** @type {((inputs?: Stackcommandcopied2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Stackcommandcopied2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_stackcommandcopied2(inputs)
	if (locale === "es") return es_stackcommandcopied2(inputs)
	if (locale === "zh") return zh_stackcommandcopied2(inputs)
	if (locale === "ja") return ja_stackcommandcopied2(inputs)
	if (locale === "ko") return ko_stackcommandcopied2(inputs)
	if (locale === "zh-Hant") return zh_hant1_stackcommandcopied2(inputs)
	if (locale === "de") return de_stackcommandcopied2(inputs)
	if (locale === "fr") return fr_stackcommandcopied2(inputs)
	return uk_stackcommandcopied2(inputs)
});
export { stackcommandcopied2 as "stackCommandCopied" }