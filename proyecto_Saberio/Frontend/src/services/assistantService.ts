import type { AssistantService } from '../types/assistant'
import { ASSISTANT_SUBJECTS } from '../data/assistantMock'
import { normalize } from '../utils/format'

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Cerebro simulado: busca palabras clave en el texto, igual que tu HTML
export const mockAssistant: AssistantService = {
  async ask(text) {
    await wait(700)   // simula que "piensa"
    const q = normalize(text)

    const subject = ASSISTANT_SUBJECTS.find(
      (s) => s.keywords.some((k) => q.includes(k)) || q.includes(normalize(s.name)),
    )
    if (!subject) return { kind: 'unknown' }

    const topic = subject.topics.find((t) => t.keywords.some((k) => q.includes(k)))
    return { kind: 'match', subject, topic: topic ? topic.label : null }
  },
}