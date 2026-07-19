/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Builderrunbinaryfile3Inputs */

const en_builderrunbinaryfile3 = /** @type {(inputs: Builderrunbinaryfile3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Binary files are included when the project runs, but cannot be edited here.`)
};

const es_builderrunbinaryfile3 = /** @type {(inputs: Builderrunbinaryfile3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Los archivos binarios se incluyen al ejecutar el proyecto, pero no se pueden editar aquí.`)
};

const zh_builderrunbinaryfile3 = /** @type {(inputs: Builderrunbinaryfile3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`二进制文件会包含在运行项目中，但无法在此编辑。`)
};

const ja_builderrunbinaryfile3 = /** @type {(inputs: Builderrunbinaryfile3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`バイナリファイルは実行時に含まれますが、ここでは編集できません。`)
};

const ko_builderrunbinaryfile3 = /** @type {(inputs: Builderrunbinaryfile3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`바이너리 파일은 실행에 포함되지만 여기서는 편집할 수 없습니다.`)
};

const zh_hant1_builderrunbinaryfile3 = /** @type {(inputs: Builderrunbinaryfile3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`二進位檔案會包含在執行的專案中，但無法在此編輯。`)
};

const de_builderrunbinaryfile3 = /** @type {(inputs: Builderrunbinaryfile3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Binärdateien werden beim Ausführen einbezogen, können hier aber nicht bearbeitet werden.`)
};

const fr_builderrunbinaryfile3 = /** @type {(inputs: Builderrunbinaryfile3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Les fichiers binaires sont inclus à l’exécution, mais ne peuvent pas être modifiés ici.`)
};

const uk_builderrunbinaryfile3 = /** @type {(inputs: Builderrunbinaryfile3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Бінарні файли входять до запуску проєкту, але їх не можна редагувати тут.`)
};

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
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_builderrunbinaryfile3(inputs)
	if (locale === "es") return es_builderrunbinaryfile3(inputs)
	if (locale === "zh") return zh_builderrunbinaryfile3(inputs)
	if (locale === "ja") return ja_builderrunbinaryfile3(inputs)
	if (locale === "ko") return ko_builderrunbinaryfile3(inputs)
	if (locale === "zh-Hant") return zh_hant1_builderrunbinaryfile3(inputs)
	if (locale === "de") return de_builderrunbinaryfile3(inputs)
	if (locale === "fr") return fr_builderrunbinaryfile3(inputs)
	return uk_builderrunbinaryfile3(inputs)
});
export { builderrunbinaryfile3 as "builderRunBinaryFile" }