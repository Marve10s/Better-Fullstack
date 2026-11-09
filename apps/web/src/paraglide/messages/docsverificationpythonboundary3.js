/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsverificationpythonboundary3Inputs */



/**
* | output |
* | --- |
* | "Exercises FastAPI through HTTP. It does not prove external service selections." |
*
* @param {Docsverificationpythonboundary3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsverificationpythonboundary3 = /** @type {((inputs?: Docsverificationpythonboundary3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsverificationpythonboundary3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Prueba FastAPI a través de HTTP. No demuestra los servicios externos seleccionados.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("通过 HTTP 测试 FastAPI，无法证明所选的外部服务。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("HTTP 経由で FastAPI をテストします。選択した外部サービスについては証明しません。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("HTTP를 통해 FastAPI를 테스트합니다. 선택한 외부 서비스는 증명하지 않습니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("透過 HTTP 測試 FastAPI，無法證明所選的外部服務。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Testet FastAPI über HTTP. Für ausgewählte externe Dienste liefert dies keinen Nachweis.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Teste FastAPI via HTTP. Ne prouve pas le fonctionnement des services externes sélectionnés.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Перевіряє FastAPI через HTTP. Не доводить роботу вибраних зовнішніх сервісів.")
	return /** @type {LocalizedString} */ ("Exercises FastAPI through HTTP. It does not prove external service selections.")
});
export { docsverificationpythonboundary3 as "docsVerificationPythonBoundary" }