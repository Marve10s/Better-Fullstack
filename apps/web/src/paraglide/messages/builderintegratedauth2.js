/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderintegratedauth2Inputs */

const en_builderintegratedauth2 = /** @type {(inputs: Builderintegratedauth2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Integrated Auth`)
};

const es_builderintegratedauth2 = /** @type {(inputs: Builderintegratedauth2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Auth integrada`)
};

const zh_builderintegratedauth2 = /** @type {(inputs: Builderintegratedauth2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`集成认证`)
};

const ja_builderintegratedauth2 = /** @type {(inputs: Builderintegratedauth2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`統合認証`)
};

const ko_builderintegratedauth2 = /** @type {(inputs: Builderintegratedauth2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`통합 인증`)
};

const zh_hant1_builderintegratedauth2 = /** @type {(inputs: Builderintegratedauth2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`整合認證`)
};

const de_builderintegratedauth2 = /** @type {(inputs: Builderintegratedauth2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Integrierte Auth`)
};

const fr_builderintegratedauth2 = /** @type {(inputs: Builderintegratedauth2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Authentification intégrée`)
};

/**
* | output |
* | --- |
* | "Integrated Auth" |
*
* @param {Builderintegratedauth2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const builderintegratedauth2 = /** @type {((inputs?: Builderintegratedauth2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderintegratedauth2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderintegratedauth2(inputs)
	if (locale === "es") return es_builderintegratedauth2(inputs)
	if (locale === "zh") return zh_builderintegratedauth2(inputs)
	if (locale === "ja") return ja_builderintegratedauth2(inputs)
	if (locale === "ko") return ko_builderintegratedauth2(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderintegratedauth2(inputs)
	if (locale === "de") return de_builderintegratedauth2(inputs)
	return fr_builderintegratedauth2(inputs)
});
export { builderintegratedauth2 as "builderIntegratedAuth" }