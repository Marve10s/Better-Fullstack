/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpseodescription2Inputs */



/**
* | output |
* | --- |
* | "Connect AI coding agents to Better Fullstack via MCP. Let Claude, Cursor, VS Code Copilot, and other agents scaffold fullstack projects programmatically." |
*
* @param {Mcpseodescription2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const mcpseodescription2 = /** @type {((inputs?: Mcpseodescription2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpseodescription2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Conecta agentes de programación con Better Fullstack mediante MCP. Permite que Claude, Cursor, VS Code Copilot y otros agentes creen proyectos fullstack programáticamente.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("通过 MCP 将 AI 编程代理连接到 Better Fullstack。让 Claude、Cursor、VS Code Copilot 和其他代理以编程方式生成全栈项目。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("AI コーディング エージェントを MCP 経由で Better Fullstack に接続します。 Claude、Cursor、VS Code Copilot、およびその他のエージェントにプログラムでフルスタック プロジェクトの足場を構築させます。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("AI 코딩 에이전트를 MCP를 통해 Better Fullstack에 연결합니다. Claude, Cursor, VS Code Copilot 및 기타 에이전트가 풀스택 프로젝트를 프로그래밍 방식으로 스캐폴드하도록 합니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("透過 MCP 將 AI 程式代理程式連接到 Better Fullstack。讓 Claude、Cursor、VS Code Copilot 和其他代理程式以程式設計方式產生全端專案。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Verbinden Sie AI Codierungsagenten über MCP mit Better Fullstack. Lassen Sie Claude, Cursor, VS Code Copilot und andere Agenten Fullstack-Projekte programmgesteuert aufbauen.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Connectez les agents de codage AI à Better Fullstack via MCP. Laissez Claude, Cursor, VS Code Copilot et d'autres agents élaborer des projets fullstack par programmation.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Підключайте AI-агентів для коду до Better Fullstack через MCP. Claude, Cursor, VS Code Copilot та інші агенти можуть програмно генерувати фулстек-проєкти.")
	return /** @type {LocalizedString} */ ("Connect AI coding agents to Better Fullstack via MCP. Let Claude, Cursor, VS Code Copilot, and other agents scaffold fullstack projects programmatically.")
});
export { mcpseodescription2 as "mcpSeoDescription" }