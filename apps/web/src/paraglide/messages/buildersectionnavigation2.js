/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildersectionnavigation2Inputs */

const en_buildersectionnavigation2 = /** @type {(inputs: Buildersectionnavigation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Section navigation`)
};

const es_buildersectionnavigation2 = /** @type {(inputs: Buildersectionnavigation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Navegación de secciones`)
};

const zh_buildersectionnavigation2 = /** @type {(inputs: Buildersectionnavigation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`分区导航`)
};

const ja_buildersectionnavigation2 = /** @type {(inputs: Buildersectionnavigation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`セクションのナビゲーション`)
};

const ko_buildersectionnavigation2 = /** @type {(inputs: Buildersectionnavigation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`섹션 탐색`)
};

const zh_hant1_buildersectionnavigation2 = /** @type {(inputs: Buildersectionnavigation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`分區導航`)
};

const de_buildersectionnavigation2 = /** @type {(inputs: Buildersectionnavigation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Abschnittsnavigation`)
};

const fr_buildersectionnavigation2 = /** @type {(inputs: Buildersectionnavigation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Navigation dans les sections`)
};

const uk_buildersectionnavigation2 = /** @type {(inputs: Buildersectionnavigation2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Навігація по розділах`)
};

/**
* | output |
* | --- |
* | "Section navigation" |
*
* @param {Buildersectionnavigation2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildersectionnavigation2 = /** @type {((inputs?: Buildersectionnavigation2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildersectionnavigation2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildersectionnavigation2(inputs)
	if (locale === "es") return es_buildersectionnavigation2(inputs)
	if (locale === "zh") return zh_buildersectionnavigation2(inputs)
	if (locale === "ja") return ja_buildersectionnavigation2(inputs)
	if (locale === "ko") return ko_buildersectionnavigation2(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildersectionnavigation2(inputs)
	if (locale === "de") return de_buildersectionnavigation2(inputs)
	if (locale === "fr") return fr_buildersectionnavigation2(inputs)
	return uk_buildersectionnavigation2(inputs)
});
export { buildersectionnavigation2 as "builderSectionNavigation" }