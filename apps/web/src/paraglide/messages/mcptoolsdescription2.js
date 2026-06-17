/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcptoolsdescription2Inputs */

const en_mcptoolsdescription2 = /** @type {(inputs: Mcptoolsdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`The server exposes narrow, typed tools for guidance, schema lookup, compatibility checks, dry runs, creation, and adding features.`)
};

const es_mcptoolsdescription2 = /** @type {(inputs: Mcptoolsdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`El servidor expone herramientas tipadas y pequeñas para guía, esquema, compatibilidad, dry runs, creación y añadir funciones.`)
};

const zh_mcptoolsdescription2 = /** @type {(inputs: Mcptoolsdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`服务器提供聚焦且有类型的工具，用于指南、schema 查询、兼容性检查、dry run、创建和添加功能。`)
};

const ja_mcptoolsdescription2 = /** @type {(inputs: Mcptoolsdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`サーバーは、ガイダンス、スキーマ検索、互換性チェック、ドライ ラン、作成、機能の追加のための限定された型付きツールを公開します。`)
};

const ko_mcptoolsdescription2 = /** @type {(inputs: Mcptoolsdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`서버는 지침, 스키마 조회, 호환성 확인, 테스트 실행, 생성 및 기능 추가를 위한 좁은 형식의 도구를 제공합니다.`)
};

const zh_hant1_mcptoolsdescription2 = /** @type {(inputs: Mcptoolsdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`伺服器提供聚焦且有類型的工具，用於指南、schema 查詢、相容性檢查、dry run、建立和新增功能。`)
};

const de_mcptoolsdescription2 = /** @type {(inputs: Mcptoolsdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Der Server stellt enge, typisierte Tools zur Anleitung, Schemasuche, Kompatibilitätsprüfungen, Probeläufe, Erstellung und Hinzufügen von Funktionen bereit.`)
};

const fr_mcptoolsdescription2 = /** @type {(inputs: Mcptoolsdescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Le serveur expose des outils restreints et typés pour l'orientation, la recherche de schéma, les vérifications de compatibilité, les essais à blanc, la création et l'ajout de fonctionnalités.`)
};

/**
* | output |
* | --- |
* | "The server exposes narrow, typed tools for guidance, schema lookup, compatibility checks, dry runs, creation, and adding features." |
*
* @param {Mcptoolsdescription2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const mcptoolsdescription2 = /** @type {((inputs?: Mcptoolsdescription2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcptoolsdescription2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcptoolsdescription2(inputs)
	if (locale === "es") return es_mcptoolsdescription2(inputs)
	if (locale === "zh") return zh_mcptoolsdescription2(inputs)
	if (locale === "ja") return ja_mcptoolsdescription2(inputs)
	if (locale === "ko") return ko_mcptoolsdescription2(inputs)
	if (locale === "zh-Hant") return zh_hant1_mcptoolsdescription2(inputs)
	if (locale === "de") return de_mcptoolsdescription2(inputs)
	return fr_mcptoolsdescription2(inputs)
});
export { mcptoolsdescription2 as "mcpToolsDescription" }