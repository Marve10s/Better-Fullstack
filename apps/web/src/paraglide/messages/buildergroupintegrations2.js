/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildergroupintegrations2Inputs */

const en_buildergroupintegrations2 = /** @type {(inputs: Buildergroupintegrations2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Integrations`)
};

const es_buildergroupintegrations2 = /** @type {(inputs: Buildergroupintegrations2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Integraciones`)
};

const zh_buildergroupintegrations2 = /** @type {(inputs: Buildergroupintegrations2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`集成`)
};

const ja_buildergroupintegrations2 = /** @type {(inputs: Buildergroupintegrations2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`統合`)
};

const ko_buildergroupintegrations2 = /** @type {(inputs: Buildergroupintegrations2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`통합`)
};

const zh_hant1_buildergroupintegrations2 = /** @type {(inputs: Buildergroupintegrations2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`整合`)
};

const de_buildergroupintegrations2 = /** @type {(inputs: Buildergroupintegrations2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Integrationen`)
};

const fr_buildergroupintegrations2 = /** @type {(inputs: Buildergroupintegrations2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Intégrations`)
};

/**
* | output |
* | --- |
* | "Integrations" |
*
* @param {Buildergroupintegrations2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const buildergroupintegrations2 = /** @type {((inputs?: Buildergroupintegrations2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildergroupintegrations2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildergroupintegrations2(inputs)
	if (locale === "es") return es_buildergroupintegrations2(inputs)
	if (locale === "zh") return zh_buildergroupintegrations2(inputs)
	if (locale === "ja") return ja_buildergroupintegrations2(inputs)
	if (locale === "ko") return ko_buildergroupintegrations2(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildergroupintegrations2(inputs)
	if (locale === "de") return de_buildergroupintegrations2(inputs)
	return fr_buildergroupintegrations2(inputs)
});
export { buildergroupintegrations2 as "builderGroupIntegrations" }