/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcptooladdfeaturedescription4Inputs */

const en_mcptooladdfeaturedescription4 = /** @type {(inputs: Mcptooladdfeaturedescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Add features to an existing project`)
};

const es_mcptooladdfeaturedescription4 = /** @type {(inputs: Mcptooladdfeaturedescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Añade funciones a un proyecto existente`)
};

const zh_mcptooladdfeaturedescription4 = /** @type {(inputs: Mcptooladdfeaturedescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`为现有项目添加功能`)
};

const ja_mcptooladdfeaturedescription4 = /** @type {(inputs: Mcptooladdfeaturedescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`既存のプロジェクトに機能を追加する`)
};

const ko_mcptooladdfeaturedescription4 = /** @type {(inputs: Mcptooladdfeaturedescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`기존 프로젝트에 기능 추가`)
};

const zh_hant1_mcptooladdfeaturedescription4 = /** @type {(inputs: Mcptooladdfeaturedescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`為現有項目新增功能`)
};

const de_mcptooladdfeaturedescription4 = /** @type {(inputs: Mcptooladdfeaturedescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fügen Sie Funktionen zu einem vorhandenen Projekt hinzu`)
};

const fr_mcptooladdfeaturedescription4 = /** @type {(inputs: Mcptooladdfeaturedescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ajouter des fonctionnalités à un projet existant`)
};

/**
* | output |
* | --- |
* | "Add features to an existing project" |
*
* @param {Mcptooladdfeaturedescription4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const mcptooladdfeaturedescription4 = /** @type {((inputs?: Mcptooladdfeaturedescription4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcptooladdfeaturedescription4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcptooladdfeaturedescription4(inputs)
	if (locale === "es") return es_mcptooladdfeaturedescription4(inputs)
	if (locale === "zh") return zh_mcptooladdfeaturedescription4(inputs)
	if (locale === "ja") return ja_mcptooladdfeaturedescription4(inputs)
	if (locale === "ko") return ko_mcptooladdfeaturedescription4(inputs)
	if (locale === "zh-Hant") return zh_hant1_mcptooladdfeaturedescription4(inputs)
	if (locale === "de") return de_mcptooladdfeaturedescription4(inputs)
	return fr_mcptooladdfeaturedescription4(inputs)
});
export { mcptooladdfeaturedescription4 as "mcpToolAddFeatureDescription" }