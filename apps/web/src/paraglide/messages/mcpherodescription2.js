/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcpherodescription2Inputs */



/**
* | output |
* | --- |
* | "Give coding agents structured access to Better Fullstack. They can inspect options, validate combinations, preview file trees, and scaffold projects without ..." |
*
* @param {Mcpherodescription2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const mcpherodescription2 = /** @type {((inputs?: Mcpherodescription2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcpherodescription2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Da a los agentes de programación acceso estructurado a Better Fullstack. Pueden inspeccionar opciones, validar combinaciones, previsualizar árboles de archivos y crear proyectos sin adivinar flags.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("给编程代理结构化访问 Better Fullstack 的能力。它们可以查看选项、验证组合、预览文件树，并在不猜 CLI flags 的情况下生成项目。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("コーディングエージェントに Better Fullstack への構造化されたアクセスを提供します。CLI フラグを推測することなく、オプションの確認、組み合わせの検証、ファイルツリーのプレビュー、プロジェクトのスキャフォールドまで行えます。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("코딩 에이전트에 Better Fullstack에 대한 구조화된 액세스 권한을 부여하세요. CLI 플래그를 추측하지 않고도 옵션을 검사하고, 조합을 검증하고, 파일 트리를 미리 보고, 프로젝트를 스캐폴딩할 수 있습니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("給程式設計代理程式結構化存取 Better Fullstack 的能力。它們可以查看選項、驗證組合、預覽檔案樹，並在不猜測 CLI flags 的情況下產生專案。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Geben Sie Programmieragenten strukturierten Zugriff auf Better Fullstack. Sie können Optionen prüfen, Kombinationen validieren, Dateibäume in der Vorschau anzeigen und Projekte erstellen, ohne CLI-Flags zu erraten.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Accordez aux agents de codage un accès structuré à Better Fullstack. Ils peuvent inspecter les options, valider les combinaisons, prévisualiser les arborescences de fichiers et échafauder des projets sans deviner les indicateurs CLI.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Дайте агентам для коду структурований доступ до Better Fullstack. Вони можуть переглядати опції, перевіряти комбінації, попередньо бачити дерево файлів і генерувати проєкти без вгадування CLI-прапорців.")
	return /** @type {LocalizedString} */ ("Give coding agents structured access to Better Fullstack. They can inspect options, validate combinations, preview file trees, and scaffold projects without guessing CLI flags.")
});
export { mcpherodescription2 as "mcpHeroDescription" }