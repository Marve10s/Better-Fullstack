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

const ja_changelogrelease20260612highlightmulti3 = /** @type {(inputs: Changelogrelease20260612highlightmulti3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ORM 依存関係と認証スキーマが欠落しているマルチエコシステム データベース パッケージを修正し、unistyles ネイティブ テンプレートの Better Auth に欠落している expo-network 依存関係を追加しました。`)
};

const ko_changelogrelease20260612highlightmulti3 = /** @type {(inputs: Changelogrelease20260612highlightmulti3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ORM 종속성 및 인증 스키마가 누락된 다중 생태계 데이터베이스 패키지를 수정하고 unistyles 기본 템플릿의 Better Auth에 대한 누락된 expo-network 종속성을 추가했습니다.`)
};

const zh_hant1_changelogrelease20260612highlightmulti3 = /** @type {(inputs: Changelogrelease20260612highlightmulti3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`修正 multi-ecosystem 資料庫包缺少 ORM 依賴和 auth schema 的問題，並為 unistyles native 模板上的 Better Auth 補上缺少的 expo-network 依賴。`)
};

const de_changelogrelease20260612highlightmulti3 = /** @type {(inputs: Changelogrelease20260612highlightmulti3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Es wurde ein Problem behoben, bei dem bei Multi-Ökosystem-Datenbankpaketen die ORM-Abhängigkeiten und das Authentifizierungsschema fehlten, und es wurde die fehlende expo-network-Abhängigkeit für Better Auth zur nativen Unistyles-Vorlage hinzugefügt.`)
};

const fr_changelogrelease20260612highlightmulti3 = /** @type {(inputs: Changelogrelease20260612highlightmulti3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Correction des packages de bases de données multi-écosystèmes manquant de leurs dépendances ORM et de leur schéma d'authentification, et ajout de la dépendance expo-network manquante pour Better Auth sur le modèle natif unistyles.`)
};

/**
* | output |
* | --- |
* | "Fixed multi-ecosystem database packages missing their ORM dependencies and auth schema, and added the missing expo-network dependency for Better Auth on the ..." |
*
* @param {Changelogrelease20260612highlightmulti3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const changelogrelease20260612highlightmulti3 = /** @type {((inputs?: Changelogrelease20260612highlightmulti3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Changelogrelease20260612highlightmulti3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_changelogrelease20260612highlightmulti3(inputs)
	if (locale === "es") return es_changelogrelease20260612highlightmulti3(inputs)
	if (locale === "zh") return zh_changelogrelease20260612highlightmulti3(inputs)
	if (locale === "ja") return ja_changelogrelease20260612highlightmulti3(inputs)
	if (locale === "ko") return ko_changelogrelease20260612highlightmulti3(inputs)
	if (locale === "zh-Hant") return zh_hant1_changelogrelease20260612highlightmulti3(inputs)
	if (locale === "de") return de_changelogrelease20260612highlightmulti3(inputs)
	return fr_changelogrelease20260612highlightmulti3(inputs)
});
export { changelogrelease20260612highlightmulti3 as "changelogRelease20260612HighlightMulti" }