/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presettracksaasname3Inputs */

const en_presettracksaasname3 = /** @type {(inputs: Presettracksaasname3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`SaaS App`)
};

const es_presettracksaasname3 = /** @type {(inputs: Presettracksaasname3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`App SaaS`)
};

const zh_presettracksaasname3 = /** @type {(inputs: Presettracksaasname3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`SaaS 应用`)
};

const ja_presettracksaasname3 = /** @type {(inputs: Presettracksaasname3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`SaaS アプリ`)
};

const ko_presettracksaasname3 = /** @type {(inputs: Presettracksaasname3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`SaaS 앱`)
};

const zh_hant1_presettracksaasname3 = /** @type {(inputs: Presettracksaasname3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`SaaS 應用`)
};

const de_presettracksaasname3 = /** @type {(inputs: Presettracksaasname3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`SaaS-App`)
};

const fr_presettracksaasname3 = /** @type {(inputs: Presettracksaasname3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Application SaaS`)
};

/**
* | output |
* | --- |
* | "SaaS App" |
*
* @param {Presettracksaasname3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const presettracksaasname3 = /** @type {((inputs?: Presettracksaasname3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presettracksaasname3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_presettracksaasname3(inputs)
	if (locale === "es") return es_presettracksaasname3(inputs)
	if (locale === "zh") return zh_presettracksaasname3(inputs)
	if (locale === "ja") return ja_presettracksaasname3(inputs)
	if (locale === "ko") return ko_presettracksaasname3(inputs)
	if (locale === "zh-Hant") return zh_hant1_presettracksaasname3(inputs)
	if (locale === "de") return de_presettracksaasname3(inputs)
	return fr_presettracksaasname3(inputs)
});
export { presettracksaasname3 as "presetTrackSaasName" }