/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderdisabled1Inputs */

const en_builderdisabled1 = /** @type {(inputs: Builderdisabled1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Disabled`)
};

const es_builderdisabled1 = /** @type {(inputs: Builderdisabled1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Desactivado`)
};

const zh_builderdisabled1 = /** @type {(inputs: Builderdisabled1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已禁用`)
};

const ja_builderdisabled1 = /** @type {(inputs: Builderdisabled1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`無効`)
};

const ko_builderdisabled1 = /** @type {(inputs: Builderdisabled1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`장애가 있는`)
};

const zh_hant1_builderdisabled1 = /** @type {(inputs: Builderdisabled1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已停用`)
};

const de_builderdisabled1 = /** @type {(inputs: Builderdisabled1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Deaktiviert`)
};

const fr_builderdisabled1 = /** @type {(inputs: Builderdisabled1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Désactivé`)
};

/**
* | output |
* | --- |
* | "Disabled" |
*
* @param {Builderdisabled1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const builderdisabled1 = /** @type {((inputs?: Builderdisabled1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderdisabled1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderdisabled1(inputs)
	if (locale === "es") return es_builderdisabled1(inputs)
	if (locale === "zh") return zh_builderdisabled1(inputs)
	if (locale === "ja") return ja_builderdisabled1(inputs)
	if (locale === "ko") return ko_builderdisabled1(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderdisabled1(inputs)
	if (locale === "de") return de_builderdisabled1(inputs)
	return fr_builderdisabled1(inputs)
});
export { builderdisabled1 as "builderDisabled" }