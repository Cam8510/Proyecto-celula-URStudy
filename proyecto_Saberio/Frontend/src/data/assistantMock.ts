import type { AssistantMonitor, AssistantSubject } from '../types/assistant'
import type { AvatarColor, Modality } from '../types/monitoring'

function mon(
  name: string, initials: string, color: AvatarColor, rating: string,
  modality: Modality, online: boolean, slots: string[],
): AssistantMonitor {
  return { name, initials, color, rating, modality, online, slots }
}

export const SUGGESTED_SUBJECTS = ['Cálculo Integral', 'Álgebra Lineal', 'Programación I', 'Microeconomía', 'Estadística']

export const ASSISTANT_SUBJECTS: AssistantSubject[] = [
  {
    name: 'Cálculo Integral',
    keywords: ['integral', 'integrar', 'primitiva', 'antiderivada', 'calculo 2', 'calculo integral'],
    topics: [
      { label: 'Integrales por partes', keywords: ['partes'] },
      { label: 'Sustitución', keywords: ['sustitucion'] },
      { label: 'Áreas y volúmenes', keywords: ['area', 'volumen'] },
    ],
    monitors: [
      mon('Carlos Ruiz', 'CR', 'purple', '4.8', 'Virtual', true, ['Hoy 4:00 PM', 'Mañana 10:00 AM', 'Jue 2:00 PM']),
      mon('Laura Gutiérrez', 'LG', 'primary', '4.9', 'Presencial', false, ['Mié 8:00 AM', 'Vie 11:00 AM']),
    ],
  },
  {
    name: 'Cálculo Diferencial',
    keywords: ['derivada', 'derivar', 'limite', 'calculo', 'regla de la cadena', 'continuidad'],
    topics: [
      { label: 'Derivadas', keywords: ['derivada', 'derivar'] },
      { label: 'Límites', keywords: ['limite'] },
      { label: 'Regla de la cadena', keywords: ['cadena'] },
    ],
    monitors: [
      mon('Andrés Mora', 'AM', 'blue', '4.7', 'Virtual', true, ['Hoy 5:30 PM', 'Mañana 9:00 AM']),
      mon('Laura Gutiérrez', 'LG', 'primary', '4.9', 'Presencial', false, ['Mié 8:00 AM', 'Vie 11:00 AM']),
    ],
  },
  {
    name: 'Álgebra Lineal',
    keywords: ['algebra', 'matriz', 'matrices', 'vector', 'determinante', 'autovalor', 'espacio vectorial'],
    topics: [
      { label: 'Matrices', keywords: ['matriz', 'matrices'] },
      { label: 'Determinantes', keywords: ['determinante'] },
      { label: 'Espacios vectoriales', keywords: ['espacio', 'vector'] },
    ],
    monitors: [
      mon('Valentina Cruz', 'VC', 'purple', '4.9', 'Virtual', true, ['Hoy 6:00 PM', 'Jue 10:00 AM']),
      mon('Daniel Peña', 'DP', 'blue', '4.6', 'Presencial', false, ['Mañana 2:00 PM', 'Vie 3:00 PM']),
    ],
  },
  {
    name: 'Programación I',
    keywords: ['programacion', 'python', 'java', 'codigo', 'bucle', 'ciclo', 'funcion', 'algoritmo'],
    topics: [
      { label: 'Ciclos', keywords: ['bucle', 'ciclo', 'for', 'while'] },
      { label: 'Funciones', keywords: ['funcion'] },
      { label: 'Listas', keywords: ['lista', 'arreglo'] },
    ],
    monitors: [
      mon('Juan Pablo Ríos', 'JR', 'primary', '4.8', 'Virtual', true, ['Hoy 3:00 PM', 'Mañana 11:00 AM']),
      mon('Camila Torres', 'CT', 'purple', '4.7', 'Virtual', false, ['Mié 4:00 PM', 'Vie 9:00 AM']),
    ],
  },
  {
    name: 'Estructuras de Datos',
    keywords: ['estructura', 'arbol', 'grafo', 'pila', 'cola', 'lista enlazada', 'recursion'],
    topics: [
      { label: 'Árboles', keywords: ['arbol'] },
      { label: 'Grafos', keywords: ['grafo'] },
      { label: 'Recursión', keywords: ['recursion'] },
    ],
    monitors: [
      mon('Camila Torres', 'CT', 'purple', '4.7', 'Virtual', true, ['Hoy 7:00 PM', 'Jue 3:00 PM']),
      mon('Juan Pablo Ríos', 'JR', 'primary', '4.8', 'Presencial', false, ['Vie 10:00 AM', 'Sáb 9:00 AM']),
    ],
  },
  {
    name: 'Microeconomía',
    keywords: ['micro', 'oferta', 'demanda', 'elasticidad', 'equilibrio', 'utilidad'],
    topics: [
      { label: 'Oferta y demanda', keywords: ['oferta', 'demanda'] },
      { label: 'Elasticidad', keywords: ['elasticidad'] },
      { label: 'Equilibrio', keywords: ['equilibrio'] },
    ],
    monitors: [
      mon('Mariana Ospina', 'MO', 'blue', '4.9', 'Presencial', false, ['Mañana 1:00 PM', 'Jue 9:00 AM']),
      mon('Sebastián Vega', 'SV', 'primary', '4.6', 'Virtual', true, ['Hoy 5:00 PM', 'Vie 2:00 PM']),
    ],
  },
  {
    name: 'Macroeconomía',
    keywords: ['macro', 'inflacion', 'pib', 'politica monetaria', 'politica fiscal'],
    topics: [
      { label: 'PIB', keywords: ['pib'] },
      { label: 'Inflación', keywords: ['inflacion'] },
      { label: 'Política monetaria', keywords: ['monetaria'] },
    ],
    monitors: [
      mon('Sebastián Vega', 'SV', 'primary', '4.6', 'Virtual', true, ['Hoy 6:30 PM', 'Mié 3:00 PM']),
      mon('Mariana Ospina', 'MO', 'blue', '4.9', 'Virtual', false, ['Jue 11:00 AM', 'Vie 4:00 PM']),
    ],
  },
  {
    name: 'Estadística',
    keywords: ['estadistica', 'probabilidad', 'media', 'varianza', 'hipotesis', 'regresion', 'distribucion'],
    topics: [
      { label: 'Probabilidad', keywords: ['probabilidad'] },
      { label: 'Pruebas de hipótesis', keywords: ['hipotesis'] },
      { label: 'Regresión', keywords: ['regresion'] },
    ],
    monitors: [
      mon('Daniela Pardo', 'DP', 'purple', '4.8', 'Virtual', true, ['Hoy 4:30 PM', 'Mañana 3:00 PM']),
      mon('Nicolás Rey', 'NR', 'blue', '4.7', 'Presencial', false, ['Mié 10:00 AM', 'Vie 1:00 PM']),
    ],
  },
  {
    name: 'Física Mecánica',
    keywords: ['fisica', 'cinematica', 'newton', 'fuerza', 'energia', 'movimiento', 'torque'],
    topics: [
      { label: 'Cinemática', keywords: ['cinematica', 'movimiento'] },
      { label: 'Leyes de Newton', keywords: ['newton', 'fuerza'] },
      { label: 'Energía', keywords: ['energia'] },
    ],
    monitors: [
      mon('Felipe Salazar', 'FS', 'primary', '4.8', 'Presencial', false, ['Mañana 8:00 AM', 'Jue 4:00 PM']),
      mon('Andrés Mora', 'AM', 'blue', '4.7', 'Virtual', true, ['Hoy 8:00 PM', 'Vie 12:00 PM']),
    ],
  },
  {
    name: 'Contabilidad',
    keywords: ['contabilidad', 'balance', 'asiento', 'debito', 'credito', 'estado de resultados'],
    topics: [
      { label: 'Balance general', keywords: ['balance'] },
      { label: 'Asientos contables', keywords: ['asiento', 'debito', 'credito'] },
      { label: 'Estado de resultados', keywords: ['resultados'] },
    ],
    monitors: [
      mon('Paula Medina', 'PM', 'purple', '4.9', 'Virtual', true, ['Hoy 5:00 PM', 'Mié 9:00 AM']),
      mon('Esteban Gil', 'EG', 'blue', '4.6', 'Presencial', false, ['Jue 1:00 PM', 'Vie 10:00 AM']),
    ],
  },
  {
    name: 'Química General',
    keywords: ['quimica', 'estequiometria', 'mol', 'enlace', 'reaccion', 'tabla periodica'],
    topics: [
      { label: 'Estequiometría', keywords: ['estequiometria', 'mol'] },
      { label: 'Enlaces', keywords: ['enlace'] },
      { label: 'Reacciones', keywords: ['reaccion'] },
    ],
    monitors: [
      mon('Isabella Lara', 'IL', 'primary', '4.8', 'Virtual', true, ['Hoy 4:00 PM', 'Jue 5:00 PM']),
      mon('Felipe Salazar', 'FS', 'primary', '4.8', 'Presencial', false, ['Mañana 10:00 AM', 'Vie 3:00 PM']),
    ],
  },
  {
    name: 'Ecuaciones Diferenciales',
    keywords: ['ecuacion', 'ecuaciones', 'edo', 'laplace', 'diferenciales'],
    topics: [
      { label: 'EDO de primer orden', keywords: ['primer orden'] },
      { label: 'Transformada de Laplace', keywords: ['laplace'] },
      { label: 'Sistemas de EDO', keywords: ['sistema'] },
    ],
    monitors: [
      mon('Carlos Ruiz', 'CR', 'purple', '4.8', 'Virtual', true, ['Hoy 7:00 PM', 'Mié 2:00 PM']),
      mon('Valentina Cruz', 'VC', 'purple', '4.9', 'Presencial', false, ['Jue 8:00 AM', 'Vie 9:00 AM']),
    ],
  },
]