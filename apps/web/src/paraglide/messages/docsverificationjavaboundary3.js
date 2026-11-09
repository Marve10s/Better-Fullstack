/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationjavaboundary3Inputs */



/**
* | output |
* | --- |
* | "Exercises Spring Boot and Actuator with the generated local H2 configuration." |
*
* @param {Docsverificationjavaboundary3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationjavaboundary3 = /** @type {((inputs?: Docsverificationjavaboundary3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationjavaboundary3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Prueba Spring Boot y Actuator con la configuración local de H2 generada.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("使用生成的本地 H2 配置测试 Spring Boot 和 Actuator。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("生成されたローカル H2 構成で Spring Boot と Actuator をテストします。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("생성된 로컬 H2 구성으로 Spring Boot와 Actuator를 테스트합니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("使用產生的本機 H2 設定測試 Spring Boot 與 Actuator。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Testet Spring Boot und Actuator mit der generierten lokalen H2-Konfiguration.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Teste Spring Boot et Actuator avec la configuration H2 locale générée.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Перевіряє Spring Boot і Actuator зі згенерованою локальною конфігурацією H2.")
	return /** @type {LocalizedString} */ ("Exercises Spring Boot and Actuator with the generated local H2 configuration.")
});
export { docsverificationjavaboundary3 as "docsVerificationJavaBoundary" }