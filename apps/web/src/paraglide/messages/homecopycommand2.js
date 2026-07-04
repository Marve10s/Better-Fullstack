/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homecopycommand2Inputs */

const en_homecopycommand2 = /** @type {(inputs: Homecopycommand2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copy command`)
};

const es_homecopycommand2 = /** @type {(inputs: Homecopycommand2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copiar comando`)
};

const zh_homecopycommand2 = /** @type {(inputs: Homecopycommand2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`复制命令`)
};

const ja_homecopycommand2 = /** @type {(inputs: Homecopycommand2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`コピーコマンド`)
};

const ko_homecopycommand2 = /** @type {(inputs: Homecopycommand2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`복사 명령`)
};

const zh_hant1_homecopycommand2 = /** @type {(inputs: Homecopycommand2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`複製指令`)
};

const de_homecopycommand2 = /** @type {(inputs: Homecopycommand2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Befehl kopieren`)
};

const fr_homecopycommand2 = /** @type {(inputs: Homecopycommand2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Commande Copier`)
};

/**
* | output |
* | --- |
* | "Copy command" |
*
* @param {Homecopycommand2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const homecopycommand2 = /** @type {((inputs?: Homecopycommand2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homecopycommand2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homecopycommand2(inputs)
	if (locale === "es") return es_homecopycommand2(inputs)
	if (locale === "zh") return zh_homecopycommand2(inputs)
	if (locale === "ja") return ja_homecopycommand2(inputs)
	if (locale === "ko") return ko_homecopycommand2(inputs)
	if (locale === "zh-Hant") return zh_hant1_homecopycommand2(inputs)
	if (locale === "de") return de_homecopycommand2(inputs)
	return fr_homecopycommand2(inputs)
});
export { homecopycommand2 as "homeCopyCommand" }