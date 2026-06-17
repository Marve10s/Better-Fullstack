/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ ecosystem: NonNullable<unknown> }} Builderauthgroup2Inputs */

const en_builderauthgroup2 = /** @type {(inputs: Builderauthgroup2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystem} Auth`)
};

const es_builderauthgroup2 = /** @type {(inputs: Builderauthgroup2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Auth ${i?.ecosystem}`)
};

const zh_builderauthgroup2 = /** @type {(inputs: Builderauthgroup2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystem} 认证`)
};

const ja_builderauthgroup2 = /** @type {(inputs: Builderauthgroup2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystem} 認証`)
};

const ko_builderauthgroup2 = /** @type {(inputs: Builderauthgroup2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystem} 인증`)
};

const zh_hant1_builderauthgroup2 = /** @type {(inputs: Builderauthgroup2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystem} 認證`)
};

const de_builderauthgroup2 = /** @type {(inputs: Builderauthgroup2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystem} Auth`)
};

const fr_builderauthgroup2 = /** @type {(inputs: Builderauthgroup2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.ecosystem} Authentification`)
};

/**
* | output |
* | --- |
* | "{ecosystem} Auth" |
*
* @param {Builderauthgroup2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const builderauthgroup2 = /** @type {((inputs: Builderauthgroup2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderauthgroup2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderauthgroup2(inputs)
	if (locale === "es") return es_builderauthgroup2(inputs)
	if (locale === "zh") return zh_builderauthgroup2(inputs)
	if (locale === "ja") return ja_builderauthgroup2(inputs)
	if (locale === "ko") return ko_builderauthgroup2(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderauthgroup2(inputs)
	if (locale === "de") return de_builderauthgroup2(inputs)
	return fr_builderauthgroup2(inputs)
});
export { builderauthgroup2 as "builderAuthGroup" }