/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaignseodescription2Inputs */

const en_campaignseodescription2 = /** @type {(inputs: Campaignseodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Inspect, edit and run a real generated TypeScript project in your browser, then download the ZIP. No signup and no code upload.`)
};

const es_campaignseodescription2 = /** @type {(inputs: Campaignseodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Inspecciona, edita y ejecuta un proyecto TypeScript real generado en tu navegador, y descarga el ZIP. Sin registro y sin subir código.`)
};

const zh_campaignseodescription2 = /** @type {(inputs: Campaignseodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`在浏览器中查看、编辑并运行真实生成的 TypeScript 项目，然后下载 ZIP。无需注册，代码也不会被上传。`)
};

const ja_campaignseodescription2 = /** @type {(inputs: Campaignseodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`生成された本物の TypeScript プロジェクトをブラウザで確認・編集・実行し、ZIP をダウンロード。登録不要、コードのアップロードもありません。`)
};

const ko_campaignseodescription2 = /** @type {(inputs: Campaignseodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`실제로 생성된 TypeScript 프로젝트를 브라우저에서 확인·편집·실행하고 ZIP으로 다운로드하세요. 가입도, 코드 업로드도 없습니다.`)
};

const zh_hant1_campaignseodescription2 = /** @type {(inputs: Campaignseodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`在瀏覽器中檢視、編輯並執行真實產生的 TypeScript 專案，然後下載 ZIP。無需註冊，程式碼也不會被上傳。`)
};

const de_campaignseodescription2 = /** @type {(inputs: Campaignseodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Untersuche, bearbeite und starte ein echtes generiertes TypeScript-Projekt im Browser und lade das ZIP herunter. Ohne Anmeldung, ohne Code-Upload.`)
};

const fr_campaignseodescription2 = /** @type {(inputs: Campaignseodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Inspectez, modifiez et exécutez un vrai projet TypeScript généré dans votre navigateur, puis téléchargez le ZIP. Sans inscription et sans envoi de code.`)
};

const uk_campaignseodescription2 = /** @type {(inputs: Campaignseodescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Переглядайте, редагуйте та запускайте справжній згенерований TypeScript-проєкт у браузері, а потім завантажте ZIP. Без реєстрації та без завантаження коду.`)
};

/**
* | output |
* | --- |
* | "Inspect, edit and run a real generated TypeScript project in your browser, then download the ZIP. No signup and no code upload." |
*
* @param {Campaignseodescription2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaignseodescription2 = /** @type {((inputs?: Campaignseodescription2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaignseodescription2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_campaignseodescription2(inputs)
	if (locale === "zh") return zh_campaignseodescription2(inputs)
	if (locale === "ja") return ja_campaignseodescription2(inputs)
	if (locale === "ko") return ko_campaignseodescription2(inputs)
	if (locale === "zh-Hant") return zh_hant1_campaignseodescription2(inputs)
	if (locale === "de") return de_campaignseodescription2(inputs)
	if (locale === "fr") return fr_campaignseodescription2(inputs)
	if (locale === "uk") return uk_campaignseodescription2(inputs)
	return en_campaignseodescription2(inputs)
});
export { campaignseodescription2 as "campaignSeoDescription" }