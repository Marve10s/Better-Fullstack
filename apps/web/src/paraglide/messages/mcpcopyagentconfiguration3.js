/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ agent: NonNullable<unknown> }} Mcpcopyagentconfiguration3Inputs */



/**
* | output |
* | --- |
* | "Copy {agent} configuration" |
*
* @param {Mcpcopyagentconfiguration3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const mcpcopyagentconfiguration3 = /** @type {((inputs: Mcpcopyagentconfiguration3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpcopyagentconfiguration3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((i, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ (`Copiar configuración de ${i?.agent}`)
	if (locale === "zh") return /** @type {LocalizedString} */ (`复制 ${i?.agent} 配置`)
	if (locale === "ja") return /** @type {LocalizedString} */ (`${i?.agent} 構成をコピーします`)
	if (locale === "ko") return /** @type {LocalizedString} */ (`${i?.agent} 구성 복사`)
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ (`複製 ${i?.agent} 配置`)
	if (locale === "de") return /** @type {LocalizedString} */ (`Kopieren Sie die ${i?.agent}-Konfiguration`)
	if (locale === "fr") return /** @type {LocalizedString} */ (`Copier la configuration ${i?.agent}`)
	if (locale === "uk") return /** @type {LocalizedString} */ (`Копіювати конфігурацію ${i?.agent}`)
	return /** @type {LocalizedString} */ (`Copy ${i?.agent} configuration`)
});
export { mcpcopyagentconfiguration3 as "mcpCopyAgentConfiguration" }