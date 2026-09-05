/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Buildercomposerdatabaselater3Inputs */

const en_buildercomposerdatabaselater3 = /** @type {(inputs: Buildercomposerdatabaselater3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Databases are optional. Add one while configuring your applications.`)
};

const es_buildercomposerdatabaselater3 = /** @type {(inputs: Buildercomposerdatabaselater3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Las bases de datos son opcionales. Añade una al configurar tus aplicaciones.`)
};

const zh_buildercomposerdatabaselater3 = /** @type {(inputs: Buildercomposerdatabaselater3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`数据库为可选项。你可以在配置应用时添加数据库。`)
};

const ja_buildercomposerdatabaselater3 = /** @type {(inputs: Buildercomposerdatabaselater3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`データベースは任意です。アプリケーションの構成時に追加できます。`)
};

const ko_buildercomposerdatabaselater3 = /** @type {(inputs: Buildercomposerdatabaselater3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`데이터베이스는 선택 사항입니다. 애플리케이션 구성 단계에서 추가할 수 있습니다.`)
};

const zh_hant1_buildercomposerdatabaselater3 = /** @type {(inputs: Buildercomposerdatabaselater3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`資料庫為選用項目。你可以在設定應用程式時新增資料庫。`)
};

const de_buildercomposerdatabaselater3 = /** @type {(inputs: Buildercomposerdatabaselater3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Datenbanken sind optional. Füge bei der Konfiguration deiner Anwendungen eine hinzu.`)
};

const fr_buildercomposerdatabaselater3 = /** @type {(inputs: Buildercomposerdatabaselater3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Les bases de données sont facultatives. Ajoutez-en une lors de la configuration de vos applications.`)
};

const uk_buildercomposerdatabaselater3 = /** @type {(inputs: Buildercomposerdatabaselater3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Бази даних необов’язкові. Додайте базу під час налаштування застосунків.`)
};

/**
* | output |
* | --- |
* | "Databases are optional. Add one while configuring your applications." |
*
* @param {Buildercomposerdatabaselater3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const buildercomposerdatabaselater3 = /** @type {((inputs?: Buildercomposerdatabaselater3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Buildercomposerdatabaselater3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_buildercomposerdatabaselater3(inputs)
	if (locale === "zh") return zh_buildercomposerdatabaselater3(inputs)
	if (locale === "ja") return ja_buildercomposerdatabaselater3(inputs)
	if (locale === "ko") return ko_buildercomposerdatabaselater3(inputs)
	if (locale === "zh-Hant") return zh_hant1_buildercomposerdatabaselater3(inputs)
	if (locale === "de") return de_buildercomposerdatabaselater3(inputs)
	if (locale === "fr") return fr_buildercomposerdatabaselater3(inputs)
	if (locale === "uk") return uk_buildercomposerdatabaselater3(inputs)
	return en_buildercomposerdatabaselater3(inputs)
});
export { buildercomposerdatabaselater3 as "builderComposerDatabaseLater" }