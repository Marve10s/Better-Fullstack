/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcptoolplanadditiondescription4Inputs */

const en_mcptoolplanadditiondescription4 = /** @type {(inputs: Mcptoolplanadditiondescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Validate proposed addons for an existing project`)
};

const es_mcptoolplanadditiondescription4 = /** @type {(inputs: Mcptoolplanadditiondescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Valida addons propuestos para un proyecto existente`)
};

const zh_mcptoolplanadditiondescription4 = /** @type {(inputs: Mcptoolplanadditiondescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`验证现有项目的拟添加 addons`)
};

const ja_mcptoolplanadditiondescription4 = /** @type {(inputs: Mcptoolplanadditiondescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`既存のプロジェクトに対して提案されたアドオンを検証する`)
};

const ko_mcptoolplanadditiondescription4 = /** @type {(inputs: Mcptoolplanadditiondescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`기존 프로젝트에 대해 제안된 애드온 검증`)
};

const zh_hant1_mcptoolplanadditiondescription4 = /** @type {(inputs: Mcptoolplanadditiondescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`驗證現有項目的擬添加 addons`)
};

const de_mcptoolplanadditiondescription4 = /** @type {(inputs: Mcptoolplanadditiondescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Validieren Sie vorgeschlagene Add-ons für ein bestehendes Projekt`)
};

const fr_mcptoolplanadditiondescription4 = /** @type {(inputs: Mcptoolplanadditiondescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Valider les extensions proposées pour un projet existant`)
};

/**
* | output |
* | --- |
* | "Validate proposed addons for an existing project" |
*
* @param {Mcptoolplanadditiondescription4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const mcptoolplanadditiondescription4 = /** @type {((inputs?: Mcptoolplanadditiondescription4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcptoolplanadditiondescription4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcptoolplanadditiondescription4(inputs)
	if (locale === "es") return es_mcptoolplanadditiondescription4(inputs)
	if (locale === "zh") return zh_mcptoolplanadditiondescription4(inputs)
	if (locale === "ja") return ja_mcptoolplanadditiondescription4(inputs)
	if (locale === "ko") return ko_mcptoolplanadditiondescription4(inputs)
	if (locale === "zh-Hant") return zh_hant1_mcptoolplanadditiondescription4(inputs)
	if (locale === "de") return de_mcptoolplanadditiondescription4(inputs)
	return fr_mcptoolplanadditiondescription4(inputs)
});
export { mcptoolplanadditiondescription4 as "mcpToolPlanAdditionDescription" }