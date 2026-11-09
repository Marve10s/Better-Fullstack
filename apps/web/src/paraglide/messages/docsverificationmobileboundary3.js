/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationmobileboundary3Inputs */



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
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Prueba el límite del backend generado. No inicia una interfaz nativa en un dispositivo.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("测试生成的后端边界，不会启动原生设备 UI。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("生成されたバックエンド境界をテストします。ネイティブデバイスの UI は起動しません。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("생성된 백엔드 경계를 테스트합니다. 네이티브 기기 UI는 실행하지 않습니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("測試產生的後端邊界，不會啟動原生裝置 UI。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Testet die generierte Backend-Grenze. Eine native Geräte-UI wird dabei nicht gestartet.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Teste la frontière du backend généré. Ne lance aucune interface native sur un appareil.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Перевіряє межу згенерованого бекенду. Нативний інтерфейс на пристрої не запускається.")
	return /** @type {LocalizedString} */ ("Exercises the generated backend boundary. It does not launch a native device UI.")
});
export { docsverificationmobileboundary3 as "docsVerificationMobileBoundary" }