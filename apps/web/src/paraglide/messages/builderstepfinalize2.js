/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderstepfinalize2Inputs */

const en_builderstepfinalize2 = /** @type {(inputs: Builderstepfinalize2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Finalize`)
};

const es_builderstepfinalize2 = /** @type {(inputs: Builderstepfinalize2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Finalizar`)
};

const zh_builderstepfinalize2 = /** @type {(inputs: Builderstepfinalize2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`完成`)
};

const ja_builderstepfinalize2 = /** @type {(inputs: Builderstepfinalize2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ファイナライズ`)
};

const ko_builderstepfinalize2 = /** @type {(inputs: Builderstepfinalize2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`마무리`)
};

const zh_hant1_builderstepfinalize2 = /** @type {(inputs: Builderstepfinalize2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`完成`)
};

const de_builderstepfinalize2 = /** @type {(inputs: Builderstepfinalize2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Abschließen`)
};

const fr_builderstepfinalize2 = /** @type {(inputs: Builderstepfinalize2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Finaliser`)
};

/**
* | output |
* | --- |
* | "Finalize" |
*
* @param {Builderstepfinalize2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const builderstepfinalize2 = /** @type {((inputs?: Builderstepfinalize2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderstepfinalize2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderstepfinalize2(inputs)
	if (locale === "es") return es_builderstepfinalize2(inputs)
	if (locale === "zh") return zh_builderstepfinalize2(inputs)
	if (locale === "ja") return ja_builderstepfinalize2(inputs)
	if (locale === "ko") return ko_builderstepfinalize2(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderstepfinalize2(inputs)
	if (locale === "de") return de_builderstepfinalize2(inputs)
	return fr_builderstepfinalize2(inputs)
});
export { builderstepfinalize2 as "builderStepFinalize" }