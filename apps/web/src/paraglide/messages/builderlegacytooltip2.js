/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderlegacytooltip2Inputs */

const en_builderlegacytooltip2 = /** @type {(inputs: Builderlegacytooltip2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No longer actively maintained`)
};

const es_builderlegacytooltip2 = /** @type {(inputs: Builderlegacytooltip2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ya no se mantiene activamente`)
};

const zh_builderlegacytooltip2 = /** @type {(inputs: Builderlegacytooltip2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`不再积极维护`)
};

const ja_builderlegacytooltip2 = /** @type {(inputs: Builderlegacytooltip2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`アクティブにメンテナンスされなくなりました`)
};

const ko_builderlegacytooltip2 = /** @type {(inputs: Builderlegacytooltip2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`더 이상 적극적으로 유지관리되지 않음`)
};

const zh_hant1_builderlegacytooltip2 = /** @type {(inputs: Builderlegacytooltip2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`不再積極維護`)
};

const de_builderlegacytooltip2 = /** @type {(inputs: Builderlegacytooltip2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Wird nicht mehr aktiv gepflegt`)
};

const fr_builderlegacytooltip2 = /** @type {(inputs: Builderlegacytooltip2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`N'est plus activement entretenu`)
};

const uk_builderlegacytooltip2 = /** @type {(inputs: Builderlegacytooltip2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Більше не обслуговується`)
};

/**
* | output |
* | --- |
* | "No longer actively maintained" |
*
* @param {Builderlegacytooltip2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderlegacytooltip2 = /** @type {((inputs?: Builderlegacytooltip2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderlegacytooltip2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderlegacytooltip2(inputs)
	if (locale === "es") return es_builderlegacytooltip2(inputs)
	if (locale === "zh") return zh_builderlegacytooltip2(inputs)
	if (locale === "ja") return ja_builderlegacytooltip2(inputs)
	if (locale === "ko") return ko_builderlegacytooltip2(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderlegacytooltip2(inputs)
	if (locale === "de") return de_builderlegacytooltip2(inputs)
	if (locale === "fr") return fr_builderlegacytooltip2(inputs)
	return uk_builderlegacytooltip2(inputs)
});
export { builderlegacytooltip2 as "builderLegacyTooltip" }