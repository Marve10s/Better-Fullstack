/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderlegacy1Inputs */

const en_builderlegacy1 = /** @type {(inputs: Builderlegacy1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Legacy`)
};

const es_builderlegacy1 = /** @type {(inputs: Builderlegacy1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Legacy`)
};

const zh_builderlegacy1 = /** @type {(inputs: Builderlegacy1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Legacy`)
};

const ja_builderlegacy1 = /** @type {(inputs: Builderlegacy1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`遺産`)
};

const ko_builderlegacy1 = /** @type {(inputs: Builderlegacy1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`유산`)
};

const zh_hant1_builderlegacy1 = /** @type {(inputs: Builderlegacy1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Legacy`)
};

const de_builderlegacy1 = /** @type {(inputs: Builderlegacy1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Vermächtnis`)
};

const fr_builderlegacy1 = /** @type {(inputs: Builderlegacy1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Héritage`)
};

/**
* | output |
* | --- |
* | "Legacy" |
*
* @param {Builderlegacy1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const builderlegacy1 = /** @type {((inputs?: Builderlegacy1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderlegacy1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderlegacy1(inputs)
	if (locale === "es") return es_builderlegacy1(inputs)
	if (locale === "zh") return zh_builderlegacy1(inputs)
	if (locale === "ja") return ja_builderlegacy1(inputs)
	if (locale === "ko") return ko_builderlegacy1(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderlegacy1(inputs)
	if (locale === "de") return de_builderlegacy1(inputs)
	return fr_builderlegacy1(inputs)
});
export { builderlegacy1 as "builderLegacy" }