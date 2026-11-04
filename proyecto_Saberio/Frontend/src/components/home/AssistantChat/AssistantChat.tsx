import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import type { AssistantMonitor, AssistantService, AssistantSubject, Reservation } from '../../../types/assistant'
import { mockAssistant } from '../../../services/assistantService'
import { SUGGESTED_SUBJECTS } from '../../../data/assistantMock'
import MonitorOptionCard from '../MonitorOptionCard/MonitorOptionCard'
// @ts-ignore - the stylesheet is declared by the project's Vite setup
import './AssistantChat.css'

// Cada cosa que aparece en el chat es un "item" de uno de estos tipos
type ChatItem =
  | { id: number; kind: 'ia'; text: string }
  | { id: number; kind: 'user'; text: string }
  | { id: number; kind: 'suggestions' }
  | { id: number; kind: 'monitors'; subject: AssistantSubject; topic: string | null }
  | { id: number; kind: 'login'; summary: string }

interface AssistantChatProps {
  service?: AssistantService   // por defecto usa el cerebro simulado
}

const RESERVATION_KEY = 'saberio_reserva'
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

function AssistantChat({ service = mockAssistant }: AssistantChatProps) {
  const nextId = useRef(3)
  const listRef = useRef<HTMLDivElement>(null)

  const [items, setItems] = useState<ChatItem[]>([
    { id: 1, kind: 'ia', text: 'Hola 👋 Soy el asistente de Saberio. ¿Qué tema necesitas repasar?' },
    { id: 2, kind: 'suggestions' },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [busy, setBusy] = useState(false)
  const [chosenKey, setChosenKey] = useState<string | null>(null)

  // Baja el scroll al último mensaje
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight })
  }, [items, typing])

  const add = (make: (id: number) => ChatItem) => {
    const item = make(nextId.current++)
    setItems((prev) => [...prev, item])
  }

  const send = async (raw: string) => {
    const text = raw.trim()
    if (!text || busy || chosenKey) return

    setBusy(true)
    setInput('')
    setItems((prev) => prev.filter((i) => i.kind !== 'suggestions'))
    add((id) => ({ id, kind: 'user', text }))
    setTyping(true)

    try {
      const result = await service.ask(text)
      setTyping(false)

      if (result.kind === 'unknown') {
        add((id) => ({ id, kind: 'ia', text: 'No reconocí ese tema. Escríbelo de otra forma o elige una materia:' }))
        add((id) => ({ id, kind: 'suggestions' }))
      } else {
        const { subject, topic } = result
        add((id) => ({
          id,
          kind: 'ia',
          text: topic
            ? `Entendido: ${topic} en ${subject.name}. Estoy buscando monitores disponibles…`
            : `Entendido: ${subject.name}. Estoy buscando monitores disponibles…`,
        }))
        setTyping(true)
        await wait(900)
        setTyping(false)
        add((id) => ({ id, kind: 'ia', text: `Encontré ${subject.monitors.length} monitores para ti. Toca un horario para reservar:` }))
        add((id) => ({ id, kind: 'monitors', subject, topic }))
      }
    } catch {
      setTyping(false)
      add((id) => ({ id, kind: 'ia', text: 'Algo salió mal. Intenta de nuevo o elige una materia:' }))
      add((id) => ({ id, kind: 'suggestions' }))
    } finally {
      setBusy(false)
    }
  }

  const choose = async (monitor: AssistantMonitor, subject: AssistantSubject, topic: string | null, slot: string) => {
    if (chosenKey || busy) return
    setBusy(true)
    setChosenKey(`${monitor.name}|${slot}`)

    // Guardamos la elección para usarla después del login
    const reservation: Reservation = {
      monitor: monitor.name, subject: subject.name, topic: topic ?? '', slot, modality: monitor.modality,
    }
    try {
      sessionStorage.setItem(RESERVATION_KEY, JSON.stringify(reservation))
    } catch {
      // Sin almacenamiento disponible: seguimos sin guardar
    }

    add((id) => ({ id, kind: 'user', text: `Quiero ${slot} con ${monitor.name}` }))
    setTyping(true)
    await wait(700)
    setTyping(false)
    add((id) => ({ id, kind: 'ia', text: 'Buena elección. Inicia sesión con tu correo del Rosario para confirmar tu reserva.' }))
    add((id) => ({ id, kind: 'login', summary: `${monitor.name} · ${slot} · ${monitor.modality}` }))
    setBusy(false)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    send(input)
  }

  return (
    <div className="chat">
      <div className="chat__panel" role="region" aria-label="Asistente de Saberio">
        <div className="chat__head">
          <span className="chat__bot" aria-hidden="true">✨</span>
          <div>
            <b>Asistente Saberio</b>
            <span className="chat__status">Te responde al instante</span>
          </div>
        </div>

        <div className="chat__list" ref={listRef} aria-live="polite">
          {items.map((item) => {
            switch (item.kind) {
              case 'ia':
                return <div key={item.id} className="bubble bubble--ia">{item.text}</div>
              case 'user':
                return <div key={item.id} className="bubble bubble--user">{item.text}</div>
              case 'suggestions':
                return (
                  <div key={item.id} className="chips">
                    {SUGGESTED_SUBJECTS.map((s) => (
                      <button key={s} type="button" onClick={() => send(s)}>{s}</button>
                    ))}
                  </div>
                )
              case 'monitors':
                return item.subject.monitors.map((m) => (
                  <MonitorOptionCard
                    key={`${item.id}-${m.name}`}
                    monitor={m}
                    subjectName={item.subject.name}
                    tags={item.topic ? [item.topic] : item.subject.topics.slice(0, 2).map((t) => t.label)}
                    chosenKey={chosenKey}
                    onChoose={(slot) => choose(m, item.subject, item.topic, slot)}
                  />
                ))
              case 'login':
                return (
                  <div key={item.id} className="login-card">
                    <p><b>{item.summary}</b><br />Guardamos tu elección mientras entras.</p>
                    <div>
                      <Link className="login-card__primary" to="/login?reserva=1">Iniciar sesión</Link>
                      <Link className="login-card__outline" to="/registro?reserva=1">Crear cuenta</Link>
                    </div>
                  </div>
                )
            }
          })}

          {typing && (
            <div className="bubble bubble--ia typing" aria-label="El asistente está escribiendo">
              <i /><i /><i />
            </div>
          )}
        </div>

        <form className="chat__form" onSubmit={handleSubmit} autoComplete="off">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={chosenKey ? 'Inicia sesión para continuar' : 'Ej: integrales por partes'}
            aria-label="Escribe el tema que necesitas"
            maxLength={120}
            disabled={Boolean(chosenKey)}
          />
          <button type="submit" aria-label="Enviar" disabled={Boolean(chosenKey) || busy}>→</button>
        </form>
      </div>
    </div>
  )
}

export default AssistantChat
