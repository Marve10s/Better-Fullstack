/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderrunbinaryfile3Inputs */



/**
* | output |
* | --- |
* | "Binary files are included when the project runs, but cannot be edited here." |
*
* @param {Builderrunbinaryfile3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const builderrunbinaryfile3 = /** @type {((inputs?: Builderrunbinaryfile3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Builderrunbinaryfile3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	void inputs;
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return /** @type {LocalizedString} */ ("Los archivos binarios se incluyen al ejecutar el proyecto, pero no se pueden editar aquí.")
	if (locale === "zh") return /** @type {LocalizedString} */ ("二进制文件会包含在运行项目中，但无法在此编辑。")
	if (locale === "ja") return /** @type {LocalizedString} */ ("バイナリファイルは実行時に含まれますが、ここでは編集できません。")
	if (locale === "ko") return /** @type {LocalizedString} */ ("바이너리 파일은 실행에 포함되지만 여기서는 편집할 수 없습니다.")
	if (locale === "zh-Hant") return /** @type {LocalizedString} */ ("二進位檔案會包含在執行的專案中，但無法在此編輯。")
	if (locale === "de") return /** @type {LocalizedString} */ ("Binärdateien werden beim Ausführen einbezogen, können hier aber nicht bearbeitet werden.")
	if (locale === "fr") return /** @type {LocalizedString} */ ("Les fichiers binaires sont inclus à l’exécution, mais ne peuvent pas être modifiés ici.")
	if (locale === "uk") return /** @type {LocalizedString} */ ("Бінарні файли входять до запуску проєкту, але їх не можна редагувати тут.")
	return /** @type {LocalizedString} */ ("Binary files are included when the project runs, but cannot be edited here.")
});
export { builderrunbinaryfile3 as "builderRunBinaryFile" }