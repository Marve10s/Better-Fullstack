/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderpreviewinfodescription3Inputs */



/**
* | output |
* | --- |
* | "This is a static template preview. Files are not formatted. Some provider setup and imperative tooling steps require CLI execution and are not shown here." |
*
* @param {Builderpreviewinfodescription3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderpreviewinfodescription3 = /** @type {((inputs?: Builderpreviewinfodescription3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderpreviewinfodescription3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Esta es una vista previa estática de la plantilla. Los archivos no están formateados. Algunos pasos de proveedores y herramientas imperativas requieren la CLI y no se muestran aquí.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("这是静态模板预览。文件不会被格式化。部分提供方设置和命令式工具步骤需要运行 CLI，因此不会在这里显示。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("これは静的なテンプレートのプレビューです。ファイルはフォーマットされていません。一部のプロバイダー設定と命令型ツール手順には CLI が必要なため、ここには表示されません。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("이것은 정적 템플릿 미리보기입니다. 파일은 포맷되지 않습니다. 일부 공급자 설정과 명령형 도구 단계에는 CLI가 필요하며 여기에 표시되지 않습니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("這是靜態模板預覽。文件不會被格式化。部分提供者設定和命令式工具步驟需要執行 CLI，因此不會在這裡顯示。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Dies ist eine statische Vorlagenvorschau. Dateien sind nicht formatiert. Einige Anbieter- und imperative Tooling-Schritte erfordern die CLI und werden hier nicht angezeigt.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Il s'agit d'un aperçu statique. Les fichiers ne sont pas formatés. Certaines étapes impératives de fournisseur et d'outillage nécessitent la CLI et ne sont pas affichées ici.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Це статичний попередній перегляд шаблону. Файли не форматуються. Деякі налаштування провайдерів та імперативні кроки інструментів потребують CLI й тут не показані.")
	return /** @type {LocalizedString} */ ("This is a static template preview. Files are not formatted. Some provider setup and imperative tooling steps require CLI execution and are not shown here.")
});
export { builderpreviewinfodescription3 as "builderPreviewInfoDescription" }