/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ agent: NonNullable<unknown> }} Llmcopyagentsetupcommand4Inputs */

const en_llmcopyagentsetupcommand4 = /** @type {(inputs: Llmcopyagentsetupcommand4Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Copy ${i?.agent} setup command`)
};

const es_llmcopyagentsetupcommand4 = /** @type {(inputs: Llmcopyagentsetupcommand4Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Copiar comando de configuración de ${i?.agent}`)
};

const zh_llmcopyagentsetupcommand4 = /** @type {(inputs: Llmcopyagentsetupcommand4Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`复制 ${i?.agent} 设置命令`)
};

const ja_llmcopyagentsetupcommand4 = /** @type {(inputs: Llmcopyagentsetupcommand4Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.agent} セットアップ コマンドをコピーします`)
};

const ko_llmcopyagentsetupcommand4 = /** @type {(inputs: Llmcopyagentsetupcommand4Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`${i?.agent} 설정 명령 복사`)
};

const zh_hant1_llmcopyagentsetupcommand4 = /** @type {(inputs: Llmcopyagentsetupcommand4Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`複製 ${i?.agent} 設定指令`)
};

const de_llmcopyagentsetupcommand4 = /** @type {(inputs: Llmcopyagentsetupcommand4Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Kopieren Sie den Setup-Befehl ${i?.agent}`)
};

const fr_llmcopyagentsetupcommand4 = /** @type {(inputs: Llmcopyagentsetupcommand4Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Copier la commande de configuration ${i?.agent}`)
};

/**
* | output |
* | --- |
* | "Copy {agent} setup command" |
*
* @param {Llmcopyagentsetupcommand4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const llmcopyagentsetupcommand4 = /** @type {((inputs: Llmcopyagentsetupcommand4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Llmcopyagentsetupcommand4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_llmcopyagentsetupcommand4(inputs)
	if (locale === "es") return es_llmcopyagentsetupcommand4(inputs)
	if (locale === "zh") return zh_llmcopyagentsetupcommand4(inputs)
	if (locale === "ja") return ja_llmcopyagentsetupcommand4(inputs)
	if (locale === "ko") return ko_llmcopyagentsetupcommand4(inputs)
	if (locale === "zh-Hant") return zh_hant1_llmcopyagentsetupcommand4(inputs)
	if (locale === "de") return de_llmcopyagentsetupcommand4(inputs)
	return fr_llmcopyagentsetupcommand4(inputs)
});
export { llmcopyagentsetupcommand4 as "llmCopyAgentSetupCommand" }