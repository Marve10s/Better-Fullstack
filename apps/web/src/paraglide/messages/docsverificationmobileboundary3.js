/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationmobileboundary3Inputs */

const en_docsverificationmobileboundary3 = /** @type {(inputs: Docsverificationmobileboundary3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Exercises the generated backend boundary. It does not launch a native device UI.`)
};

const es_docsverificationmobileboundary3 = /** @type {(inputs: Docsverificationmobileboundary3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Prueba el límite del backend generado. No inicia una interfaz nativa en un dispositivo.`)
};

const zh_docsverificationmobileboundary3 = /** @type {(inputs: Docsverificationmobileboundary3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`测试生成的后端边界，不会启动原生设备 UI。`)
};

const ja_docsverificationmobileboundary3 = /** @type {(inputs: Docsverificationmobileboundary3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`生成されたバックエンド境界をテストします。ネイティブデバイスの UI は起動しません。`)
};

const ko_docsverificationmobileboundary3 = /** @type {(inputs: Docsverificationmobileboundary3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`생성된 백엔드 경계를 테스트합니다. 네이티브 기기 UI는 실행하지 않습니다.`)
};

const zh_hant1_docsverificationmobileboundary3 = /** @type {(inputs: Docsverificationmobileboundary3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`測試產生的後端邊界，不會啟動原生裝置 UI。`)
};

const de_docsverificationmobileboundary3 = /** @type {(inputs: Docsverificationmobileboundary3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Testet die generierte Backend-Grenze. Eine native Geräte-UI wird dabei nicht gestartet.`)
};

const fr_docsverificationmobileboundary3 = /** @type {(inputs: Docsverificationmobileboundary3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Teste la frontière du backend généré. Ne lance aucune interface native sur un appareil.`)
};

const uk_docsverificationmobileboundary3 = /** @type {(inputs: Docsverificationmobileboundary3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Перевіряє межу згенерованого бекенду. Нативний інтерфейс на пристрої не запускається.`)
};

/**
* | output |
* | --- |
* | "Exercises the generated backend boundary. It does not launch a native device UI." |
*
* @param {Docsverificationmobileboundary3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationmobileboundary3 = /** @type {((inputs?: Docsverificationmobileboundary3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationmobileboundary3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_docsverificationmobileboundary3(inputs)
	if (locale === "zh") return zh_docsverificationmobileboundary3(inputs)
	if (locale === "ja") return ja_docsverificationmobileboundary3(inputs)
	if (locale === "ko") return ko_docsverificationmobileboundary3(inputs)
	if (locale === "zh-Hant") return zh_hant1_docsverificationmobileboundary3(inputs)
	if (locale === "de") return de_docsverificationmobileboundary3(inputs)
	if (locale === "fr") return fr_docsverificationmobileboundary3(inputs)
	if (locale === "uk") return uk_docsverificationmobileboundary3(inputs)
	return en_docsverificationmobileboundary3(inputs)
});
export { docsverificationmobileboundary3 as "docsVerificationMobileBoundary" }