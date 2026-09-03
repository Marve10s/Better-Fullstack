/* eslint-disable */
import { getLocale, experimentalStaticLocale } from '../runtime.js';

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */

/** @typedef {{}} Fixproofmethodexcludedbody3Inputs */

const en_fixproofmethodexcludedbody3 = /** @type {(inputs: Fixproofmethodexcludedbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Provider quota failures and harness faults are excluded from both indexes. Timeouts are not: they count as failures. The board also reports regressions, agent test edits that had to be reverted, and runs where the agent's summary claimed edits that never reached disk.`)
};

const es_fixproofmethodexcludedbody3 = /** @type {(inputs: Fixproofmethodexcludedbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Los fallos de cuota del proveedor y los fallos del harness quedan excluidos de ambos índices. Los tiempos agotados no: cuentan como fallo. La tabla también informa de las regresiones, de los cambios en pruebas del agente que hubo que revertir y de las ejecuciones en las que el resumen del agente declaró cambios que nunca llegaron al disco.`)
};

const zh_fixproofmethodexcludedbody3 = /** @type {(inputs: Fixproofmethodexcludedbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`供应商配额失败和 harness 故障会从两个指数中排除。超时不排除：它们计为失败。榜单还会报告回归、必须还原的代理测试改动，以及代理在总结里声称做了、实际却没有落到磁盘上的运行。`)
};

const ja_fixproofmethodexcludedbody3 = /** @type {(inputs: Fixproofmethodexcludedbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`プロバイダーのクォータ失敗とハーネスの障害は、どちらの指数からも除外します。タイムアウトは除外せず、失敗として数えます。ボードにはリグレッション、差し戻しが必要だったエージェントのテスト変更、そして要約がディスクに届かなかった変更を主張した実行も掲載します。`)
};

const ko_fixproofmethodexcludedbody3 = /** @type {(inputs: Fixproofmethodexcludedbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`제공업체 할당량 실패와 하네스 오류는 두 지수에서 모두 제외합니다. 시간 초과는 제외하지 않고 실패로 셉니다. 보드는 회귀, 되돌려야 했던 에이전트의 테스트 수정, 그리고 요약이 디스크에 반영되지 않은 수정을 주장한 실행도 함께 보고합니다.`)
};

const zh_hant1_fixproofmethodexcludedbody3 = /** @type {(inputs: Fixproofmethodexcludedbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`供應商配額失敗和 harness 故障會從兩個指數中排除。逾時不排除：它們計為失敗。榜單還會報告迴歸、必須還原的代理程式測試改動，以及代理程式在總結裡聲稱做了、實際卻沒有寫入磁碟的執行。`)
};

const de_fixproofmethodexcludedbody3 = /** @type {(inputs: Fixproofmethodexcludedbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Kontingentfehler des Anbieters und Fehler des Harness sind von beiden Indizes ausgeschlossen. Zeitüberschreitungen nicht: Sie zählen als Fehlschlag. Die Rangliste weist außerdem Regressionen aus, Test-Änderungen des Agenten, die zurückgesetzt werden mussten, und Läufe, in denen die Zusammenfassung des Agenten Änderungen behauptet hat, die nie auf der Festplatte gelandet sind.`)
};

const fr_fixproofmethodexcludedbody3 = /** @type {(inputs: Fixproofmethodexcludedbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Les échecs de quota du fournisseur et les défaillances du harness sont exclus des deux indices. Pas les dépassements de délai : ils comptent comme des échecs. Le tableau signale aussi les régressions, les modifications de tests de l'agent qu'il a fallu annuler, et les exécutions où le résumé de l'agent annonçait des modifications qui n'ont jamais atteint le disque.`)
};

const uk_fixproofmethodexcludedbody3 = /** @type {(inputs: Fixproofmethodexcludedbody3Inputs) => LocalizedString} */ () => {
	return /** @type {LocalizedString} */ (`Помилки квоти провайдера та збої harness виключені з обох індексів. Тайм-аути ні: вони рахуються як провал. Таблиця також показує регресії, зміни агента в тестах, які довелося скасувати, і запуски, де підсумок агента заявляв про зміни, що так і не потрапили на диск.`)
};

/**
* | output |
* | --- |
* | "Provider quota failures and harness faults are excluded from both indexes. Timeouts are not: they count as failures. The board also reports regressions, agen..." |
*
* @param {Fixproofmethodexcludedbody3Inputs} inputs
* @param {{ locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }} options
* @returns {LocalizedString}
*/
const fixproofmethodexcludedbody3 = /** @type {((inputs?: Fixproofmethodexcludedbody3Inputs, options?: { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Fixproofmethodexcludedbody3Inputs, { locale?: "en" | "es" | "zh" | "ja" | "ko" | "zh-Hant" | "de" | "fr" | "uk" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "es") return es_fixproofmethodexcludedbody3(inputs)
	if (locale === "zh") return zh_fixproofmethodexcludedbody3(inputs)
	if (locale === "ja") return ja_fixproofmethodexcludedbody3(inputs)
	if (locale === "ko") return ko_fixproofmethodexcludedbody3(inputs)
	if (locale === "zh-Hant") return zh_hant1_fixproofmethodexcludedbody3(inputs)
	if (locale === "de") return de_fixproofmethodexcludedbody3(inputs)
	if (locale === "fr") return fr_fixproofmethodexcludedbody3(inputs)
	if (locale === "uk") return uk_fixproofmethodexcludedbody3(inputs)
	return en_fixproofmethodexcludedbody3(inputs)
});
export { fixproofmethodexcludedbody3 as "fixproofMethodExcludedBody" }