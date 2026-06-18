/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homelayeraiintegrations3Inputs */

const en_homelayeraiintegrations3 = /** @type {(inputs: Homelayeraiintegrations3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`AI INTEGRATIONS`)
};

const es_homelayeraiintegrations3 = /** @type {(inputs: Homelayeraiintegrations3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`INTEGRACIONES DE IA`)
};

const zh_homelayeraiintegrations3 = /** @type {(inputs: Homelayeraiintegrations3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`AI 集成`)
};

const ja_homelayeraiintegrations3 = /** @type {(inputs: Homelayeraiintegrations3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`AI 統合`)
};

const ko_homelayeraiintegrations3 = /** @type {(inputs: Homelayeraiintegrations3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`AI 통합`)
};

const zh_hant1_homelayeraiintegrations3 = /** @type {(inputs: Homelayeraiintegrations3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`AI 集成`)
};

const de_homelayeraiintegrations3 = /** @type {(inputs: Homelayeraiintegrations3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`AI INTEGRATIONEN`)
};

const fr_homelayeraiintegrations3 = /** @type {(inputs: Homelayeraiintegrations3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`AI INTÉGRATIONS`)
};

/**
* | output |
* | --- |
* | "AI INTEGRATIONS" |
*
* @param {Homelayeraiintegrations3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const homelayeraiintegrations3 = /** @type {((inputs?: Homelayeraiintegrations3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homelayeraiintegrations3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homelayeraiintegrations3(inputs)
	if (locale === "es") return es_homelayeraiintegrations3(inputs)
	if (locale === "zh") return zh_homelayeraiintegrations3(inputs)
	if (locale === "ja") return ja_homelayeraiintegrations3(inputs)
	if (locale === "ko") return ko_homelayeraiintegrations3(inputs)
	if (locale === "zh-Hant") return zh_hant1_homelayeraiintegrations3(inputs)
	if (locale === "de") return de_homelayeraiintegrations3(inputs)
	return fr_homelayeraiintegrations3(inputs)
});
export { homelayeraiintegrations3 as "homeLayerAiIntegrations" }