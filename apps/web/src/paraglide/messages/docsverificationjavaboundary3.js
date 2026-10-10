/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationjavaboundary3Inputs */

const en_docsverificationjavaboundary3 = /** @type {(inputs: Docsverificationjavaboundary3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Exercises Spring Boot and Actuator with the generated local H2 configuration.`)
};

const es_docsverificationjavaboundary3 = /** @type {(inputs: Docsverificationjavaboundary3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Prueba Spring Boot y Actuator con la configuración local de H2 generada.`)
};

const zh_docsverificationjavaboundary3 = /** @type {(inputs: Docsverificationjavaboundary3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`使用生成的本地 H2 配置测试 Spring Boot 和 Actuator。`)
};

const ja_docsverificationjavaboundary3 = /** @type {(inputs: Docsverificationjavaboundary3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`生成されたローカル H2 構成で Spring Boot と Actuator をテストします。`)
};

const ko_docsverificationjavaboundary3 = /** @type {(inputs: Docsverificationjavaboundary3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`생성된 로컬 H2 구성으로 Spring Boot와 Actuator를 테스트합니다.`)
};

const zh_hant1_docsverificationjavaboundary3 = /** @type {(inputs: Docsverificationjavaboundary3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`使用產生的本機 H2 設定測試 Spring Boot 與 Actuator。`)
};

const de_docsverificationjavaboundary3 = /** @type {(inputs: Docsverificationjavaboundary3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Testet Spring Boot und Actuator mit der generierten lokalen H2-Konfiguration.`)
};

const fr_docsverificationjavaboundary3 = /** @type {(inputs: Docsverificationjavaboundary3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Teste Spring Boot et Actuator avec la configuration H2 locale générée.`)
};

const uk_docsverificationjavaboundary3 = /** @type {(inputs: Docsverificationjavaboundary3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Перевіряє Spring Boot і Actuator зі згенерованою локальною конфігурацією H2.`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsverificationjavaboundary3(inputs)
	if (locale === "zh") return zh_docsverificationjavaboundary3(inputs)
	if (locale === "ja") return ja_docsverificationjavaboundary3(inputs)
	if (locale === "ko") return ko_docsverificationjavaboundary3(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsverificationjavaboundary3(inputs)
	if (locale === "de") return de_docsverificationjavaboundary3(inputs)
	if (locale === "fr") return fr_docsverificationjavaboundary3(inputs)
	if (locale === "uk") return uk_docsverificationjavaboundary3(inputs)
	return en_docsverificationjavaboundary3(inputs)
});
export { docsverificationjavaboundary3 as "docsVerificationJavaBoundary" }