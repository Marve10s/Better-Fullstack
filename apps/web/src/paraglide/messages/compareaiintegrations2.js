/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Compareaiintegrations2Inputs */

const en_compareaiintegrations2 = /** @type {(inputs: Compareaiintegrations2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`AI / LLM integrations`)
};

const es_compareaiintegrations2 = /** @type {(inputs: Compareaiintegrations2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Integraciones de IA / LLM`)
};

const zh_compareaiintegrations2 = /** @type {(inputs: Compareaiintegrations2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`AI / LLM 集成`)
};

const ja_compareaiintegrations2 = /** @type {(inputs: Compareaiintegrations2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`AI / LLM 統合`)
};

const ko_compareaiintegrations2 = /** @type {(inputs: Compareaiintegrations2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`AI / LLM 통합`)
};

const zh_hant1_compareaiintegrations2 = /** @type {(inputs: Compareaiintegrations2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`AI / LLM 集成`)
};

const de_compareaiintegrations2 = /** @type {(inputs: Compareaiintegrations2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`AI / LLM-Integrationen`)
};

const fr_compareaiintegrations2 = /** @type {(inputs: Compareaiintegrations2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`AI / Intégrations LLM`)
};

/**
* | output |
* | --- |
* | "AI / LLM integrations" |
*
* @param {Compareaiintegrations2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const compareaiintegrations2 = /** @type {((inputs?: Compareaiintegrations2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Compareaiintegrations2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_compareaiintegrations2(inputs)
	if (locale === "es") return es_compareaiintegrations2(inputs)
	if (locale === "zh") return zh_compareaiintegrations2(inputs)
	if (locale === "ja") return ja_compareaiintegrations2(inputs)
	if (locale === "ko") return ko_compareaiintegrations2(inputs)
	if (locale === "zh-Hant") return zh_hant1_compareaiintegrations2(inputs)
	if (locale === "de") return de_compareaiintegrations2(inputs)
	return fr_compareaiintegrations2(inputs)
});
export { compareaiintegrations2 as "compareAiIntegrations" }