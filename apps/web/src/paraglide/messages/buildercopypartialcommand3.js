/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercopypartialcommand3Inputs */

const en_buildercopypartialcommand3 = /** @type {(inputs: Buildercopypartialcommand3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copy partial command`)
};

const es_buildercopypartialcommand3 = /** @type {(inputs: Buildercopypartialcommand3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copiar comando parcial`)
};

const zh_buildercopypartialcommand3 = /** @type {(inputs: Buildercopypartialcommand3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`复制部分命令`)
};

const ja_buildercopypartialcommand3 = /** @type {(inputs: Buildercopypartialcommand3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`部分コピーコマンド`)
};

const ko_buildercopypartialcommand3 = /** @type {(inputs: Buildercopypartialcommand3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`부분 명령 복사`)
};

const zh_hant1_buildercopypartialcommand3 = /** @type {(inputs: Buildercopypartialcommand3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`複製部分命令`)
};

const de_buildercopypartialcommand3 = /** @type {(inputs: Buildercopypartialcommand3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Teilbefehl kopieren`)
};

const fr_buildercopypartialcommand3 = /** @type {(inputs: Buildercopypartialcommand3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Copier une commande partielle`)
};

/**
* | output |
* | --- |
* | "Copy partial command" |
*
* @param {Buildercopypartialcommand3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const buildercopypartialcommand3 = /** @type {((inputs?: Buildercopypartialcommand3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercopypartialcommand3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildercopypartialcommand3(inputs)
	if (locale === "es") return es_buildercopypartialcommand3(inputs)
	if (locale === "zh") return zh_buildercopypartialcommand3(inputs)
	if (locale === "ja") return ja_buildercopypartialcommand3(inputs)
	if (locale === "ko") return ko_buildercopypartialcommand3(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildercopypartialcommand3(inputs)
	if (locale === "de") return de_buildercopypartialcommand3(inputs)
	return fr_buildercopypartialcommand3(inputs)
});
export { buildercopypartialcommand3 as "builderCopyPartialCommand" }