/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Saveddescription1Inputs */

const en_saveddescription1 = /** @type {(inputs: Saveddescription1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Use the save icon in the builder bar to create local presets, then load or update them here.`)
};

const es_saveddescription1 = /** @type {(inputs: Saveddescription1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Usa el icono de guardar en la barra del constructor para crear plantillas locales y cargarlas o actualizarlas aquí.`)
};

const zh_saveddescription1 = /** @type {(inputs: Saveddescription1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`使用构建器栏中的保存图标创建本地预设，然后在这里加载或更新。`)
};

const ja_saveddescription1 = /** @type {(inputs: Saveddescription1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`ビルダー バーの保存アイコンを使用してローカル プリセットを作成し、ここでロードまたは更新します。`)
};

const ko_saveddescription1 = /** @type {(inputs: Saveddescription1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`빌더 바의 저장 아이콘을 사용하여 로컬 사전 설정을 만든 다음 여기에서 로드하거나 업데이트하세요.`)
};

const zh_hant1_saveddescription1 = /** @type {(inputs: Saveddescription1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`使用建構器欄中的儲存圖示建立本機預設，然後在這裡載入或更新。`)
};

const de_saveddescription1 = /** @type {(inputs: Saveddescription1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Verwenden Sie das Speichersymbol in der Builder-Leiste, um lokale Voreinstellungen zu erstellen, und laden oder aktualisieren Sie sie dann hier.`)
};

const fr_saveddescription1 = /** @type {(inputs: Saveddescription1Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Utilisez l'icône de sauvegarde dans la barre de création pour créer des préréglages locaux, puis chargez-les ou mettez-les à jour ici.`)
};

/**
* | output |
* | --- |
* | "Use the save icon in the builder bar to create local presets, then load or update them here." |
*
* @param {Saveddescription1Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const saveddescription1 = /** @type {((inputs?: Saveddescription1Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Saveddescription1Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_saveddescription1(inputs)
	if (locale === "es") return es_saveddescription1(inputs)
	if (locale === "zh") return zh_saveddescription1(inputs)
	if (locale === "ja") return ja_saveddescription1(inputs)
	if (locale === "ko") return ko_saveddescription1(inputs)
	if (locale === "zh-Hant") return zh_hant1_saveddescription1(inputs)
	if (locale === "de") return de_saveddescription1(inputs)
	return fr_saveddescription1(inputs)
});
export { saveddescription1 as "savedDescription" }