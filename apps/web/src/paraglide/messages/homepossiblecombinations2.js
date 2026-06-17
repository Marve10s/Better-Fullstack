/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Homepossiblecombinations2Inputs */

const en_homepossiblecombinations2 = /** @type {(inputs: Homepossiblecombinations2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`possible project combinations`)
};

const es_homepossiblecombinations2 = /** @type {(inputs: Homepossiblecombinations2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`combinaciones posibles de proyectos`)
};

const zh_homepossiblecombinations2 = /** @type {(inputs: Homepossiblecombinations2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`可能的项目组合`)
};

const ja_homepossiblecombinations2 = /** @type {(inputs: Homepossiblecombinations2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`可能なプロジェクトの組み合わせ`)
};

const ko_homepossiblecombinations2 = /** @type {(inputs: Homepossiblecombinations2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`가능한 프로젝트 조합`)
};

const zh_hant1_homepossiblecombinations2 = /** @type {(inputs: Homepossiblecombinations2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`可能的項目組合`)
};

const de_homepossiblecombinations2 = /** @type {(inputs: Homepossiblecombinations2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Mögliche Projektkombinationen`)
};

const fr_homepossiblecombinations2 = /** @type {(inputs: Homepossiblecombinations2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`combinaisons de projets possibles`)
};

/**
* | output |
* | --- |
* | "possible project combinations" |
*
* @param {Homepossiblecombinations2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const homepossiblecombinations2 = /** @type {((inputs?: Homepossiblecombinations2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Homepossiblecombinations2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_homepossiblecombinations2(inputs)
	if (locale === "es") return es_homepossiblecombinations2(inputs)
	if (locale === "zh") return zh_homepossiblecombinations2(inputs)
	if (locale === "ja") return ja_homepossiblecombinations2(inputs)
	if (locale === "ko") return ko_homepossiblecombinations2(inputs)
	if (locale === "zh-Hant") return zh_hant1_homepossiblecombinations2(inputs)
	if (locale === "de") return de_homepossiblecombinations2(inputs)
	return fr_homepossiblecombinations2(inputs)
});
export { homepossiblecombinations2 as "homePossibleCombinations" }