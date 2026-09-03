/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofdefclaimedonly3Inputs */

const en_fixproofdefclaimedonly3 = /** @type {(inputs: Fixproofdefclaimedonly3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Runs where the agent's summary claimed edits that never reached disk.`)
};

const es_fixproofdefclaimedonly3 = /** @type {(inputs: Fixproofdefclaimedonly3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Ejecuciones en las que el resumen del agente declaró cambios que nunca llegaron al disco.`)
};

const zh_fixproofdefclaimedonly3 = /** @type {(inputs: Fixproofdefclaimedonly3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`代理在总结里声称做了改动，但这些改动从未落到磁盘上的运行。`)
};

const ja_fixproofdefclaimedonly3 = /** @type {(inputs: Fixproofdefclaimedonly3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`エージェントの要約が、ディスクに届かなかった変更を主張した実行です。`)
};

const ko_fixproofdefclaimedonly3 = /** @type {(inputs: Fixproofdefclaimedonly3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`에이전트 요약이 디스크에 반영되지 않은 수정을 했다고 주장한 실행입니다.`)
};

const zh_hant1_fixproofdefclaimedonly3 = /** @type {(inputs: Fixproofdefclaimedonly3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`代理程式在總結裡聲稱做了改動，但這些改動從未寫入磁碟的執行。`)
};

const de_fixproofdefclaimedonly3 = /** @type {(inputs: Fixproofdefclaimedonly3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Läufe, in denen die Zusammenfassung des Agenten Änderungen behauptet hat, die nie auf der Festplatte gelandet sind.`)
};

const fr_fixproofdefclaimedonly3 = /** @type {(inputs: Fixproofdefclaimedonly3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Exécutions où le résumé de l'agent annonçait des modifications qui n'ont jamais atteint le disque.`)
};

const uk_fixproofdefclaimedonly3 = /** @type {(inputs: Fixproofdefclaimedonly3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Запуски, де підсумок агента заявляв про зміни, які так і не потрапили на диск.`)
};

/**
* | output |
* | --- |
* | "Runs where the agent's summary claimed edits that never reached disk." |
*
* @param {Fixproofdefclaimedonly3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofdefclaimedonly3 = /** @type {((inputs?: Fixproofdefclaimedonly3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofdefclaimedonly3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofdefclaimedonly3(inputs)
	if (locale === "zh") return zh_fixproofdefclaimedonly3(inputs)
	if (locale === "ja") return ja_fixproofdefclaimedonly3(inputs)
	if (locale === "ko") return ko_fixproofdefclaimedonly3(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofdefclaimedonly3(inputs)
	if (locale === "de") return de_fixproofdefclaimedonly3(inputs)
	if (locale === "fr") return fr_fixproofdefclaimedonly3(inputs)
	if (locale === "uk") return uk_fixproofdefclaimedonly3(inputs)
	return en_fixproofdefclaimedonly3(inputs)
});
export { fixproofdefclaimedonly3 as "fixproofDefClaimedOnly" }