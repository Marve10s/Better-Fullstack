/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderunavailable1Inputs */

const en_builderunavailable1 = /** @type {(inputs: Builderunavailable1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Unavailable:`)
};

const es_builderunavailable1 = /** @type {(inputs: Builderunavailable1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No disponible:`)
};

const zh_builderunavailable1 = /** @type {(inputs: Builderunavailable1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`不可用：`)
};

const ja_builderunavailable1 = /** @type {(inputs: Builderunavailable1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`利用不可:`)
};

const ko_builderunavailable1 = /** @type {(inputs: Builderunavailable1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`사용 불가:`)
};

const zh_hant1_builderunavailable1 = /** @type {(inputs: Builderunavailable1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`不可用：`)
};

const de_builderunavailable1 = /** @type {(inputs: Builderunavailable1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Nicht verfügbar:`)
};

const fr_builderunavailable1 = /** @type {(inputs: Builderunavailable1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Indisponible:`)
};

const uk_builderunavailable1 = /** @type {(inputs: Builderunavailable1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Недоступно:`)
};

/**
* | output |
* | --- |
* | "Unavailable:" |
*
* @param {Builderunavailable1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderunavailable1 = /** @type {((inputs?: Builderunavailable1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderunavailable1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_builderunavailable1(inputs)
	if (locale === "zh") return zh_builderunavailable1(inputs)
	if (locale === "ja") return ja_builderunavailable1(inputs)
	if (locale === "ko") return ko_builderunavailable1(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderunavailable1(inputs)
	if (locale === "de") return de_builderunavailable1(inputs)
	if (locale === "fr") return fr_builderunavailable1(inputs)
	if (locale === "uk") return uk_builderunavailable1(inputs)
	return en_builderunavailable1(inputs)
});
export { builderunavailable1 as "builderUnavailable" }