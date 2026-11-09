/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcptoolplandescription3Inputs */



/**
* | output |
* | --- |
* | "Dry-run preview: generates the file tree in memory" |
*
* @param {Mcptoolplandescription3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const mcptoolplandescription3 = /** @type {((inputs?: Mcptoolplandescription3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcptoolplandescription3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Vista previa dry-run: genera el árbol de archivos en memoria")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Dry-run 预览：在内存中生成文件树")
	if (locale === "ja") return /** @type {LocalizedString} */ ("ドライラン プレビュー: メモリ内にファイル ツリーを生成します。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("테스트 실행 미리보기: 메모리에 파일 트리를 생성합니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Dry-run 預覽：在記憶體中產生檔案樹")
	if (locale === "de") return /** @type {LocalizedString} */ ("Probelaufvorschau: Erstellt den Dateibaum im Speicher")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Aperçu à blanc : génère l'arborescence des fichiers en mémoire")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Dry-run preview: генерує дерево файлів у пам’яті")
	return /** @type {LocalizedString} */ ("Dry-run preview: generates the file tree in memory")
});
export { mcptoolplandescription3 as "mcpToolPlanDescription" }