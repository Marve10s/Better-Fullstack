/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{ name: NonNullable<unknown> }} Saveddeletedescription2Inputs */

const en_saveddeletedescription2 = /** @type {(inputs: Saveddeletedescription2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Are you sure you want to delete "${i?.name}"? This action cannot be undone.`)
};

const es_saveddeletedescription2 = /** @type {(inputs: Saveddeletedescription2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`¿Seguro que quieres eliminar "${i?.name}"? Esta acción no se puede deshacer.`)
};

const zh_saveddeletedescription2 = /** @type {(inputs: Saveddeletedescription2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`确定要删除 "${i?.name}" 吗？此操作无法撤销。`)
};

const ja_saveddeletedescription2 = /** @type {(inputs: Saveddeletedescription2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`「${i?.name}」を削除してもよろしいですか?この操作は元に戻すことができません。`)
};

const ko_saveddeletedescription2 = /** @type {(inputs: Saveddeletedescription2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Are you sure you want to delete "${i?.name}"? 이 작업은 취소할 수 없습니다.`)
};

const zh_hant1_saveddeletedescription2 = /** @type {(inputs: Saveddeletedescription2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`確定要刪除 "${i?.name}" 嗎？此操作無法撤銷。`)
};

const de_saveddeletedescription2 = /** @type {(inputs: Saveddeletedescription2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Sind Sie sicher, dass Sie „${i?.name}“ löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.`)
};

const fr_saveddeletedescription2 = /** @type {(inputs: Saveddeletedescription2Inputs) => LocalizedString} */ (i) => {
	return /** @type {LocalizedString} */ (`Êtes-vous sûr de vouloir supprimer « ${i?.name} » ? Cette action ne peut pas être annulée.`)
};

/**
* | output |
* | --- |
* | "Are you sure you want to delete \"{name}\"? This action cannot be undone." |
*
* @param {Saveddeletedescription2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const saveddeletedescription2 = /** @type {((inputs: Saveddeletedescription2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Saveddeletedescription2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_saveddeletedescription2(inputs)
	if (locale === "es") return es_saveddeletedescription2(inputs)
	if (locale === "zh") return zh_saveddeletedescription2(inputs)
	if (locale === "ja") return ja_saveddeletedescription2(inputs)
	if (locale === "ko") return ko_saveddeletedescription2(inputs)
	if (locale === "zh-Hant") return zh_hant1_saveddeletedescription2(inputs)
	if (locale === "de") return de_saveddeletedescription2(inputs)
	return fr_saveddeletedescription2(inputs)
});
export { saveddeletedescription2 as "savedDeleteDescription" }