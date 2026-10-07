'use client'

import { useEffect, useRef, useState } from 'react'

type Language = 'en' | 'pt'

const translations: Record<string, string> = {
  'Overview': 'Visão geral',
  'Evidence Pipeline': 'Pipeline de evidências',
  'Attestation Queue': 'Fila de atestações',
  'Adjudication Center': 'Central de adjudicação',
  'Proof Verification': 'Verificação de prova',
  'Audit Logs': 'Logs de auditoria',
  'Evaluation Detail': 'Detalhes da avaliação',
  'VERIFICATION INFRASTRUCTURE': 'INFRAESTRUTURA DE VERIFICAÇÃO',
  'Recolher menu': 'Recolher menu',
  'Navegação principal': 'Navegação principal',
  'WORKSPACE': 'WORKSPACE',
  'Synthetic Demo': 'Demo sintética',
  'All records are illustrative': 'Todos os registros são ilustrativos',
  'and non-production.': 'e não são de produção.',
  'SYNTHETIC DEMO': 'DEMO SINTÉTICA',
  'SYNTHETIC COMPETENCY VERIFICATION': 'VERIFICAÇÃO SINTÉTICA DE COMPETÊNCIA',
  'Current states and the evidence supporting each decision.': 'Estados atuais e as evidências que sustentam cada decisão.',
  'Open evaluation': 'Abrir avaliação',
  'Illustrative demo data.': 'Dados ilustrativos de demonstração.',
  'This workspace contains synthetic evidence and organizational records.': 'Este workspace contém evidências sintéticas e registros organizacionais.',
  'PEOPLE IN EVALUATION': 'PESSOAS EM AVALIAÇÃO',
  'defined capability records': 'registros de capacidades definidas',
  'DEMONSTRATED': 'DEMONSTRADO',
  'under current evidence contract': 'sob o contrato atual de evidências',
  'IN DEVELOPMENT': 'EM DESENVOLVIMENTO',
  'additional evidence needed': 'evidências adicionais necessárias',
  'AWAITING ADJUDICATION': 'AGUARDANDO ADJUDICAÇÃO',
  'material verification conflict': 'conflito material de verificação',
  'BOUNDED STATE RECORDS': 'REGISTROS DE ESTADO DELIMITADOS',
  'Competency Trails': 'Trilhas de competência',
  'View queue': 'Ver fila',
  'Person': 'Pessoa',
  'Defined capability': 'Capacidade definida',
  'Current state': 'Estado atual',
  'Evidence': 'Evidência',
  'Updated': 'Atualizado',
  'Today': 'Hoje',
  'Yesterday': 'Ontem',
  'Evidence Operations': 'OPERAÇÕES DE EVIDÊNCIAS',
  'EVIDENCE OPERATIONS': 'OPERAÇÕES DE EVIDÊNCIAS',
  'Trace how submitted work becomes verifiable evidence.': 'Acompanhe como o trabalho enviado se transforma em evidência verificável.',
  'Search evidence': 'Pesquisar evidência',
  'SUBMITTED WORK': 'TRABALHO ENVIADO',
  'INGESTED': 'INGERIDO',
  'CANONICALIZED': 'CANONICALIZADO',
  'INTEGRITY VERIFIED': 'INTEGRIDADE VERIFICADA',
  'READY FOR VERIFICATION': 'PRONTO PARA VERIFICAÇÃO',
  'SELECTED EVIDENCE CASE': 'CASO DE EVIDÊNCIA SELECIONADO',
  'VERIFIED': 'VERIFICADO',
  'Provenance': 'Proveniência',
  'Source · activity · evidence type · content hash · ingestion timestamp': 'Fonte · atividade · tipo de evidência · hash do conteúdo · timestamp de ingestão',
  'Attestation operations': 'OPERAÇÕES DE ATESTAÇÃO',
  'Review records awaiting public attestation.': 'Revise registros aguardando atestação pública.',
  'Search queue': 'Pesquisar fila',
  'QUEUED': 'NA FILA',
  'READY': 'PRONTO',
  'HOLD': 'RETIDO',
  'ATTESTATION QUEUE': 'FILA DE ATESTAÇÕES',
  'Record': 'Registro',
  'Consensus': 'Consenso',
  'CONFLICT': 'CONFLITO',
  'INSUFFICIENT_EVIDENCE': 'EVIDÊNCIA_INSUFICIENTE',
  'AGREEMENT': 'CONCORDÂNCIA',
  'AI-assisted Financial Analysis': 'Análise financeira assistida por IA',
  'Evidence-based Decisions': 'Decisões baseadas em evidências',
  'AI-assisted Development': 'Desenvolvimento assistido por IA',
  'Reproducible Analysis': 'Análise reproduzível',
  '4 / 4 evidence items': '4 / 4 itens de evidência',
  '2 / 4 evidence items': '2 / 4 itens de evidência',
  'briefing': 'briefing',
  'analysis_artifact': 'artefato_de_análise',
  'analysis_result': 'resultado_da_análise',
  'communication': 'comunicação',
  'Evidence & Provenance': 'EVIDÊNCIA E PROVENIÊNCIA',
  'EVIDENCE & PROVENANCE': 'EVIDÊNCIA E PROVENIÊNCIA',
  'Submitted Evidence': 'Evidências enviadas',
  'ARTIFACTS': 'ARTEFATOS',
  'Integrity verification confirms that each artifact matches its recorded content hash. It does not establish semantic truth.': 'A verificação de integridade confirma que cada artefato corresponde ao hash de conteúdo registrado. Ela não estabelece a verdade semântica.',
  'CONSENSUS CORE': 'NÚCLEO DE CONSENSO',
  'DETERMINISTIC': 'DETERMINÍSTICO',
  'INTERPRETATION': 'INTERPRETAÇÃO',
  'ADJUDICATION': 'ADJUDICAÇÃO',
  'STATE': 'ESTADO',
  'EXCEPTION PATH': 'CAMINHO DE EXCEÇÃO',
  'Human Adjudication': 'Adjudicação humana',
  'Resolve a verification conflict while preserving the complete previous history.': 'Resolva um conflito de verificação preservando todo o histórico anterior.',
  'CONFLICT ACTIVE': 'CONFLITO ATIVO',
  'SELECTED EVALUATION': 'AVALIAÇÃO SELECIONADA',
  'Evidence Integrity Check': 'Verificação de integridade da evidência',
  'Deterministic Criteria Check': 'Verificação de critérios determinísticos',
  'AI Interpretation': 'Interpretação da IA',
  'EVIDENCE CONSIDERED': 'EVIDÊNCIAS CONSIDERADAS',
  'ADJUDICATOR RATIONALE': 'JUSTIFICATIVA DO ADJUDICADOR',
  'Contextual decision': 'Decisão contextual',
  'Explain the decision using the submitted evidence, defined criteria and relevant context.': 'Explique a decisão usando as evidências enviadas, os critérios definidos e o contexto relevante.',
  'Defined capability is considered demonstrated after contextual adjudication.': 'A capacidade definida é considerada demonstrada após a adjudicação contextual.',
  'Evidence remains insufficient to support the defined capability.': 'As evidências continuam insuficientes para sustentar a capacidade definida.',
  'Record Adjudication': 'Registrar adjudicação',
  'Previous verification results, evidence references, rationale, timestamp and rule version are preserved.': 'Os resultados anteriores, referências de evidências, justificativa, timestamp e versão da regra são preservados.',
  'TECHNICAL ARCHITECTURE': 'ARQUITETURA TÉCNICA',
  'How LASTRO Verifies Capability': 'Como o LASTRO verifica a capacidade',
  'From observable work to a bounded, auditable competency state.': 'Do trabalho observável a um estado de competência delimitado e auditável.',
  'OBSERVABLE WORK': 'TRABALHO OBSERVÁVEL',
  'EVIDENCE': 'EVIDÊNCIA',
  'INDEPENDENT VERIFICATION': 'VERIFICAÇÃO INDEPENDENTE',
  'COMPETENCY STATE': 'ESTADO DE COMPETÊNCIA',
  'ATTESTATION': 'ATESTACÃO',
  'PUBLIC VERIFICATION': 'VERIFICAÇÃO PÚBLICA',
  'Evidence Integrity': 'Integridade da evidência',
  'Deterministic Criteria': 'Critérios determinísticos',
  'AI Interpretation': 'Interpretação por IA',
  'Epistemic Boundaries': 'LIMITES EPISTÊMICOS',
  'What LASTRO does not claim': 'O que o LASTRO não afirma',
  'Universal competence': 'Competência universal',
  'Autonomous hiring or firing': 'Contratação ou demissão autônoma',
  'AI as final authority': 'IA como autoridade final',
  'Blockchain as decision-maker': 'Blockchain como tomador de decisão',
  'A score for human worth': 'Uma pontuação para o valor humano',
  'AI interprets. Rules verify. Consensus determines the state. Humans resolve material conflicts.': 'A IA interpreta. As regras verificam. O consenso determina o estado. Humanos resolvem conflitos materiais.',
  'Proof Verification': 'Verificação de prova',
  'Verify the integrity relationship between the attested state and its public Devnet record.': 'Verifique a relação de integridade entre o estado atestado e seu registro público na Devnet.',
  'DEVNET PROOF PENDING': 'PROVA DEVNET PENDENTE',
  'ATTESTATION RECORD': 'REGISTRO DE ATESTAÇÃO',
  'Competency State': 'Estado de competência',
  'Subject': 'Sujeito',
  'Record hash': 'Hash do registro',
  'Network': 'Rede',
  'Transaction': 'Transação',
  'Not available — proof pending': 'Indisponível — prova pendente',
  'Attestation status': 'Status da atestação',
  'NOT YET VERIFIED': 'AINDA NÃO VERIFICADO',
  'Verification method': 'Método de verificação',
  'Verify independently': 'Verificar independentemente',
  'Solana does not determine the competency state. It provides the public integrity/attestation anchor for a state already produced by the LASTRO verification process.': 'A Solana não determina o estado de competência. Ela fornece a âncora pública de integridade/atestado para um estado já produzido pelo processo de verificação do LASTRO.',
  'Sensitive evidence remains off-chain. The public record is an integrity reference, not the underlying learning evidence.': 'As evidências sensíveis permanecem off-chain. O registro público é uma referência de integridade, não a evidência de aprendizagem subjacente.',
  'PROVENANCE RECORD': 'REGISTRO DE PROVENIÊNCIA',
  'Audit Logs': 'Logs de auditoria',
  'Trace the evidence, verification results, consensus outcome and adjudication history.': 'Rastreie as evidências, resultados de verificação, resultado do consenso e histórico de adjudicação.',
  'Export log': 'Exportar log',
  'Date': 'Data',
  'Subject': 'Sujeito',
  'Capability': 'Capacidade',
  'Mechanism': 'Mecanismo',
  'Event type': 'Tipo de evento',
  'SYSTEM': 'SISTEMA',
  'AI': 'IA',
  'HUMAN ADJUDICATOR': 'ADJUDICADOR HUMANO',
  'Evidence ingested': 'Evidência ingerida',
  '4 artifacts registered': '4 artefatos registrados',
  'Evidence integrity verified': 'Integridade da evidência verificada',
  'SHA-256 content hashes matched': 'Hashes de conteúdo SHA-256 correspondentes',
  'Deterministic criteria evaluated': 'Critérios determinísticos avaliados',
  'Semantic interpretation completed': 'Interpretação semântica concluída',
  'Consensus evaluated': 'Consenso avaliado',
  'Adjudication recorded': 'Adjudicação registrada',
  'State record generated': 'Registro de estado gerado',
  'PASS': 'APROVADO',
  'WARNING': 'ATENÇÃO',
  'BLOCKED': 'BLOQUEADO',
  'IN_DEVELOPMENT': 'EM_DESENVOLVIMENTO',
  'Record hash: 8f4e...a1b2': 'Hash do registro: 8f4e...a1b2',
  'Verification rationale': 'Justificativa da verificação',
  'AI-assisted': 'Assistido por IA',
  'MECHANISM': 'MECANISMO',
  'VERSION': 'VERSÃO',
  'COPY': 'COPIAR',
  'Identity v0.1 · Solana Devnet': 'Identidade v0.1 · Solana Devnet',
  'From learning to proof.': 'Do aprendizado à prova.',
  'Infrastructure to turn learning experiences into evidence of competence — reviewed by people and verifiable. Evidence integrity, deterministic criteria and AI interpretation, kept separate on purpose.': 'Infraestrutura para transformar experiências de aprendizagem em evidências de competência — revisadas por pessoas e verificáveis. Integridade da evidência, critérios determinísticos e interpretação por IA, mantidos separados de propósito.',
  'EVIDENCE': 'EVIDÊNCIA',
  'INTERPRETATION': 'INTERPRETAÇÃO',
  'REVIEW': 'REVISÃO',
  'STATE': 'ESTADO',
  'PROOF': 'PROVA',
  'SHA-256 HASHES': 'HASHES SHA-256',
  '3 MECHANISMS': '3 MECANISMOS',
  'SOLANA DEVNET': 'SOLANA DEVNET',
  'AI INTERPRETS, NEVER DECIDES': 'IA INTERPRETA, NUNCA DECIDE',
  'Ring:': 'Anel:',
  'Two V layers:': 'Duas camadas em V:',
  'Blue diamond:': 'Losango azul:',
  'integrity and verification.': 'integridade e verificação.',
  'evidence and state — the base that sustains.': 'evidência e estado — a base que sustenta.',
  'the proof. The only point of colour, at the top of the stack.': 'a prova. É o único ponto de cor, no topo da pilha.',
  'COLOR': 'COR',
  'RESERVED FOR': 'RESERVADO PARA',
  'Attested records': 'Registros atestados',
  'MIN SIZE': 'TAMANHO MÍNIMO',
  '16 px / 32 px': '16 px / 32 px',
  'INDEPENDENT MECHANISMS': 'MECANISMOS INDEPENDENTES',
  'DISTINCT STAGES': 'ESTÁGIOS DISTINTOS',
  'CANONICAL ARTIFACTS': 'ARTEFATOS CANÔNICOS',
  'PUBLIC PROOF ANCHOR': 'ÂNCORA PÚBLICA DE PROVA',
  'PRODUCT GRAMMAR': 'GRAMÁTICA DO PRODUTO',
  'Every stage looks different from the one before': 'Cada estágio parece diferente do anterior',
  '6 STAGES · 1 COLOUR': '6 ESTÁGIOS · 1 COR',
  'Original evidence ≠ AI interpretation ≠ human decision ≠ state ≠ attestation ≠ verification. The difference is visual, not only a label.': 'Evidência original ≠ interpretação da IA ≠ decisão humana ≠ estado ≠ atestação ≠ verificação. A diferença é visual, não só de rótulo.',
  'AI INTERPRETATION': 'INTERPRETAÇÃO IA',
  'HUMAN REVIEW': 'REVISÃO HUMANA',
  'COMPETENCY STATE': 'ESTADO DE COMPETÊNCIA',
  'Solid gray. Source data.': 'Sólido cinza. Dado de origem.',
  'Dashed. Inference, not fact.': 'Tracejado. Inferência, não fato.',
  'White outline. Human decision.': 'Contorno branco. Decisão humana.',
  'Solid white. Not a certificate.': 'Sólido branco. Não é certificado.',
  'Blue. Proof recorded.': 'Azul. Prova registrada.',
  'Blue on black. Checked.': 'Azul sobre preto. Checada.',
  'ARCHITECTURE': 'ARQUITETURA',
  'CONFIDENCE SCALE': 'ESCALA DE CONFIANÇA',
  'Self-declared': 'Autodeclarado',
  'No supporting artifact': 'Sem artefato de suporte',
  'Evidence presented': 'Evidência apresentada',
  'Artifacts submitted as-is': 'Artefatos enviados como estão',
  'Analyzed': 'Analisada',
  'Criteria and interpretation applied': 'Critérios e interpretação aplicados',
  'Source verified': 'Fonte verificada',
  'Integrity anchored and publicly checkable': 'Integridade ancorada e verificável publicamente',
  'N1–N3 stay in grays. Blue is reserved for N4.': 'N1–N3 ficam em tons de cinza. O azul é reservado para N4.',
  'WHY THIS IS A CONFLICT': 'POR QUE ISSO É UM CONFLITO',
  'Deterministic criteria': 'Critérios determinísticos',
  'AI interpretation': 'Interpretação da IA',
  'State update': 'Atualização de estado',
  'DO APRENDIZADO À PROVA': 'FROM LEARNING TO PROOF',
  'IDENTITY v0.1': 'IDENTIDADE v0.1',
  'BUILT FOR COLOSSEUM / SUPERTEAM · SYNTHETIC DEMO DATA': 'FEITO PARA COLOSSEUM / SUPERTEAM · DADOS SINTÉTICOS DE DEMO',
  'Sync evaluation': 'Sincronizar avaliação',
  'Verification mechanisms diverge. Competency state must not be updated automatically.': 'Os mecanismos de verificação divergem. O estado de competência não deve ser atualizado automaticamente.',
  'Independent verification mechanisms are compatible and the evidence satisfies the defined criteria.': 'Os mecanismos independentes de verificação são compatíveis e as evidências satisfazem os critérios definidos.',
  'Awaiting human adjudication.': 'Aguardando adjudicação humana.',
  'Defined capability demonstrated under the current evidence contract and context.': 'Capacidade definida demonstrada sob o contrato atual de evidências e contexto.',
  'Semantic interpretation supports the defined capability based on the submitted evidence.': 'A interpretação semântica sustenta a capacidade definida com base nas evidências enviadas.',
  'Semantic interpretation identifies insufficient support for criterion C4 and recommends additional evidence.': 'A interpretação semântica identifica suporte insuficiente para o critério C4 e recomenda evidências adicionais.',
  'Recorded content hash matches the submitted artifact. Evidence is associated with the expected subject and activity.': 'O hash de conteúdo registrado corresponde ao artefato enviado. A evidência está associada ao sujeito e à atividade esperados.',
  'Defined structural criteria are satisfied independently of AI interpretation.': 'Os critérios estruturais definidos são satisfeitos independentemente da interpretação da IA.',
}

function translate(text: string, language: Language) {
  if (language === 'en') return text
  return translations[text] ?? text
}

function translateDocument(language: Language, originals: WeakMap<Text, string>, elements: WeakMap<Element, Map<string, string>>) {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
  let node: Node | null
  while ((node = walker.nextNode())) {
    const textNode = node as Text
    const value = textNode.nodeValue ?? ''
    if (!value.trim()) continue
    if (!originals.has(textNode)) originals.set(textNode, value)
    const original = originals.get(textNode) ?? value
    const leading = original.match(/^\s*/)?.[0] ?? ''
    const trailing = original.match(/\s*$/)?.[0] ?? ''
    const core = original.trim()
    const translated = translate(core, language)
    if (translated !== core) textNode.nodeValue = `${leading}${translated}${trailing}`
  }

  const attributeNames = ['placeholder', 'title', 'aria-label']
  document.querySelectorAll('*').forEach((element) => {
    let map = elements.get(element)
    if (!map) { map = new Map(); elements.set(element, map) }
    attributeNames.forEach((attribute) => {
      const current = element.getAttribute(attribute)
      if (!current) return
      const key = `${attribute}`
      if (!map!.has(key)) map!.set(key, current)
      const original = map!.get(key)!
      const translated = translate(original, language)
      if (translated !== original) element.setAttribute(attribute, translated)
    })
  })
}

export function LanguageSwitcher() {
  const [language, setLanguage] = useState<Language>('en')
  const originals = useRef(new WeakMap<Text, string>())
  const attributes = useRef(new WeakMap<Element, Map<string, string>>())

  useEffect(() => {
    const saved = window.localStorage.getItem('lastro-language') as Language | null
    if (saved === 'pt' || saved === 'en') setLanguage(saved)
  }, [])

  useEffect(() => {
    const apply = () => translateDocument(language, originals.current, attributes.current)
    apply()
    const observer = new MutationObserver(() => apply())
    observer.observe(document.body, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [language])

  const changeLanguage = (next: Language) => {
    setLanguage(next)
    window.localStorage.setItem('lastro-language', next)
  }

  return (
    <div className="language-switcher" aria-label="Language selector">
      <button className={language === 'pt' ? 'language-button language-active' : 'language-button'} onClick={() => changeLanguage('pt')} aria-pressed={language === 'pt'}>BR</button>
      <button className={language === 'en' ? 'language-button language-active' : 'language-button'} onClick={() => changeLanguage('en')} aria-pressed={language === 'en'}>EN</button>
    </div>
  )
}
