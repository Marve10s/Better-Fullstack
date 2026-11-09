/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaigncurateddescription2Inputs */



/**
* | output |
* | --- |
* | "These TypeScript presets are selected for the browser runtime. Every other ecosystem remains available through the builder and CLI." |
*
* @param {Campaigncurateddescription2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaigncurateddescription2 = /** @type {((inputs?: Campaigncurateddescription2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaigncurateddescription2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Estos presets de TypeScript están seleccionados para el runtime del navegador. Todos los demás ecosistemas siguen disponibles en el builder y la CLI.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("这些 TypeScript 预设专为浏览器运行时挑选。其他生态仍可通过构建器和 CLI 使用。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("これらの TypeScript プリセットはブラウザランタイム向けに選ばれています。その他のエコシステムはビルダーと CLI から利用できます。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("이 TypeScript 프리셋들은 브라우저 런타임에 맞게 선별되었습니다. 다른 생태계는 빌더와 CLI에서 계속 사용할 수 있습니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("這些 TypeScript 預設組合是為瀏覽器執行環境挑選的。其他生態系仍可透過建構器與 CLI 使用。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Diese TypeScript-Presets sind für die Browser-Laufzeit ausgewählt. Alle anderen Ökosysteme bleiben über Builder und CLI verfügbar.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Ces presets TypeScript sont sélectionnés pour le runtime navigateur. Tous les autres écosystèmes restent disponibles via le builder et la CLI.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Ці TypeScript-пресети відібрані для браузерного середовища. Решта екосистем доступні через білдер і CLI.")
	return /** @type {LocalizedString} */ ("These TypeScript presets are selected for the browser runtime. Every other ecosystem remains available through the builder and CLI.")
});
export { campaigncurateddescription2 as "campaignCuratedDescription" }