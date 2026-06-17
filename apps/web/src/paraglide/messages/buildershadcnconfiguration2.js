/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildershadcnconfiguration2Inputs */

const en_buildershadcnconfiguration2 = /** @type {(inputs: Buildershadcnconfiguration2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`shadcn/ui Configuration`)
};

const es_buildershadcnconfiguration2 = /** @type {(inputs: Buildershadcnconfiguration2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Configuración de shadcn/ui`)
};

const zh_buildershadcnconfiguration2 = /** @type {(inputs: Buildershadcnconfiguration2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`shadcn/ui 配置`)
};

const ja_buildershadcnconfiguration2 = /** @type {(inputs: Buildershadcnconfiguration2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`shadcn/ui 構成`)
};

const ko_buildershadcnconfiguration2 = /** @type {(inputs: Buildershadcnconfiguration2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`shadcn/ui 구성`)
};

const zh_hant1_buildershadcnconfiguration2 = /** @type {(inputs: Buildershadcnconfiguration2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`shadcn/ui 配置`)
};

const de_buildershadcnconfiguration2 = /** @type {(inputs: Buildershadcnconfiguration2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`shadcn/ui Konfiguration`)
};

const fr_buildershadcnconfiguration2 = /** @type {(inputs: Buildershadcnconfiguration2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`shadcn/uiConfiguration`)
};

/**
* | output |
* | --- |
* | "shadcn/ui Configuration" |
*
* @param {Buildershadcnconfiguration2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const buildershadcnconfiguration2 = /** @type {((inputs?: Buildershadcnconfiguration2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildershadcnconfiguration2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildershadcnconfiguration2(inputs)
	if (locale === "es") return es_buildershadcnconfiguration2(inputs)
	if (locale === "zh") return zh_buildershadcnconfiguration2(inputs)
	if (locale === "ja") return ja_buildershadcnconfiguration2(inputs)
	if (locale === "ko") return ko_buildershadcnconfiguration2(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildershadcnconfiguration2(inputs)
	if (locale === "de") return de_buildershadcnconfiguration2(inputs)
	return fr_buildershadcnconfiguration2(inputs)
});
export { buildershadcnconfiguration2 as "builderShadcnConfiguration" }