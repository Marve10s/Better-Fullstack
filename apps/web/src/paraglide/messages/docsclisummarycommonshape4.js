/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Docsclisummarycommonshape4Inputs */



/**
* | output |
* | --- |
* | "Start from a project shape. Asks which language or platform, then only the prompts that shape needs." |
*
* @param {Docsclisummarycommonshape4Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const docsclisummarycommonshape4 = /** @type {((inputs?: Docsclisummarycommonshape4Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Docsclisummarycommonshape4Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Partir de un tipo de proyecto. Pregunta qué lenguaje o plataforma usar y después solo las opciones que necesita ese tipo de proyecto.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("从项目形态开始。先询问语言或平台，然后只运行该形态需要的提示。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("プロジェクトシェイプから始めます。言語またはプラットフォームを尋ねたあと、そのシェイプに必要なプロンプトだけを表示します。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("프로젝트 형태로 시작합니다. 언어나 플랫폼을 물은 뒤, 그 형태에 필요한 프롬프트만 표시합니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("從專案類型開始。先詢問語言或平台，再只顯示該類型所需的提示。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Mit einem Projekttyp beginnen. Fragt nach Sprache oder Plattform und stellt dann nur die für diesen Projekttyp nötigen Fragen.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Partir d’un type de projet. Demande le langage ou la plateforme, puis uniquement les choix nécessaires à ce type de projet.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Почати з типу проєкту. Запитує мову або платформу, а потім лише параметри, потрібні для цього типу проєкту.")
	return /** @type {LocalizedString} */ ("Start from a project shape. Asks which language or platform, then only the prompts that shape needs.")
});
export { docsclisummarycommonshape4 as "docsCliSummaryCommonShape" }