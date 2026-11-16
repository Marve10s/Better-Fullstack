/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ agent: NonNullable<unknown> }} Llmcopyagentsetupcommand4Inputs */



/**
* | output |
* | --- |
* | "Copy {agent} setup command" |
*
* @param {Llmcopyagentsetupcommand4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const llmcopyagentsetupcommand4 = /** @type {((inputs: Llmcopyagentsetupcommand4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Llmcopyagentsetupcommand4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((i, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ (`Copiar comando de configuración de ${i?.agent}`)
	if (locale === "zh") return /** @type {LocalizedString} */ (`复制 ${i?.agent} 设置命令`)
	if (locale === "ja") return /** @type {LocalizedString} */ (`${i?.agent} セットアップ コマンドをコピーします`)
	if (locale === "ko") return /** @type {LocalizedString} */ (`${i?.agent} 설정 명령 복사`)
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ (`複製 ${i?.agent} 設定指令`)
	if (locale === "de") return /** @type {LocalizedString} */ (`Kopieren Sie den Setup-Befehl ${i?.agent}`)
	if (locale === "fr") return /** @type {LocalizedString} */ (`Copier la commande de configuration ${i?.agent}`)
	if (locale === "uk") return /** @type {LocalizedString} */ (`Копіювати команду налаштування ${i?.agent}`)
	return /** @type {LocalizedString} */ (`Copy ${i?.agent} setup command`)
});
export { llmcopyagentsetupcommand4 as "llmCopyAgentSetupCommand" }