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

/**
* | output |
* | --- |
* | "This is a static template preview. Files are not formatted. Some features like database provider setup (Turso, Neon, Supabase, etc.) and certain addons (Fuma..." |
*
* @param {Builderpreviewinfodescription3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const builderpreviewinfodescription3 = /** @type {((inputs?: Builderpreviewinfodescription3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderpreviewinfodescription3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderpreviewinfodescription3(inputs)
	if (locale === "es") return es_builderpreviewinfodescription3(inputs)
	return zh_builderpreviewinfodescription3(inputs)
});
export { builderpreviewinfodescription3 as "builderPreviewInfoDescription" }