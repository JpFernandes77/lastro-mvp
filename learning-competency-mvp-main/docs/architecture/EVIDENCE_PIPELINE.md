# Evidence Pipeline

## Objetivo

Separar claramente fonte, extração, interpretação, revisão, governança, estado e verificação.

## Pipeline

INGEST → NORMALIZE → EXTRACT → INTERPRET → RELATE → VERIFICATION MECHANISMS → GOVERNANCE / COMPLIANCE → CONSENSUS CORE → UPDATE STATE → ATTEST → VERIFY

## Princípios

### Evidência

A evidência deve preservar referência à sua origem e representar aquilo que foi efetivamente produzido ou apresentado.

### Extração

A extração deve permanecer distinguível de qualquer inferência posterior.

### Interpretação

A IA pode identificar relações, sinais e pontos que exigem revisão. Essas saídas são propostas, não decisões finais.

### Relação com competência

Cada sinal relevante deve poder ser relacionado à competência e ao critério que o sustenta.

### Verificação e revisão

A revisão humana deixa de ser o caminho obrigatório para cada caso. Verificações de integridade, regras determinísticas, robustez estatística quando aplicável e interpretação assistida podem produzir sinais independentes.

Quando essas verificações convergirem segundo as regras do processo, o estado pode avançar sem uma nova decisão subjetiva. Casos conflitantes, ambíguos ou insuficientes são encaminhados para revisão/adjudicação humana.

A revisão humana continua sendo uma camada de segurança, contestação e decisão contextual — não uma garantia isolada de correção.

### Verification Mechanisms / Consensus Core

As verificações independentes produzem resultados rastreáveis que são avaliados pelo `Consensus Core`. O núcleo não conta votos: verifica convergência, requisitos mínimos, conflitos e insuficiência de evidência.

Consulte `CONSENSUS_CORE.md`.

### Governance / Compliance

A camada de governança define as condições e regras que autorizam o resultado do Consensus Core a produzir uma mudança de estado.

Ela considera critérios, independência, conflitos de interesse, divergências, justificativas e regras de decisão.

Consulte `GOVERNANCE_COMPLIANCE_LAYER.md`.

### Estado

O estado representa somente o que as evidências, as verificações convergentes e as regras de governança permitem sustentar.

### Atestação

A atestação representa um estado ou evento definido, não o conteúdo integral da evidência.

### Verificação

A verificação deve permitir confirmar a integridade e a referência da atestação.

## Proveniência

Para informações relevantes, deve ser possível distinguir se vieram diretamente da evidência, de uma verificação determinística, de uma interpretação assistida, de uma validação estatística, da revisão humana ou da decisão de governança.

## Modelo de confiança

O MVP trabalha com níveis conceituais de confiança. A definição e os mecanismos finais de verificação permanecem sujeitos a evolução futura.
