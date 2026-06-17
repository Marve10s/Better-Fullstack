/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Savedemptydescription2Inputs */

const en_savedemptydescription2 = /** @type {(inputs: Savedemptydescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Save the current builder configuration to create a reusable preset for yourself. These entries stay in local storage on this browser.`)
};

const es_savedemptydescription2 = /** @type {(inputs: Savedemptydescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Guarda la configuración actual para crear una plantilla reutilizable. Estas entradas se quedan en el almacenamiento local de este navegador.`)
};

const zh_savedemptydescription2 = /** @type {(inputs: Savedemptydescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`保存当前构建器配置，创建可复用的个人预设。这些条目会保存在此浏览器的本地存储中。`)
};

const ja_savedemptydescription2 = /** @type {(inputs: Savedemptydescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`現在のビルダー構成を保存して、自分用に再利用可能なプリセットを作成します。これらのエントリは、このブラウザのローカル ストレージに残ります。`)
};

const ko_savedemptydescription2 = /** @type {(inputs: Savedemptydescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`현재 빌더 구성을 저장하여 재사용 가능한 사전 설정을 직접 만드세요. 이러한 항목은 이 브라우저의 로컬 저장소에 유지됩니다.`)
};

const zh_hant1_savedemptydescription2 = /** @type {(inputs: Savedemptydescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`儲存目前建構器配置，建立可重複使用的個人預設。這些條目會保存在此瀏覽器的本機儲存體中。`)
};

const de_savedemptydescription2 = /** @type {(inputs: Savedemptydescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Speichern Sie die aktuelle Builder-Konfiguration, um eine wiederverwendbare Voreinstellung für sich selbst zu erstellen. Diese Einträge bleiben im lokalen Speicher dieses Browsers.`)
};

const fr_savedemptydescription2 = /** @type {(inputs: Savedemptydescription2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Enregistrez la configuration actuelle du générateur pour créer vous-même un préréglage réutilisable. Ces entrées restent dans le stockage local sur ce navigateur.`)
};

/**
* | output |
* | --- |
* | "Save the current builder configuration to create a reusable preset for yourself. These entries stay in local storage on this browser." |
*
* @param {Savedemptydescription2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }} options
* @returns {LocalizedString}
*/
const savedemptydescription2 = /** @type {((inputs?: Savedemptydescription2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Savedemptydescription2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return en_savedemptydescription2(inputs)
	if (locale === "es") return es_savedemptydescription2(inputs)
	if (locale === "zh") return zh_savedemptydescription2(inputs)
	if (locale === "ja") return ja_savedemptydescription2(inputs)
	if (locale === "ko") return ko_savedemptydescription2(inputs)
	if (locale === "zh-Hant") return zh_hant1_savedemptydescription2(inputs)
	if (locale === "de") return de_savedemptydescription2(inputs)
	return fr_savedemptydescription2(inputs)
});
export { savedemptydescription2 as "savedEmptyDescription" }