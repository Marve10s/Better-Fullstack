/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpherodescription2Inputs */

const en_mcpherodescription2 = /** @type {(inputs: Mcpherodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Give coding agents structured access to Better Fullstack. They can inspect options, validate combinations, preview file trees, and scaffold projects without guessing CLI flags.`)
};

const es_mcpherodescription2 = /** @type {(inputs: Mcpherodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Da a los agentes de programación acceso estructurado a Better Fullstack. Pueden inspeccionar opciones, validar combinaciones, previsualizar árboles de archivos y crear proyectos sin adivinar flags.`)
};

const zh_mcpherodescription2 = /** @type {(inputs: Mcpherodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`给编程代理结构化访问 Better Fullstack 的能力。它们可以查看选项、验证组合、预览文件树，并在不猜 CLI flags 的情况下生成项目。`)
};

const ja_mcpherodescription2 = /** @type {(inputs: Mcpherodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`コーディング エージェントに Better Fullstack への構造化されたアクセスを許可します。 CLI フラグを推測することなく、オプションの検査、組み合わせの検証、ファイル ツリーのプレビュー、およびプロジェクトの足場を構築できます。`)
};

const ko_mcpherodescription2 = /** @type {(inputs: Mcpherodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`코딩 에이전트에 Better Fullstack에 대한 구조화된 액세스 권한을 부여하세요. CLI 플래그를 추측하지 않고도 옵션을 검사하고, 조합을 검증하고, 파일 트리를 미리 보고, 스캐폴드 프로젝트를 실행할 수 있습니다.`)
};

const zh_hant1_mcpherodescription2 = /** @type {(inputs: Mcpherodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`給程式設計代理程式結構化存取 Better Fullstack 的能力。它們可以查看選項、驗證組合、預覽檔案樹，並在不猜測 CLI flags 的情況下產生專案。`)
};

const de_mcpherodescription2 = /** @type {(inputs: Mcpherodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Geben Sie Programmieragenten strukturierten Zugriff auf Better Fullstack. Sie können Optionen prüfen, Kombinationen validieren, Dateibäume in der Vorschau anzeigen und Projekte erstellen, ohne CLI-Flags zu erraten.`)
};

const fr_mcpherodescription2 = /** @type {(inputs: Mcpherodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Accordez aux agents de codage un accès structuré à Better Fullstack. Ils peuvent inspecter les options, valider les combinaisons, prévisualiser les arborescences de fichiers et les projets d'échafaudage sans deviner les indicateurs CLI.`)
};

/**
* | output |
* | --- |
* | "Give coding agents structured access to Better Fullstack. They can inspect options, validate combinations, preview file trees, and scaffold projects without ..." |
*
* @param {Mcpherodescription2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const mcpherodescription2 = /** @type {((inputs?: Mcpherodescription2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpherodescription2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcpherodescription2(inputs)
	if (locale === "es") return es_mcpherodescription2(inputs)
	if (locale === "zh") return zh_mcpherodescription2(inputs)
	if (locale === "ja") return ja_mcpherodescription2(inputs)
	if (locale === "ko") return ko_mcpherodescription2(inputs)
	if (locale === "zh-Hant") return zh_hant1_mcpherodescription2(inputs)
	if (locale === "de") return de_mcpherodescription2(inputs)
	return fr_mcpherodescription2(inputs)
});
export { mcpherodescription2 as "mcpHeroDescription" }