/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Comparegobackends2Inputs */

const en_comparegobackends2 = /** @type {(inputs: Comparegobackends2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go backends (Gin, Echo)`)
};

const es_comparegobackends2 = /** @type {(inputs: Comparegobackends2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Backends Go (Gin, Echo)`)
};

const zh_comparegobackends2 = /** @type {(inputs: Comparegobackends2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go 后端（Gin、Echo）`)
};

const ja_comparegobackends2 = /** @type {(inputs: Comparegobackends2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go バックエンド (Gin、Echo)`)
};

const ko_comparegobackends2 = /** @type {(inputs: Comparegobackends2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go 백엔드(Gin, Echo)`)
};

const zh_hant1_comparegobackends2 = /** @type {(inputs: Comparegobackends2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go 後端（Gin、Echo）`)
};

const de_comparegobackends2 = /** @type {(inputs: Comparegobackends2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Go-Backends (Gin, Echo)`)
};

const fr_comparegobackends2 = /** @type {(inputs: Comparegobackends2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Aller vers les backends (Gin, Echo)`)
};

/**
* | output |
* | --- |
* | "Go backends (Gin, Echo)" |
*
* @param {Comparegobackends2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const comparegobackends2 = /** @type {((inputs?: Comparegobackends2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comparegobackends2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_comparegobackends2(inputs)
	if (locale === "es") return es_comparegobackends2(inputs)
	if (locale === "zh") return zh_comparegobackends2(inputs)
	if (locale === "ja") return ja_comparegobackends2(inputs)
	if (locale === "ko") return ko_comparegobackends2(inputs)
	if (locale === "zh-Hant") return zh_hant1_comparegobackends2(inputs)
	if (locale === "de") return de_comparegobackends2(inputs)
	return fr_comparegobackends2(inputs)
});
export { comparegobackends2 as "compareGoBackends" }