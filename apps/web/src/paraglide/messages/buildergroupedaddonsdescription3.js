/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildergroupedaddonsdescription3Inputs */

const en_buildergroupedaddonsdescription3 = /** @type {(inputs: Buildergroupedaddonsdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`platforms, integrations, AI agents, and TanStack extras are split below. MCP and Skills still add the addon flags first, then the CLI asks follow-up questions to configure them.`)
};

const es_buildergroupedaddonsdescription3 = /** @type {(inputs: Buildergroupedaddonsdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`plataformas, integraciones, agentes de IA y extras de TanStack se dividen abajo. MCP y Skills aún añaden primero los flags, luego la CLI hace preguntas de configuración.`)
};

const zh_buildergroupedaddonsdescription3 = /** @type {(inputs: Buildergroupedaddonsdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`平台、集成、AI 代理和 TanStack 扩展会在下方拆分展示。MCP 和 Skills 仍会先添加 addon flags，然后 CLI 会继续询问配置。`)
};

const ja_buildergroupedaddonsdescription3 = /** @type {(inputs: Buildergroupedaddonsdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`プラットフォーム、統合、AI エージェント、および TanStack の追加機能は以下に分割されています。 MCP とスキルは依然として最初にアドオン フラグを追加し、次に CLI がそれらを構成するためのフォローアップの質問をします。`)
};

const ko_buildergroupedaddonsdescription3 = /** @type {(inputs: Buildergroupedaddonsdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`플랫폼, 통합, AI 에이전트 및 TanStack 추가 항목은 아래에 분할되어 있습니다. MCP 및 Skills는 여전히 애드온 플래그를 먼저 추가한 다음 CLI이 이를 구성하기 위해 후속 질문을 합니다.`)
};

const zh_hant1_buildergroupedaddonsdescription3 = /** @type {(inputs: Buildergroupedaddonsdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`平台、整合、AI 代理程式和 TanStack 擴充會在下方拆分展示。 MCP 和 Skills 仍會先加入 addon flags，然後 CLI 會繼續詢問設定。`)
};

const de_buildergroupedaddonsdescription3 = /** @type {(inputs: Buildergroupedaddonsdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Plattformen, Integrationen, AI-Agenten und TanStack-Extras sind unten aufgeführt. MCP und Skills fügen immer noch zuerst die Add-on-Flags hinzu, dann stellt CLI Folgefragen, um sie zu konfigurieren.`)
};

const fr_buildergroupedaddonsdescription3 = /** @type {(inputs: Buildergroupedaddonsdescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`les plates-formes, les intégrations, les agents AI et les extras TanStack sont répartis ci-dessous. MCP et Skills ajoutent toujours les indicateurs du module complémentaire en premier, puis CLI pose des questions de suivi pour les configurer.`)
};

/**
* | output |
* | --- |
* | "platforms, integrations, AI agents, and TanStack extras are split below. MCP and Skills still add the addon flags first, then the CLI asks follow-up question..." |
*
* @param {Buildergroupedaddonsdescription3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const buildergroupedaddonsdescription3 = /** @type {((inputs?: Buildergroupedaddonsdescription3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildergroupedaddonsdescription3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_buildergroupedaddonsdescription3(inputs)
	if (locale === "es") return es_buildergroupedaddonsdescription3(inputs)
	if (locale === "zh") return zh_buildergroupedaddonsdescription3(inputs)
	if (locale === "ja") return ja_buildergroupedaddonsdescription3(inputs)
	if (locale === "ko") return ko_buildergroupedaddonsdescription3(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildergroupedaddonsdescription3(inputs)
	if (locale === "de") return de_buildergroupedaddonsdescription3(inputs)
	return fr_buildergroupedaddonsdescription3(inputs)
});
export { buildergroupedaddonsdescription3 as "builderGroupedAddonsDescription" }