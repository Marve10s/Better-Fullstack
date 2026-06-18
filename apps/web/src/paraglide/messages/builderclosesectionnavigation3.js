/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderclosesectionnavigation3Inputs */

const en_builderclosesectionnavigation3 = /** @type {(inputs: Builderclosesectionnavigation3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Close section navigation`)
};

const es_builderclosesectionnavigation3 = /** @type {(inputs: Builderclosesectionnavigation3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Cerrar navegación de secciones`)
};

const zh_builderclosesectionnavigation3 = /** @type {(inputs: Builderclosesectionnavigation3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`关闭分区导航`)
};

const ja_builderclosesectionnavigation3 = /** @type {(inputs: Builderclosesectionnavigation3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`セクションを閉じるナビゲーション`)
};

const ko_builderclosesectionnavigation3 = /** @type {(inputs: Builderclosesectionnavigation3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`섹션 탐색 닫기`)
};

const zh_hant1_builderclosesectionnavigation3 = /** @type {(inputs: Builderclosesectionnavigation3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`關閉分區導航`)
};

const de_builderclosesectionnavigation3 = /** @type {(inputs: Builderclosesectionnavigation3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Abschnittsnavigation schließen`)
};

const fr_builderclosesectionnavigation3 = /** @type {(inputs: Builderclosesectionnavigation3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fermer la navigation dans la section`)
};

/**
* | output |
* | --- |
* | "Close section navigation" |
*
* @param {Builderclosesectionnavigation3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const builderclosesectionnavigation3 = /** @type {((inputs?: Builderclosesectionnavigation3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderclosesectionnavigation3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderclosesectionnavigation3(inputs)
	if (locale === "es") return es_builderclosesectionnavigation3(inputs)
	if (locale === "zh") return zh_builderclosesectionnavigation3(inputs)
	if (locale === "ja") return ja_builderclosesectionnavigation3(inputs)
	if (locale === "ko") return ko_builderclosesectionnavigation3(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderclosesectionnavigation3(inputs)
	if (locale === "de") return de_builderclosesectionnavigation3(inputs)
	return fr_builderclosesectionnavigation3(inputs)
});
export { builderclosesectionnavigation3 as "builderCloseSectionNavigation" }