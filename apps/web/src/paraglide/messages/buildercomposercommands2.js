/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposercommands2Inputs */

const en_buildercomposercommands2 = /** @type {(inputs: Buildercomposercommands2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Commands`)
};

const es_buildercomposercommands2 = /** @type {(inputs: Buildercomposercommands2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Comandos`)
};

const zh_buildercomposercommands2 = /** @type {(inputs: Buildercomposercommands2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`命令`)
};

const ja_buildercomposercommands2 = /** @type {(inputs: Buildercomposercommands2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`コマンド`)
};

const ko_buildercomposercommands2 = /** @type {(inputs: Buildercomposercommands2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`명령어`)
};

const zh_hant1_buildercomposercommands2 = /** @type {(inputs: Buildercomposercommands2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`指令`)
};

const de_buildercomposercommands2 = /** @type {(inputs: Buildercomposercommands2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Befehle`)
};

const fr_buildercomposercommands2 = /** @type {(inputs: Buildercomposercommands2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Commandes`)
};

const uk_buildercomposercommands2 = /** @type {(inputs: Buildercomposercommands2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Команди`)
};

/**
* | output |
* | --- |
* | "Commands" |
*
* @param {Buildercomposercommands2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposercommands2 = /** @type {((inputs?: Buildercomposercommands2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposercommands2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_buildercomposercommands2(inputs)
	if (locale === "zh") return zh_buildercomposercommands2(inputs)
	if (locale === "ja") return ja_buildercomposercommands2(inputs)
	if (locale === "ko") return ko_buildercomposercommands2(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildercomposercommands2(inputs)
	if (locale === "de") return de_buildercomposercommands2(inputs)
	if (locale === "fr") return fr_buildercomposercommands2(inputs)
	if (locale === "uk") return uk_buildercomposercommands2(inputs)
	return en_buildercomposercommands2(inputs)
});
export { buildercomposercommands2 as "builderComposerCommands" }