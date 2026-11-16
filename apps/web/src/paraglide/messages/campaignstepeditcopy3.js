/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Campaignstepeditcopy3Inputs */



/**
* | output |
* | --- |
* | "Open project files, edit the application and rerun it without leaving the builder." |
*
* @param {Campaignstepeditcopy3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const campaignstepeditcopy3 = /** @type {((inputs?: Campaignstepeditcopy3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Campaignstepeditcopy3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Abre los archivos del proyecto, edita la aplicación y vuelve a ejecutarla sin salir del builder.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("打开项目文件，编辑应用，无需离开构建器即可重新运行。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("プロジェクトのファイルを開き、アプリを編集して、ビルダーから離れずに再実行できます。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("프로젝트 파일을 열어 애플리케이션을 수정하고, 빌더를 떠나지 않고 다시 실행하세요.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("開啟專案檔案，編輯應用程式，無需離開建構器即可重新執行。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Öffne die Projektdateien, bearbeite die Anwendung und führe sie erneut aus, ohne den Builder zu verlassen.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Ouvrez les fichiers du projet, modifiez l'application et relancez-la sans quitter le builder.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Відкрийте файли проєкту, відредагуйте застосунок і перезапустіть його, не виходячи з білдера.")
	return /** @type {LocalizedString} */ ("Open project files, edit the application and rerun it without leaving the builder.")
});
export { campaignstepeditcopy3 as "campaignStepEditCopy" }