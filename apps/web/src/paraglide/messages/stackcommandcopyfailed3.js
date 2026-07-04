/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Stackcommandcopyfailed3Inputs */

const en_stackcommandcopyfailed3 = /** @type {(inputs: Stackcommandcopyfailed3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Failed to copy command`)
};

const es_stackcommandcopyfailed3 = /** @type {(inputs: Stackcommandcopyfailed3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No se pudo copiar el comando`)
};

const zh_stackcommandcopyfailed3 = /** @type {(inputs: Stackcommandcopyfailed3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`复制命令失败`)
};

const ja_stackcommandcopyfailed3 = /** @type {(inputs: Stackcommandcopyfailed3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`コマンドのコピーに失敗しました`)
};

const ko_stackcommandcopyfailed3 = /** @type {(inputs: Stackcommandcopyfailed3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`명령을 복사하지 못했습니다.`)
};

const zh_hant1_stackcommandcopyfailed3 = /** @type {(inputs: Stackcommandcopyfailed3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`複製命令失敗`)
};

const de_stackcommandcopyfailed3 = /** @type {(inputs: Stackcommandcopyfailed3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Befehl konnte nicht kopiert werden`)
};

const fr_stackcommandcopyfailed3 = /** @type {(inputs: Stackcommandcopyfailed3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Échec de la copie de la commande`)
};

const uk_stackcommandcopyfailed3 = /** @type {(inputs: Stackcommandcopyfailed3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Не вдалося скопіювати команду`)
};

/**
* | output |
* | --- |
* | "Failed to copy command" |
*
* @param {Stackcommandcopyfailed3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const stackcommandcopyfailed3 = /** @type {((inputs?: Stackcommandcopyfailed3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Stackcommandcopyfailed3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_stackcommandcopyfailed3(inputs)
	if (locale === "es") return es_stackcommandcopyfailed3(inputs)
	if (locale === "zh") return zh_stackcommandcopyfailed3(inputs)
	if (locale === "ja") return ja_stackcommandcopyfailed3(inputs)
	if (locale === "ko") return ko_stackcommandcopyfailed3(inputs)
	if (locale === "zh-Hant") return zh_hant1_stackcommandcopyfailed3(inputs)
	if (locale === "de") return de_stackcommandcopyfailed3(inputs)
	if (locale === "fr") return fr_stackcommandcopyfailed3(inputs)
	return uk_stackcommandcopyfailed3(inputs)
});
export { stackcommandcopyfailed3 as "stackCommandCopyFailed" }