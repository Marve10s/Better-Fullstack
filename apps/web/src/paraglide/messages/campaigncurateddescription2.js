/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaigncurateddescription2Inputs */

const en_campaigncurateddescription2 = /** @type {(inputs: Campaigncurateddescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`These TypeScript presets are selected for the browser runtime. Every other ecosystem remains available through the builder and CLI.`)
};

const es_campaigncurateddescription2 = /** @type {(inputs: Campaigncurateddescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Estos presets de TypeScript están seleccionados para el runtime del navegador. Todos los demás ecosistemas siguen disponibles en el builder y la CLI.`)
};

const zh_campaigncurateddescription2 = /** @type {(inputs: Campaigncurateddescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`这些 TypeScript 预设专为浏览器运行时挑选。其他生态仍可通过构建器和 CLI 使用。`)
};

const ja_campaigncurateddescription2 = /** @type {(inputs: Campaigncurateddescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`これらの TypeScript プリセットはブラウザランタイム向けに選ばれています。その他のエコシステムはビルダーと CLI から利用できます。`)
};

const ko_campaigncurateddescription2 = /** @type {(inputs: Campaigncurateddescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`이 TypeScript 프리셋들은 브라우저 런타임에 맞게 선별되었습니다. 다른 생태계는 빌더와 CLI에서 계속 사용할 수 있습니다.`)
};

const zh_hant1_campaigncurateddescription2 = /** @type {(inputs: Campaigncurateddescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`這些 TypeScript 預設組合是為瀏覽器執行環境挑選的。其他生態系仍可透過建構器與 CLI 使用。`)
};

const de_campaigncurateddescription2 = /** @type {(inputs: Campaigncurateddescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Diese TypeScript-Presets sind für die Browser-Laufzeit ausgewählt. Alle anderen Ökosysteme bleiben über Builder und CLI verfügbar.`)
};

const fr_campaigncurateddescription2 = /** @type {(inputs: Campaigncurateddescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ces presets TypeScript sont sélectionnés pour le runtime navigateur. Tous les autres écosystèmes restent disponibles via le builder et la CLI.`)
};

const uk_campaigncurateddescription2 = /** @type {(inputs: Campaigncurateddescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ці TypeScript-пресети відібрані для браузерного середовища. Решта екосистем доступні через білдер і CLI.`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_campaigncurateddescription2(inputs)
	if (locale === "es") return es_campaigncurateddescription2(inputs)
	if (locale === "zh") return zh_campaigncurateddescription2(inputs)
	if (locale === "ja") return ja_campaigncurateddescription2(inputs)
	if (locale === "ko") return ko_campaigncurateddescription2(inputs)
	if (locale === "zh-Hant") return zh_hant1_campaigncurateddescription2(inputs)
	if (locale === "de") return de_campaigncurateddescription2(inputs)
	if (locale === "fr") return fr_campaigncurateddescription2(inputs)
	return uk_campaigncurateddescription2(inputs)
});
export { campaigncurateddescription2 as "campaignCuratedDescription" }