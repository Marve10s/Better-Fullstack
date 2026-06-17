/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Presettrackjavaapidescription4Inputs */

const en_presettrackjavaapidescription4 = /** @type {(inputs: Presettrackjavaapidescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Spring Boot with security, JPA, migrations, and test coverage for backend teams.`)
};

const es_presettrackjavaapidescription4 = /** @type {(inputs: Presettrackjavaapidescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Spring Boot con seguridad, JPA, migraciones y cobertura de tests para equipos backend.`)
};

const zh_presettrackjavaapidescription4 = /** @type {(inputs: Presettrackjavaapidescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Spring Boot，包含安全、JPA、迁移和面向后端团队的测试覆盖。`)
};

const ja_presettrackjavaapidescription4 = /** @type {(inputs: Presettrackjavaapidescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Spring Boot (セキュリティ付き)、JPA、移行、およびバックエンド チーム向けのテスト カバレッジ。`)
};

const ko_presettrackjavaapidescription4 = /** @type {(inputs: Presettrackjavaapidescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`백엔드 팀을 위한 보안, JPA, 마이그레이션 및 테스트 적용 범위가 포함된 Spring Boot.`)
};

const zh_hant1_presettrackjavaapidescription4 = /** @type {(inputs: Presettrackjavaapidescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Spring Boot，包含安全性、JPA、遷移和後端團隊導向的測試覆寫。`)
};

const de_presettrackjavaapidescription4 = /** @type {(inputs: Presettrackjavaapidescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Spring Boot mit Sicherheit, JPA, Migrationen und Testabdeckung für Backend-Teams.`)
};

const fr_presettrackjavaapidescription4 = /** @type {(inputs: Presettrackjavaapidescription4Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Spring Boot avec sécurité, JPA, migrations et couverture de tests pour les équipes backend.`)
};

/**
* | output |
* | --- |
* | "Spring Boot with security, JPA, migrations, and test coverage for backend teams." |
*
* @param {Presettrackjavaapidescription4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const presettrackjavaapidescription4 = /** @type {((inputs?: Presettrackjavaapidescription4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Presettrackjavaapidescription4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_presettrackjavaapidescription4(inputs)
	if (locale === "es") return es_presettrackjavaapidescription4(inputs)
	if (locale === "zh") return zh_presettrackjavaapidescription4(inputs)
	if (locale === "ja") return ja_presettrackjavaapidescription4(inputs)
	if (locale === "ko") return ko_presettrackjavaapidescription4(inputs)
	if (locale === "zh-Hant") return zh_hant1_presettrackjavaapidescription4(inputs)
	if (locale === "de") return de_presettrackjavaapidescription4(inputs)
	return fr_presettrackjavaapidescription4(inputs)
});
export { presettrackjavaapidescription4 as "presetTrackJavaApiDescription" }