/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderpreviewinfodescription3Inputs */

const en_builderpreviewinfodescription3 = /** @type {(inputs: Builderpreviewinfodescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`This is a static template preview. Files are not formatted. Some features like database provider setup (Turso, Neon, Supabase, etc.) and certain addons (Fumadocs, Starlight, Tauri, etc.) require CLI execution and are not shown here.`)
};

const es_builderpreviewinfodescription3 = /** @type {(inputs: Builderpreviewinfodescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Esta es una vista previa estática de la plantilla. Los archivos no están formateados. Algunas funciones, como la configuración de proveedores de base de datos (Turso, Neon, Supabase, etc.) y ciertos addons (Fumadocs, Starlight, Tauri, etc.), requieren ejecutar la CLI y no se muestran aquí.`)
};

const zh_builderpreviewinfodescription3 = /** @type {(inputs: Builderpreviewinfodescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`这是静态模板预览。文件不会被格式化。某些功能，例如数据库提供方设置（Turso、Neon、Supabase 等）以及部分 addons（Fumadocs、Starlight、Tauri 等），需要执行 CLI，因此不会在这里显示。`)
};

const ja_builderpreviewinfodescription3 = /** @type {(inputs: Builderpreviewinfodescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`これは静的なテンプレートのプレビューです。ファイルがフォーマットされていません。データベース プロバイダーのセットアップ (Turso、Neon、Supabase など) や特定のアドオン (Fumadocs、Starlight、Tauri など) などの一部の機能は、CLI の実行が必要なため、ここには示されていません。`)
};

const ko_builderpreviewinfodescription3 = /** @type {(inputs: Builderpreviewinfodescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`이것은 정적 템플릿 미리보기입니다. 파일이 포맷되지 않았습니다. 데이터베이스 공급자 설정(Turso, Neon, Supabase 등) 및 특정 애드온(Fumadocs, Starlight, Tauri 등)과 같은 일부 기능에는 CLI 실행이 필요하며 여기에 표시되지 않습니다.`)
};

const zh_hant1_builderpreviewinfodescription3 = /** @type {(inputs: Builderpreviewinfodescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`這是靜態模板預覽。文件不會被格式化。某些功能，例如資料庫提供者設定（Turso、Neon、Supabase 等）以及部分 addons（Fumadocs、Starlight、Tauri 等），需要執行 CLI，因此不會在這裡顯示。`)
};

const de_builderpreviewinfodescription3 = /** @type {(inputs: Builderpreviewinfodescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dies ist eine statische Vorlagenvorschau. Dateien sind nicht formatiert. Einige Funktionen wie die Einrichtung des Datenbankanbieters (Turso, Neon, Supabase usw.) und bestimmte Add-ons (Fumadocs, Starlight, Tauri usw.) erfordern die Ausführung CLI und werden hier nicht angezeigt.`)
};

const fr_builderpreviewinfodescription3 = /** @type {(inputs: Builderpreviewinfodescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Il s'agit d'un aperçu de modèle statique. Les fichiers ne sont pas formatés. Certaines fonctionnalités telles que la configuration du fournisseur de base de données (Turso, Neon, Supabase, etc.) et certains modules complémentaires (Fumadocs, Starlight, Tauri, etc.) nécessitent l'exécution de CLI et ne sont pas affichées ici.`)
};

/**
* | output |
* | --- |
* | "This is a static template preview. Files are not formatted. Some features like database provider setup (Turso, Neon, Supabase, etc.) and certain addons (Fuma..." |
*
* @param {Builderpreviewinfodescription3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const builderpreviewinfodescription3 = /** @type {((inputs?: Builderpreviewinfodescription3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderpreviewinfodescription3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderpreviewinfodescription3(inputs)
	if (locale === "es") return es_builderpreviewinfodescription3(inputs)
	if (locale === "zh") return zh_builderpreviewinfodescription3(inputs)
	if (locale === "ja") return ja_builderpreviewinfodescription3(inputs)
	if (locale === "ko") return ko_builderpreviewinfodescription3(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderpreviewinfodescription3(inputs)
	if (locale === "de") return de_builderpreviewinfodescription3(inputs)
	return fr_builderpreviewinfodescription3(inputs)
});
export { builderpreviewinfodescription3 as "builderPreviewInfoDescription" }