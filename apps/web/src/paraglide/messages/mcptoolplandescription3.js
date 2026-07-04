/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Mcptoolplandescription3Inputs */

const en_mcptoolplandescription3 = /** @type {(inputs: Mcptoolplandescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dry-run preview: generates the file tree in memory`)
};

const es_mcptoolplandescription3 = /** @type {(inputs: Mcptoolplandescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Vista previa dry-run: genera el árbol de archivos en memoria`)
};

const zh_mcptoolplandescription3 = /** @type {(inputs: Mcptoolplandescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dry-run 预览：在内存中生成文件树`)
};

const ja_mcptoolplandescription3 = /** @type {(inputs: Mcptoolplandescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ドライラン プレビュー: メモリ内にファイル ツリーを生成します。`)
};

const ko_mcptoolplandescription3 = /** @type {(inputs: Mcptoolplandescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`테스트 실행 미리보기: 메모리에 파일 트리를 생성합니다.`)
};

const zh_hant1_mcptoolplandescription3 = /** @type {(inputs: Mcptoolplandescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Dry-run 預覽：在記憶體中產生檔案樹`)
};

const de_mcptoolplandescription3 = /** @type {(inputs: Mcptoolplandescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Probelaufvorschau: Erstellt den Dateibaum im Speicher`)
};

const fr_mcptoolplandescription3 = /** @type {(inputs: Mcptoolplandescription3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Aperçu à sec : génère l'arborescence des fichiers en mémoire`)
};

/**
* | output |
* | --- |
* | "Dry-run preview: generates the file tree in memory" |
*
* @param {Mcptoolplandescription3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const mcptoolplandescription3 = /** @type {((inputs?: Mcptoolplandescription3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Mcptoolplandescription3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_mcptoolplandescription3(inputs)
	if (locale === "es") return es_mcptoolplandescription3(inputs)
	if (locale === "zh") return zh_mcptoolplandescription3(inputs)
	if (locale === "ja") return ja_mcptoolplandescription3(inputs)
	if (locale === "ko") return ko_mcptoolplandescription3(inputs)
	if (locale === "zh-Hant") return zh_hant1_mcptoolplandescription3(inputs)
	if (locale === "de") return de_mcptoolplandescription3(inputs)
	return fr_mcptoolplandescription3(inputs)
});
export { mcptoolplandescription3 as "mcpToolPlanDescription" }