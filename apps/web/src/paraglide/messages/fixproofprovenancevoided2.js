/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofprovenancevoided2Inputs */

const en_fixproofprovenancevoided2 = /** @type {(inputs: Fixproofprovenancevoided2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`A provider quota error ended it before the agent could work. It is excluded rather than counted against the model.`)
};

const es_fixproofprovenancevoided2 = /** @type {(inputs: Fixproofprovenancevoided2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Un error de cuota del proveedor la terminó antes de que el agente pudiera trabajar. Se excluye en lugar de contarla en contra del modelo.`)
};

const zh_fixproofprovenancevoided2 = /** @type {(inputs: Fixproofprovenancevoided2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`供应商配额报错让它在代理开始工作前就结束了。它被排除，而不是算作模型的失败。`)
};

const ja_fixproofprovenancevoided2 = /** @type {(inputs: Fixproofprovenancevoided2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`プロバイダーのクォータエラーで、エージェントが作業する前に終了しました。モデルの失敗として数えず、除外しています。`)
};

const ko_fixproofprovenancevoided2 = /** @type {(inputs: Fixproofprovenancevoided2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`제공업체 할당량 오류로 에이전트가 작업하기 전에 끝났습니다. 모델의 실패로 세지 않고 제외했습니다.`)
};

const zh_hant1_fixproofprovenancevoided2 = /** @type {(inputs: Fixproofprovenancevoided2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`供應商配額報錯讓它在代理程式開始工作前就結束了。它被排除，而不是算作模型的失敗。`)
};

const de_fixproofprovenancevoided2 = /** @type {(inputs: Fixproofprovenancevoided2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ein Kontingentfehler des Anbieters hat ihn beendet, bevor der Agent arbeiten konnte. Er wird ausgeschlossen statt dem Modell angelastet.`)
};

const fr_fixproofprovenancevoided2 = /** @type {(inputs: Fixproofprovenancevoided2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Une erreur de quota du fournisseur l'a interrompue avant que l'agent puisse travailler. Elle est exclue plutôt que comptée contre le modèle.`)
};

const uk_fixproofprovenancevoided2 = /** @type {(inputs: Fixproofprovenancevoided2Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Помилка квоти провайдера завершила його, перш ніж агент устиг попрацювати. Його виключено, а не зараховано моделі як провал.`)
};

/**
* | output |
* | --- |
* | "A provider quota error ended it before the agent could work. It is excluded rather than counted against the model." |
*
* @param {Fixproofprovenancevoided2Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofprovenancevoided2 = /** @type {((inputs?: Fixproofprovenancevoided2Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofprovenancevoided2Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofprovenancevoided2(inputs)
	if (locale === "zh") return zh_fixproofprovenancevoided2(inputs)
	if (locale === "ja") return ja_fixproofprovenancevoided2(inputs)
	if (locale === "ko") return ko_fixproofprovenancevoided2(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofprovenancevoided2(inputs)
	if (locale === "de") return de_fixproofprovenancevoided2(inputs)
	if (locale === "fr") return fr_fixproofprovenancevoided2(inputs)
	if (locale === "uk") return uk_fixproofprovenancevoided2(inputs)
	return en_fixproofprovenancevoided2(inputs)
});
export { fixproofprovenancevoided2 as "fixproofProvenanceVoided" }