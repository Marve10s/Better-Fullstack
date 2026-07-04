/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Runflagoutdir3Inputs */

const en_runflagoutdir3 = /** @type {(inputs: Runflagoutdir3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`where results land; re-use the same directory to resume or validate`)
};

const es_runflagoutdir3 = /** @type {(inputs: Runflagoutdir3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`donde se almacenan los resultados; reutilizar el mismo directorio para reanudar o validar.`)
};

const zh_runflagoutdir3 = /** @type {(inputs: Runflagoutdir3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`结果落在哪里；重用同一目录以继续或验证`)
};

const ja_runflagoutdir3 = /** @type {(inputs: Runflagoutdir3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`結果が保存される場所。同じディレクトリを再利用して再開または検証します。`)
};

const ko_runflagoutdir3 = /** @type {(inputs: Runflagoutdir3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`결과가 저장되는 위치; 동일한 디렉터리를 재사용하여 작업을 재개하거나 유효성을 검사합니다.`)
};

const zh_hant1_runflagoutdir3 = /** @type {(inputs: Runflagoutdir3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`結果落在哪裡；重複使用同一目錄以繼續或驗證`)
};

const de_runflagoutdir3 = /** @type {(inputs: Runflagoutdir3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`wo die Ergebnisse landen; verwenden Sie dasselbe Verzeichnis wieder, um fortzufahren oder zu validieren`)
};

const fr_runflagoutdir3 = /** @type {(inputs: Runflagoutdir3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`où les résultats sont enregistrés ; réutiliser le même répertoire pour reprendre ou valider`)
};

/**
* | output |
* | --- |
* | "where results land; re-use the same directory to resume or validate" |
*
* @param {Runflagoutdir3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const runflagoutdir3 = /** @type {((inputs?: Runflagoutdir3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Runflagoutdir3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_runflagoutdir3(inputs)
	if (locale === "es") return es_runflagoutdir3(inputs)
	if (locale === "zh") return zh_runflagoutdir3(inputs)
	if (locale === "ja") return ja_runflagoutdir3(inputs)
	if (locale === "ko") return ko_runflagoutdir3(inputs)
	if (locale === "zh-Hant") return zh_hant1_runflagoutdir3(inputs)
	if (locale === "de") return de_runflagoutdir3(inputs)
	return fr_runflagoutdir3(inputs)
});
export { runflagoutdir3 as "runFlagOutDir" }