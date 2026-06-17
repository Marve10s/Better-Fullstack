/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildertogglesectionnavigation3Inputs */

const en_buildertogglesectionnavigation3 = /** @type {(inputs: Buildertogglesectionnavigation3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Toggle section navigation`)
};

const es_buildertogglesectionnavigation3 = /** @type {(inputs: Buildertogglesectionnavigation3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Alternar navegación de secciones`)
};

const zh_buildertogglesectionnavigation3 = /** @type {(inputs: Buildertogglesectionnavigation3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`切换分区导航`)
};

const ja_buildertogglesectionnavigation3 = /** @type {(inputs: Buildertogglesectionnavigation3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`セクションのナビゲーションを切り替えます`)
};

const ko_buildertogglesectionnavigation3 = /** @type {(inputs: Buildertogglesectionnavigation3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`섹션 탐색 전환`)
};

const zh_hant1_buildertogglesectionnavigation3 = /** @type {(inputs: Buildertogglesectionnavigation3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`切換分區導航`)
};

const de_buildertogglesectionnavigation3 = /** @type {(inputs: Buildertogglesectionnavigation3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Abschnittsnavigation umschalten`)
};

const fr_buildertogglesectionnavigation3 = /** @type {(inputs: Buildertogglesectionnavigation3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Basculer la navigation dans les sections`)
};

/**
* | output |
* | --- |
* | "Toggle section navigation" |
*
* @param {Buildertogglesectionnavigation3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const buildertogglesectionnavigation3 = /** @type {((inputs?: Buildertogglesectionnavigation3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildertogglesectionnavigation3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildertogglesectionnavigation3(inputs)
	if (locale === "es") return es_buildertogglesectionnavigation3(inputs)
	if (locale === "zh") return zh_buildertogglesectionnavigation3(inputs)
	if (locale === "ja") return ja_buildertogglesectionnavigation3(inputs)
	if (locale === "ko") return ko_buildertogglesectionnavigation3(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildertogglesectionnavigation3(inputs)
	if (locale === "de") return de_buildertogglesectionnavigation3(inputs)
	return fr_buildertogglesectionnavigation3(inputs)
});
export { buildertogglesectionnavigation3 as "builderToggleSectionNavigation" }