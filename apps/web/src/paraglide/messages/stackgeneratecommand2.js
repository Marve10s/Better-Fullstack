/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Stackgeneratecommand2Inputs */

const en_stackgeneratecommand2 = /** @type {(inputs: Stackgeneratecommand2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generate command`)
};

const es_stackgeneratecommand2 = /** @type {(inputs: Stackgeneratecommand2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Generar comando`)
};

const zh_stackgeneratecommand2 = /** @type {(inputs: Stackgeneratecommand2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`生成命令`)
};

const ja_stackgeneratecommand2 = /** @type {(inputs: Stackgeneratecommand2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`コマンドを生成する`)
};

const ko_stackgeneratecommand2 = /** @type {(inputs: Stackgeneratecommand2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`명령 생성`)
};

const zh_hant1_stackgeneratecommand2 = /** @type {(inputs: Stackgeneratecommand2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`產生指令`)
};

const de_stackgeneratecommand2 = /** @type {(inputs: Stackgeneratecommand2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Befehl generieren`)
};

const fr_stackgeneratecommand2 = /** @type {(inputs: Stackgeneratecommand2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Générer une commande`)
};

const uk_stackgeneratecommand2 = /** @type {(inputs: Stackgeneratecommand2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Згенерувати команду`)
};

/**
* | output |
* | --- |
* | "Generate command" |
*
* @param {Stackgeneratecommand2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const stackgeneratecommand2 = /** @type {((inputs?: Stackgeneratecommand2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Stackgeneratecommand2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_stackgeneratecommand2(inputs)
	if (locale === "es") return es_stackgeneratecommand2(inputs)
	if (locale === "zh") return zh_stackgeneratecommand2(inputs)
	if (locale === "ja") return ja_stackgeneratecommand2(inputs)
	if (locale === "ko") return ko_stackgeneratecommand2(inputs)
	if (locale === "zh-Hant") return zh_hant1_stackgeneratecommand2(inputs)
	if (locale === "de") return de_stackgeneratecommand2(inputs)
	if (locale === "fr") return fr_stackgeneratecommand2(inputs)
	return uk_stackgeneratecommand2(inputs)
});
export { stackgeneratecommand2 as "stackGenerateCommand" }