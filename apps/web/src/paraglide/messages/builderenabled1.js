/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderenabled1Inputs */

const en_builderenabled1 = /** @type {(inputs: Builderenabled1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Enabled`)
};

const es_builderenabled1 = /** @type {(inputs: Builderenabled1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Activado`)
};

const zh_builderenabled1 = /** @type {(inputs: Builderenabled1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已启用`)
};

const ja_builderenabled1 = /** @type {(inputs: Builderenabled1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`有効`)
};

const ko_builderenabled1 = /** @type {(inputs: Builderenabled1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`활성화됨`)
};

const zh_hant1_builderenabled1 = /** @type {(inputs: Builderenabled1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`已啟用`)
};

const de_builderenabled1 = /** @type {(inputs: Builderenabled1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ermöglicht`)
};

const fr_builderenabled1 = /** @type {(inputs: Builderenabled1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Activé`)
};

/**
* | output |
* | --- |
* | "Enabled" |
*
* @param {Builderenabled1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const builderenabled1 = /** @type {((inputs?: Builderenabled1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderenabled1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderenabled1(inputs)
	if (locale === "es") return es_builderenabled1(inputs)
	if (locale === "zh") return zh_builderenabled1(inputs)
	if (locale === "ja") return ja_builderenabled1(inputs)
	if (locale === "ko") return ko_builderenabled1(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderenabled1(inputs)
	if (locale === "de") return de_builderenabled1(inputs)
	return fr_builderenabled1(inputs)
});
export { builderenabled1 as "builderEnabled" }