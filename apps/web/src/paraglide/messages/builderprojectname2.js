/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderprojectname2Inputs */

const en_builderprojectname2 = /** @type {(inputs: Builderprojectname2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Project name`)
};

const es_builderprojectname2 = /** @type {(inputs: Builderprojectname2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Nombre del proyecto`)
};

const zh_builderprojectname2 = /** @type {(inputs: Builderprojectname2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`项目名称`)
};

const ja_builderprojectname2 = /** @type {(inputs: Builderprojectname2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`プロジェクト名`)
};

const ko_builderprojectname2 = /** @type {(inputs: Builderprojectname2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`프로젝트 이름`)
};

const zh_hant1_builderprojectname2 = /** @type {(inputs: Builderprojectname2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`項目名稱`)
};

const de_builderprojectname2 = /** @type {(inputs: Builderprojectname2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Projektname`)
};

const fr_builderprojectname2 = /** @type {(inputs: Builderprojectname2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Nom du projet`)
};

/**
* | output |
* | --- |
* | "Project name" |
*
* @param {Builderprojectname2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const builderprojectname2 = /** @type {((inputs?: Builderprojectname2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderprojectname2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderprojectname2(inputs)
	if (locale === "es") return es_builderprojectname2(inputs)
	if (locale === "zh") return zh_builderprojectname2(inputs)
	if (locale === "ja") return ja_builderprojectname2(inputs)
	if (locale === "ko") return ko_builderprojectname2(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderprojectname2(inputs)
	if (locale === "de") return de_builderprojectname2(inputs)
	return fr_builderprojectname2(inputs)
});
export { builderprojectname2 as "builderProjectName" }