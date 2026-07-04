/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpworkflowdescription2Inputs */

const en_mcpworkflowdescription2 = /** @type {(inputs: Mcpworkflowdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Agents use the same schema and compatibility rules as the web builder, so generated commands match what users can configure visually.`)
};

const es_mcpworkflowdescription2 = /** @type {(inputs: Mcpworkflowdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Los agentes usan el mismo esquema y reglas de compatibilidad que el constructor web.`)
};

const zh_mcpworkflowdescription2 = /** @type {(inputs: Mcpworkflowdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`代理使用与网页构建器相同的 schema 和兼容性规则，因此生成的命令会与可视化配置保持一致。`)
};

const ja_mcpworkflowdescription2 = /** @type {(inputs: Mcpworkflowdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`エージェントは Web ビルダーと同じスキーマと互換性ルールを使用するため、生成されたコマンドはユーザーが視覚的に設定できるものと一致します。`)
};

const ko_mcpworkflowdescription2 = /** @type {(inputs: Mcpworkflowdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`에이전트는 웹 빌더와 동일한 스키마 및 호환성 규칙을 사용하므로 생성된 명령은 사용자가 시각적으로 구성할 수 있는 명령과 일치합니다.`)
};

const zh_hant1_mcpworkflowdescription2 = /** @type {(inputs: Mcpworkflowdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`代理程式使用與網頁建構器相同的 schema 和相容性規則，因此產生的命令會與視覺化設定保持一致。`)
};

const de_mcpworkflowdescription2 = /** @type {(inputs: Mcpworkflowdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Agenten verwenden dasselbe Schema und dieselben Kompatibilitätsregeln wie der Web Builder, sodass die generierten Befehle mit dem übereinstimmen, was Benutzer visuell konfigurieren können.`)
};

const fr_mcpworkflowdescription2 = /** @type {(inputs: Mcpworkflowdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Les agents utilisent le même schéma et les mêmes règles de compatibilité que le générateur Web. Les commandes générées correspondent donc à ce que les utilisateurs peuvent configurer visuellement.`)
};

/**
* | output |
* | --- |
* | "Agents use the same schema and compatibility rules as the web builder, so generated commands match what users can configure visually." |
*
* @param {Mcpworkflowdescription2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const mcpworkflowdescription2 = /** @type {((inputs?: Mcpworkflowdescription2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpworkflowdescription2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpworkflowdescription2(inputs)
	if (locale === "es") return es_mcpworkflowdescription2(inputs)
	if (locale === "zh") return zh_mcpworkflowdescription2(inputs)
	if (locale === "ja") return ja_mcpworkflowdescription2(inputs)
	if (locale === "ko") return ko_mcpworkflowdescription2(inputs)
	if (locale === "zh-Hant") return zh_hant1_mcpworkflowdescription2(inputs)
	if (locale === "de") return de_mcpworkflowdescription2(inputs)
	return fr_mcpworkflowdescription2(inputs)
});
export { mcpworkflowdescription2 as "mcpWorkflowDescription" }