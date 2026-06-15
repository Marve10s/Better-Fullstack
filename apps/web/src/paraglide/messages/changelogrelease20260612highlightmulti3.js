/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Changelogrelease20260612highlightmulti3Inputs */

const en_changelogrelease20260612highlightmulti3 = /** @type {(inputs: Changelogrelease20260612highlightmulti3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Fixed multi-ecosystem database packages missing their ORM dependencies and auth schema, and added the missing expo-network dependency for Better Auth on the unistyles native template.`)
};

const es_changelogrelease20260612highlightmulti3 = /** @type {(inputs: Changelogrelease20260612highlightmulti3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Se corrigieron paquetes de base de datos multi-ecosistema a los que les faltaban dependencias ORM y schema de auth, y se añadió la dependencia expo-network que faltaba para Better Auth en la plantilla native unistyles.`)
};

const zh_changelogrelease20260612highlightmulti3 = /** @type {(inputs: Changelogrelease20260612highlightmulti3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`修复 multi-ecosystem 数据库包缺失 ORM 依赖和 auth schema 的问题，并为 unistyles native 模板上的 Better Auth 补上缺失的 expo-network 依赖。`)
};

/**
* | output |
* | --- |
* | "Fixed multi-ecosystem database packages missing their ORM dependencies and auth schema, and added the missing expo-network dependency for Better Auth on the ..." |
*
* @param {Changelogrelease20260612highlightmulti3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" }} options
* @returns {LocalizedString}
*/
const changelogrelease20260612highlightmulti3 = /** @type {((inputs?: Changelogrelease20260612highlightmulti3Inputs, options?: { locale?: "en" | "es" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changelogrelease20260612highlightmulti3Inputs, { locale?: "en" | "es" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_changelogrelease20260612highlightmulti3(inputs)
	if (locale === "es") return es_changelogrelease20260612highlightmulti3(inputs)
	return zh_changelogrelease20260612highlightmulti3(inputs)
});
export { changelogrelease20260612highlightmulti3 as "changelogRelease20260612HighlightMulti" }