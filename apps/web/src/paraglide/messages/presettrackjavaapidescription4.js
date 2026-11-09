/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presettrackjavaapidescription4Inputs */



/**
* | output |
* | --- |
* | "Spring Boot with security, JPA, migrations, and test coverage for backend teams." |
*
* @param {Presettrackjavaapidescription4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const presettrackjavaapidescription4 = /** @type {((inputs?: Presettrackjavaapidescription4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presettrackjavaapidescription4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Spring Boot con seguridad, JPA, migraciones y cobertura de tests para equipos backend.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("Spring Boot，包含安全、JPA、迁移和面向后端团队的测试覆盖。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("Spring Boot (セキュリティ付き)、JPA、移行、およびバックエンド チーム向けのテスト カバレッジ。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("백엔드 팀을 위한 보안, JPA, 마이그레이션 및 테스트 적용 범위가 포함된 Spring Boot.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("Spring Boot，包含安全性、JPA、遷移和後端團隊導向的測試覆蓋率。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Spring Boot mit Sicherheit, JPA, Migrationen und Testabdeckung für Backend-Teams.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Spring Boot avec sécurité, JPA, migrations et couverture de tests pour les équipes backend.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Spring Boot з безпекою, JPA, міграціями та тестовим покриттям для серверних команд.")
	return /** @type {LocalizedString} */ ("Spring Boot with security, JPA, migrations, and test coverage for backend teams.")
});
export { presettrackjavaapidescription4 as "presetTrackJavaApiDescription" }