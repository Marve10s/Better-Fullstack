/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaigndescription1Inputs */

const en_campaigndescription1 = /** @type {(inputs: Campaigndescription1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Pick a real TypeScript stack, inspect its generated files, edit the code, start the dev server and download the project. Nothing leaves your browser.`)
};

const es_campaigndescription1 = /** @type {(inputs: Campaigndescription1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Elige un stack TypeScript real, inspecciona sus archivos generados, edita el código, arranca el servidor de desarrollo y descarga el proyecto. Nada sale de tu navegador.`)
};

const zh_campaigndescription1 = /** @type {(inputs: Campaigndescription1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`选择一个真实的 TypeScript 技术栈，查看生成的文件，编辑代码，启动开发服务器并下载项目。一切都不会离开你的浏览器。`)
};

const ja_campaigndescription1 = /** @type {(inputs: Campaigndescription1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`本物の TypeScript スタックを選び、生成されたファイルを確認し、コードを編集して開発サーバーを起動し、プロジェクトをダウンロード。すべてブラウザの中で完結します。`)
};

const ko_campaigndescription1 = /** @type {(inputs: Campaigndescription1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`실제 TypeScript 스택을 고르고, 생성된 파일을 살펴보고, 코드를 수정하고, 개발 서버를 켠 뒤 프로젝트를 다운로드하세요. 아무것도 브라우저 밖으로 나가지 않습니다.`)
};

const zh_hant1_campaigndescription1 = /** @type {(inputs: Campaigndescription1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`選擇一個真實的 TypeScript 技術棧，檢視產生的檔案，編輯程式碼，啟動開發伺服器並下載專案。一切都不會離開你的瀏覽器。`)
};

const de_campaigndescription1 = /** @type {(inputs: Campaigndescription1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Wähle einen echten TypeScript-Stack, untersuche die generierten Dateien, bearbeite den Code, starte den Dev-Server und lade das Projekt herunter. Nichts verlässt deinen Browser.`)
};

const fr_campaigndescription1 = /** @type {(inputs: Campaigndescription1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Choisissez un vrai stack TypeScript, inspectez les fichiers générés, modifiez le code, lancez le serveur de développement et téléchargez le projet. Rien ne quitte votre navigateur.`)
};

const uk_campaigndescription1 = /** @type {(inputs: Campaigndescription1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Оберіть справжній TypeScript-стек, перегляньте згенеровані файли, відредагуйте код, запустіть дев-сервер і завантажте проєкт. Ніщо не залишає ваш браузер.`)
};

/**
* | output |
* | --- |
* | "Pick a real TypeScript stack, inspect its generated files, edit the code, start the dev server and download the project. Nothing leaves your browser." |
*
* @param {Campaigndescription1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaigndescription1 = /** @type {((inputs?: Campaigndescription1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaigndescription1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_campaigndescription1(inputs)
	if (locale === "zh") return zh_campaigndescription1(inputs)
	if (locale === "ja") return ja_campaigndescription1(inputs)
	if (locale === "ko") return ko_campaigndescription1(inputs)
	if (locale === "zh-Hant") return zh_hant1_campaigndescription1(inputs)
	if (locale === "de") return de_campaigndescription1(inputs)
	if (locale === "fr") return fr_campaigndescription1(inputs)
	if (locale === "uk") return uk_campaigndescription1(inputs)
	return en_campaigndescription1(inputs)
});
export { campaigndescription1 as "campaignDescription" }