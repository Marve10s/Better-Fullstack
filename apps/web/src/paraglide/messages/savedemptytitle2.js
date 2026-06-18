/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Savedemptytitle2Inputs */

const en_savedemptytitle2 = /** @type {(inputs: Savedemptytitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`No saved presets yet`)
};

const es_savedemptytitle2 = /** @type {(inputs: Savedemptytitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Aún no hay plantillas guardadas`)
};

const zh_savedemptytitle2 = /** @type {(inputs: Savedemptytitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`还没有保存的预设`)
};

const ja_savedemptytitle2 = /** @type {(inputs: Savedemptytitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`まだプリセットが保存されていません`)
};

const ko_savedemptytitle2 = /** @type {(inputs: Savedemptytitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`아직 저장된 사전 설정이 없습니다.`)
};

const zh_hant1_savedemptytitle2 = /** @type {(inputs: Savedemptytitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`還沒儲存的預設`)
};

const de_savedemptytitle2 = /** @type {(inputs: Savedemptytitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Noch keine gespeicherten Voreinstellungen`)
};

const fr_savedemptytitle2 = /** @type {(inputs: Savedemptytitle2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Aucun préréglage enregistré pour le moment`)
};

/**
* | output |
* | --- |
* | "No saved presets yet" |
*
* @param {Savedemptytitle2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const savedemptytitle2 = /** @type {((inputs?: Savedemptytitle2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Savedemptytitle2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_savedemptytitle2(inputs)
	if (locale === "es") return es_savedemptytitle2(inputs)
	if (locale === "zh") return zh_savedemptytitle2(inputs)
	if (locale === "ja") return ja_savedemptytitle2(inputs)
	if (locale === "ko") return ko_savedemptytitle2(inputs)
	if (locale === "zh-Hant") return zh_hant1_savedemptytitle2(inputs)
	if (locale === "de") return de_savedemptytitle2(inputs)
	return fr_savedemptytitle2(inputs)
});
export { savedemptytitle2 as "savedEmptyTitle" }