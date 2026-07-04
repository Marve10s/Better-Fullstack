/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercopycommand2Inputs */

const en_buildercopycommand2 = /** @type {(inputs: Buildercopycommand2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copy command`)
};

const es_buildercopycommand2 = /** @type {(inputs: Buildercopycommand2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copiar comando`)
};

const zh_buildercopycommand2 = /** @type {(inputs: Buildercopycommand2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`复制命令`)
};

const ja_buildercopycommand2 = /** @type {(inputs: Buildercopycommand2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`コピーコマンド`)
};

const ko_buildercopycommand2 = /** @type {(inputs: Buildercopycommand2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`복사 명령`)
};

const zh_hant1_buildercopycommand2 = /** @type {(inputs: Buildercopycommand2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`複製指令`)
};

const de_buildercopycommand2 = /** @type {(inputs: Buildercopycommand2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Befehl kopieren`)
};

const fr_buildercopycommand2 = /** @type {(inputs: Buildercopycommand2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Commande Copier`)
};

/**
* | output |
* | --- |
* | "Copy command" |
*
* @param {Buildercopycommand2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const buildercopycommand2 = /** @type {((inputs?: Buildercopycommand2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercopycommand2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildercopycommand2(inputs)
	if (locale === "es") return es_buildercopycommand2(inputs)
	if (locale === "zh") return zh_buildercopycommand2(inputs)
	if (locale === "ja") return ja_buildercopycommand2(inputs)
	if (locale === "ko") return ko_buildercopycommand2(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildercopycommand2(inputs)
	if (locale === "de") return de_buildercopycommand2(inputs)
	return fr_buildercopycommand2(inputs)
});
export { buildercopycommand2 as "builderCopyCommand" }