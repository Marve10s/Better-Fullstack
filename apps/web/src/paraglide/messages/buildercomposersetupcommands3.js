/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposersetupcommands3Inputs */

const en_buildercomposersetupcommands3 = /** @type {(inputs: Buildercomposersetupcommands3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Prepare dependencies`)
};

const es_buildercomposersetupcommands3 = /** @type {(inputs: Buildercomposersetupcommands3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Preparar dependencias`)
};

const zh_buildercomposersetupcommands3 = /** @type {(inputs: Buildercomposersetupcommands3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`准备依赖`)
};

const ja_buildercomposersetupcommands3 = /** @type {(inputs: Buildercomposersetupcommands3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`依存関係を準備`)
};

const ko_buildercomposersetupcommands3 = /** @type {(inputs: Buildercomposersetupcommands3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`의존성 준비`)
};

const zh_hant1_buildercomposersetupcommands3 = /** @type {(inputs: Buildercomposersetupcommands3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`準備相依套件`)
};

const de_buildercomposersetupcommands3 = /** @type {(inputs: Buildercomposersetupcommands3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Abhängigkeiten vorbereiten`)
};

const fr_buildercomposersetupcommands3 = /** @type {(inputs: Buildercomposersetupcommands3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Préparer les dépendances`)
};

const uk_buildercomposersetupcommands3 = /** @type {(inputs: Buildercomposersetupcommands3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Підготувати залежності`)
};

/**
* | output |
* | --- |
* | "Prepare dependencies" |
*
* @param {Buildercomposersetupcommands3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposersetupcommands3 = /** @type {((inputs?: Buildercomposersetupcommands3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposersetupcommands3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_buildercomposersetupcommands3(inputs)
	if (locale === "zh") return zh_buildercomposersetupcommands3(inputs)
	if (locale === "ja") return ja_buildercomposersetupcommands3(inputs)
	if (locale === "ko") return ko_buildercomposersetupcommands3(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildercomposersetupcommands3(inputs)
	if (locale === "de") return de_buildercomposersetupcommands3(inputs)
	if (locale === "fr") return fr_buildercomposersetupcommands3(inputs)
	if (locale === "uk") return uk_buildercomposersetupcommands3(inputs)
	return en_buildercomposersetupcommands3(inputs)
});
export { buildercomposersetupcommands3 as "builderComposerSetupCommands" }