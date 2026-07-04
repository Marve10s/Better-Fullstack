/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Runstepcloneinstall3Inputs */

const en_runstepcloneinstall3 = /** @type {(inputs: Runstepcloneinstall3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Clone & install`)
};

const es_runstepcloneinstall3 = /** @type {(inputs: Runstepcloneinstall3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Clonar e instalar`)
};

const zh_runstepcloneinstall3 = /** @type {(inputs: Runstepcloneinstall3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`克隆并安装`)
};

const ja_runstepcloneinstall3 = /** @type {(inputs: Runstepcloneinstall3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`クローンしてインストール`)
};

const ko_runstepcloneinstall3 = /** @type {(inputs: Runstepcloneinstall3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`복제 및 설치`)
};

const zh_hant1_runstepcloneinstall3 = /** @type {(inputs: Runstepcloneinstall3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`克隆並安裝`)
};

const de_runstepcloneinstall3 = /** @type {(inputs: Runstepcloneinstall3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Klonen und installieren`)
};

const fr_runstepcloneinstall3 = /** @type {(inputs: Runstepcloneinstall3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cloner et installer`)
};

const uk_runstepcloneinstall3 = /** @type {(inputs: Runstepcloneinstall3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Клонуйте та встановіть`)
};

/**
* | output |
* | --- |
* | "Clone & install" |
*
* @param {Runstepcloneinstall3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const runstepcloneinstall3 = /** @type {((inputs?: Runstepcloneinstall3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Runstepcloneinstall3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_runstepcloneinstall3(inputs)
	if (locale === "es") return es_runstepcloneinstall3(inputs)
	if (locale === "zh") return zh_runstepcloneinstall3(inputs)
	if (locale === "ja") return ja_runstepcloneinstall3(inputs)
	if (locale === "ko") return ko_runstepcloneinstall3(inputs)
	if (locale === "zh-Hant") return zh_hant1_runstepcloneinstall3(inputs)
	if (locale === "de") return de_runstepcloneinstall3(inputs)
	if (locale === "fr") return fr_runstepcloneinstall3(inputs)
	return uk_runstepcloneinstall3(inputs)
});
export { runstepcloneinstall3 as "runStepCloneInstall" }