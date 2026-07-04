/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ ecosystem: NonNullable<unknown> }} Builderbackendgroup2Inputs */

const en_builderbackendgroup2 = /** @type {(inputs: Builderbackendgroup2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystem} Backend`)
};

const es_builderbackendgroup2 = /** @type {(inputs: Builderbackendgroup2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Backend ${i?.ecosystem}`)
};

const zh_builderbackendgroup2 = /** @type {(inputs: Builderbackendgroup2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystem} 后端`)
};

const ja_builderbackendgroup2 = /** @type {(inputs: Builderbackendgroup2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystem} バックエンド`)
};

const ko_builderbackendgroup2 = /** @type {(inputs: Builderbackendgroup2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystem} 백엔드`)
};

const zh_hant1_builderbackendgroup2 = /** @type {(inputs: Builderbackendgroup2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystem} 後端`)
};

const de_builderbackendgroup2 = /** @type {(inputs: Builderbackendgroup2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystem} Backend`)
};

const fr_builderbackendgroup2 = /** @type {(inputs: Builderbackendgroup2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystem} Back-end`)
};

/**
* | output |
* | --- |
* | "{ecosystem} Backend" |
*
* @param {Builderbackendgroup2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const builderbackendgroup2 = /** @type {((inputs: Builderbackendgroup2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderbackendgroup2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderbackendgroup2(inputs)
	if (locale === "es") return es_builderbackendgroup2(inputs)
	if (locale === "zh") return zh_builderbackendgroup2(inputs)
	if (locale === "ja") return ja_builderbackendgroup2(inputs)
	if (locale === "ko") return ko_builderbackendgroup2(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderbackendgroup2(inputs)
	if (locale === "de") return de_builderbackendgroup2(inputs)
	return fr_builderbackendgroup2(inputs)
});
export { builderbackendgroup2 as "builderBackendGroup" }