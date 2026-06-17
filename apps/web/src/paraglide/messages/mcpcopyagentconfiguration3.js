/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ agent: NonNullable<unknown> }} Mcpcopyagentconfiguration3Inputs */

const en_mcpcopyagentconfiguration3 = /** @type {(inputs: Mcpcopyagentconfiguration3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Copy ${i?.agent} configuration`)
};

const es_mcpcopyagentconfiguration3 = /** @type {(inputs: Mcpcopyagentconfiguration3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Copiar configuración de ${i?.agent}`)
};

const zh_mcpcopyagentconfiguration3 = /** @type {(inputs: Mcpcopyagentconfiguration3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`复制 ${i?.agent} 配置`)
};

const ja_mcpcopyagentconfiguration3 = /** @type {(inputs: Mcpcopyagentconfiguration3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.agent} 構成をコピーします`)
};

const ko_mcpcopyagentconfiguration3 = /** @type {(inputs: Mcpcopyagentconfiguration3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.agent} 구성 복사`)
};

const zh_hant1_mcpcopyagentconfiguration3 = /** @type {(inputs: Mcpcopyagentconfiguration3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`複製 ${i?.agent} 配置`)
};

const de_mcpcopyagentconfiguration3 = /** @type {(inputs: Mcpcopyagentconfiguration3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Kopieren Sie die ${i?.agent}-Konfiguration`)
};

const fr_mcpcopyagentconfiguration3 = /** @type {(inputs: Mcpcopyagentconfiguration3Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Copier la configuration ${i?.agent}`)
};

/**
* | output |
* | --- |
* | "Copy {agent} configuration" |
*
* @param {Mcpcopyagentconfiguration3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const mcpcopyagentconfiguration3 = /** @type {((inputs: Mcpcopyagentconfiguration3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpcopyagentconfiguration3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpcopyagentconfiguration3(inputs)
	if (locale === "es") return es_mcpcopyagentconfiguration3(inputs)
	if (locale === "zh") return zh_mcpcopyagentconfiguration3(inputs)
	if (locale === "ja") return ja_mcpcopyagentconfiguration3(inputs)
	if (locale === "ko") return ko_mcpcopyagentconfiguration3(inputs)
	if (locale === "zh-Hant") return zh_hant1_mcpcopyagentconfiguration3(inputs)
	if (locale === "de") return de_mcpcopyagentconfiguration3(inputs)
	return fr_mcpcopyagentconfiguration3(inputs)
});
export { mcpcopyagentconfiguration3 as "mcpCopyAgentConfiguration" }