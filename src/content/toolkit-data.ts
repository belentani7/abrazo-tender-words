// ============================================================
// HERRAMIENTAS · Datos de referencia
// Contenido psicoeducativo aplicado (DBT, apego, señales).
// Educativo. No sustituye evaluación ni tratamiento profesional.
// ============================================================

export type SkillCard = {
  id: string;
  acronym: string;
  name: string;
  module: "Mindfulness" | "Tolerancia al malestar" | "Regulación emocional" | "Eficacia interpersonal";
  when: string;
  steps: { k: string; v: string }[];
  note?: string;
};

export const SKILL_CARDS: SkillCard[] = [
  {
    id: "stop",
    acronym: "STOP",
    name: "Frenar antes de actuar",
    module: "Tolerancia al malestar",
    when: "Cuando el impulso de responder, escribir o irse dando un portazo va más rápido que tú.",
    steps: [
      { k: "S — Stop", v: "Congélate. No muevas un músculo ni mandes nada. El impulso baja solo si no lo alimentas." },
      { k: "T — Toma distancia", v: "Un paso atrás, físico o mental. Suelta el móvil, sal de la habitación un minuto." },
      { k: "O — Observa", v: "Qué pasa dentro (pulso, calor, pensamiento) y fuera (qué dijo exactamente, qué no)." },
      { k: "P — Procede con conciencia", v: "Pregúntate qué respuesta querrías haber dado dentro de una semana. Esa." },
    ],
  },
  {
    id: "tipp",
    acronym: "TIPP",
    name: "Bajar la activación del cuerpo",
    module: "Tolerancia al malestar",
    when: "Emoción a 8-10/10: crisis, pánico, ganas de autolesionarte o de hacer algo irreversible.",
    steps: [
      { k: "T — Temperatura", v: "Agua fría en la cara o hielo en las muñecas 30 segundos, respirando lento. Activa el reflejo de inmersión y frena el sistema de alarma." },
      { k: "I — Intensidad física", v: "20 segundos de esfuerzo intenso: escaleras, sentadillas, correr. Quema la adrenalina que no tiene salida." },
      { k: "P — Respiración pausada", v: "Espira más largo que inspiras (4 dentro, 6-8 fuera) durante 2 minutos." },
      { k: "P — Relajación muscular", v: "Tensa un grupo muscular 5 segundos y suelta. Sube desde los pies hasta la mandíbula." },
    ],
    note: "Consulta con tu médico antes de usar frío intenso si tienes problemas cardíacos o de tensión.",
  },
  {
    id: "accepts",
    acronym: "ACCEPTS",
    name: "Distraerse sin dañarse",
    module: "Tolerancia al malestar",
    when: "El malestar no se puede resolver ahora y necesitas cruzar la ola sin romper nada.",
    steps: [
      { k: "A — Actividades", v: "Algo que ocupe manos y cabeza: cocinar, ordenar, caminar." },
      { k: "C — Contribuir", v: "Hacer algo por otro saca el foco del bucle interno." },
      { k: "C — Comparaciones", v: "Recuerda momentos peores que ya cruzaste. No para minimizar: para recordar que sabes cruzarlos." },
      { k: "E — Emociones opuestas", v: "Música, vídeo o lectura que induzca otra emoción distinta a la que te ahoga." },
      { k: "P — Postergar", v: "Dile a tu mente: «vuelvo a esto en 30 minutos». No niegas, aplazas." },
      { k: "T — Tareas", v: "Pensamientos concretos: contar hacia atrás de 7 en 7, nombrar capitales." },
      { k: "S — Sensaciones", v: "Ducha caliente, hielo, olor fuerte, sabor intenso. Devuelve el cuerpo al presente." },
    ],
  },
  {
    id: "please",
    acronym: "PLEASE",
    name: "Cuidar la base biológica",
    module: "Regulación emocional",
    when: "Prevención. Un cuerpo desatendido convierte una molestia en una crisis.",
    steps: [
      { k: "PL — Physical illness", v: "Trata lo físico. Un dolor sin atender baja tu umbral emocional." },
      { k: "E — Eating", v: "Come de forma regular. La hipoglucemia imita a la ansiedad." },
      { k: "A — Adicciones", v: "Reduce alcohol y sustancias: prometen calma y devuelven desregulación." },
      { k: "S — Sleep", v: "Sueño estable. Es el factor que más predice tu tolerancia emocional del día siguiente." },
      { k: "E — Ejercicio", v: "20 minutos de movimiento la mayoría de días. Efecto acumulativo, no mágico." },
    ],
  },
  {
    id: "opuesta",
    acronym: "ACCIÓN OPUESTA",
    name: "Actuar al revés de la emoción",
    module: "Regulación emocional",
    when: "La emoción no encaja con los hechos o encaja pero actuar según ella empeora todo.",
    steps: [
      { k: "1. Nombra", v: "«Esto es miedo», «esto es vergüenza», «esto es rabia»." },
      { k: "2. Comprueba los hechos", v: "¿Qué evidencia real hay? ¿Qué interpretación estoy añadiendo?" },
      { k: "3. Identifica el impulso", v: "Miedo → evitar. Vergüenza → esconderse. Rabia → atacar. Tristeza → aislarse." },
      { k: "4. Haz lo contrario, del todo", v: "Acércate, muéstrate, habla con suavidad, sal. A medias no funciona." },
    ],
    note: "Si la emoción sí encaja con los hechos (hay peligro real), no uses acción opuesta: resuelve el problema o protégete.",
  },
  {
    id: "dearman",
    acronym: "DEAR MAN",
    name: "Pedir y decir que no",
    module: "Eficacia interpersonal",
    when: "Necesitas algo concreto o necesitas negarte sin romper el vínculo.",
    steps: [
      { k: "D — Describe", v: "Los hechos, sin adjetivos: «ayer cancelaste a las diez de la noche»." },
      { k: "E — Expresa", v: "Cómo te sentiste, en primera persona: «me sentí poco importante»." },
      { k: "A — Afirma", v: "Pide o niega con claridad: «te pido que me avises con un día»." },
      { k: "R — Refuerza", v: "Qué gana la relación: «así puedo organizarme y llego con ganas»." },
      { k: "M — Mantente presente", v: "Vuelve a tu petición aunque intenten desviarla (disco rayado)." },
      { k: "A — Aparenta seguridad", v: "Voz firme y calmada, contacto visual, sin disculparte por existir." },
      { k: "N — Negocia", v: "Ofrece alternativas si el objetivo es el vínculo y no ganar." },
    ],
  },
  {
    id: "give",
    acronym: "GIVE",
    name: "Cuidar la relación mientras hablas",
    module: "Eficacia interpersonal",
    when: "La conversación importa menos que la persona con la que la tienes.",
    steps: [
      { k: "G — Gentileza", v: "Sin ataques, sin sarcasmo, sin amenazas." },
      { k: "I — Interés", v: "Escucha sin interrumpir, aunque no compartas nada de lo dicho." },
      { k: "V — Valida", v: "«Tiene sentido que te sientas así» no es darle la razón, es reconocer su experiencia." },
      { k: "E — Estilo relajado", v: "Sonrisa, humor amable, ligereza cuando cabe." },
    ],
  },
  {
    id: "fast",
    acronym: "FAST",
    name: "No perderte a ti en la conversación",
    module: "Eficacia interpersonal",
    when: "Sueles ceder, disculparte de más o acabar dudando de tu propio criterio.",
    steps: [
      { k: "F — Fair (justo)", v: "Justo contigo y con la otra persona." },
      { k: "A — Apologies", v: "Sin disculpas excesivas. No pidas perdón por pedir." },
      { k: "S — Stick to values", v: "No negocies lo que es un valor tuyo para calmar el momento." },
      { k: "T — Truthful", v: "Sin exagerar ni inventar excusas. Un «no quiero» basta." },
    ],
  },
  {
    id: "wisemind",
    acronym: "MENTE SABIA",
    name: "Entre la emoción y la razón",
    module: "Mindfulness",
    when: "Tienes que decidir algo importante y la cabeza y el pecho dicen cosas distintas.",
    steps: [
      { k: "Mente emocional", v: "Decide por el estado del momento. Rápida, intensa, a veces cara." },
      { k: "Mente racional", v: "Decide por datos. Fría, útil, a veces desconectada de lo que importa." },
      { k: "Mente sabia", v: "La intersección: reconoce la emoción como información y no como orden." },
      { k: "Práctica", v: "Respira, baja la atención al centro del cuerpo y pregunta: «¿qué sé que es verdad aquí?». Espera la respuesta que llega tranquila." },
    ],
  },
  {
    id: "validacion",
    acronym: "6 NIVELES",
    name: "Validar sin mentir ni ceder",
    module: "Eficacia interpersonal",
    when: "Quieres calmar a alguien desregulado sin darle la razón en lo que no la tiene.",
    steps: [
      { k: "1. Presencia", v: "Estar. Mirar. No mirar el móvil." },
      { k: "2. Reflejo", v: "Repetir lo que has entendido sin interpretarlo." },
      { k: "3. Leer lo no dicho", v: "«Imagino que además te dio miedo»." },
      { k: "4. Validar por historia", v: "«Con lo que viviste, tiene todo el sentido que reacciones así»." },
      { k: "5. Validar por el presente", v: "«Cualquiera se sentiría así ahora mismo»." },
      { k: "6. Autenticidad radical", v: "Tratar a la persona como capaz, no como frágil. Hablarle de igual a igual." },
    ],
    note: "Validar la emoción nunca es validar la conducta. «Entiendo tu rabia» y «no acepto que me grites» conviven.",
  },
];

// ── Test orientativo de estilo de apego ─────────────────────
export type AttachItem = { q: string; dim: "ansioso" | "evitativo" };

export const ATTACH_ITEMS: AttachItem[] = [
  { q: "Me preocupa que la persona que quiero deje de quererme.", dim: "ansioso" },
  { q: "Necesito muchas señales de que le importo para quedarme tranquilo/a.", dim: "ansioso" },
  { q: "Si tarda en responder, mi cabeza construye escenarios de abandono.", dim: "ansioso" },
  { q: "Me cuesta estar bien cuando hay algo sin resolver entre nosotros.", dim: "ansioso" },
  { q: "A veces hago cosas para provocar una reacción y comprobar que sigue ahí.", dim: "ansioso" },
  { q: "Tiendo a dar más de lo que recibo para asegurar el vínculo.", dim: "ansioso" },
  { q: "Mi estado de ánimo depende bastante de cómo esté la relación ese día.", dim: "ansioso" },
  { q: "Cuando alguien se acerca mucho, siento la necesidad de espacio.", dim: "evitativo" },
  { q: "Prefiero resolver mis cosas solo/a antes que pedir ayuda.", dim: "evitativo" },
  { q: "Me incomoda hablar de sentimientos profundos.", dim: "evitativo" },
  { q: "Si hay conflicto, tiendo a desconectar o a cerrarme.", dim: "evitativo" },
  { q: "Valoro mi independencia por encima de la intimidad.", dim: "evitativo" },
  { q: "Me cuesta confiar del todo aunque la otra persona no haya fallado.", dim: "evitativo" },
  { q: "Cuando alguien depende de mí emocionalmente, me agobio.", dim: "evitativo" },
];

export type AttachStyle = "seguro" | "ansioso" | "evitativo" | "desorganizado";

export const ATTACH_RESULTS: Record<AttachStyle, { title: string; body: string; work: string[] }> = {
  seguro: {
    title: "Tendencia segura",
    body: "Toleras la cercanía y la distancia sin que ninguna te desmonte. Puedes pedir, decir que no y reparar después de un conflicto. No significa que no sufras: significa que tu sistema vuelve a la calma.",
    work: [
      "Cuida que la seguridad no se erosione en vínculos que te desregulan de forma sostenida.",
      "Tu regulación puede ayudar a otros; no te conviertas en su único regulador.",
    ],
  },
  ansioso: {
    title: "Tendencia ansiosa (preocupada)",
    body: "Tu alarma se enciende con las señales de distancia. Buscas proximidad para calmarte y la espera se te hace insoportable. No eres intenso/a de más: tu sistema aprendió que el vínculo es frágil.",
    work: [
      "Practica tolerar 20 minutos antes de responder a un pico de angustia.",
      "Pide de forma concreta en vez de testear: «necesito que me digas si llegas tarde».",
      "Construye fuentes de regulación fuera de la relación (cuerpo, amistades, rutina).",
    ],
  },
  evitativo: {
    title: "Tendencia evitativa (distanciada)",
    body: "Tu forma de protegerte es la autosuficiencia. La cercanía activa una sensación de invasión y desconectas. No es frialdad: es una estrategia que un día fue necesaria.",
    work: [
      "Nombra la necesidad de espacio en vez de desaparecer: «necesito una hora y vuelvo».",
      "Comparte una cosa pequeña y real al día. La intimidad se entrena en dosis.",
      "Observa el impulso de buscar defectos justo cuando el vínculo se vuelve serio.",
    ],
  },
  desorganizado: {
    title: "Tendencia desorganizada (temerosa)",
    body: "Quieres cercanía y la temes a la vez. Te acercas y te retiras, a veces en el mismo día. Suele aparecer cuando la figura de cuidado fue también fuente de miedo. Es el patrón que más se beneficia de terapia con enfoque de trauma.",
    work: [
      "Prioriza la previsibilidad: horarios, acuerdos claros, avisos.",
      "Trabaja el trauma con un profesional; el patrón no se ordena solo con voluntad.",
      "Señala tus estados en tiempo real: «ahora necesito acercarme», «ahora necesito parar».",
    ],
  },
};

// ── Autochequeo de la salud del vínculo ─────────────────────
export type CheckItem = { t: string; area: string };

export const RELATION_CHECK: CheckItem[] = [
  { t: "Mido mis palabras para no provocar una reacción.", area: "Alerta" },
  { t: "Salgo de las conversaciones dudando de mi memoria de lo ocurrido.", area: "Realidad" },
  { t: "Me he alejado de amistades o familia desde que estamos juntos.", area: "Aislamiento" },
  { t: "Cuando pongo un límite, hay castigo: silencio, enfado o amenaza de ruptura.", area: "Límites" },
  { t: "Pido perdón por cosas que no he hecho para acabar el conflicto.", area: "Límites" },
  { t: "Mi economía, mi móvil o mis horarios están bajo control de otra persona.", area: "Control" },
  { t: "Me comparan con otras personas de forma que me deja en peor lugar.", area: "Triangulación" },
  { t: "Escucho promesas de cambio que se repiten sin cambio real.", area: "Ciclo" },
  { t: "Siento que su estabilidad emocional depende de lo que yo haga.", area: "Carga" },
  { t: "He dejado de contar cosas por miedo a cómo se las va a tomar.", area: "Alerta" },
  { t: "Tengo síntomas físicos: insomnio, tensión, estómago, taquicardia.", area: "Cuerpo" },
  { t: "Cuando expreso dolor, la conversación acaba con su dolor en el centro.", area: "Inversión" },
  { t: "Hay sexo, contacto o decisiones que acepto sin desearlos realmente.", area: "Consentimiento" },
  { t: "Me han dicho que soy demasiado sensible, dramático/a o que exagero.", area: "Realidad" },
  { t: "Pienso más en cómo evitar el próximo conflicto que en cómo estoy yo.", area: "Carga" },
];

export const CHECK_TIERS = [
  {
    max: 2,
    title: "Pocas señales activas",
    body: "Lo que marcaste puede ser propio de un mal momento. Aun así, cada casilla marcada merece una conversación honesta, no un archivo mental.",
  },
  {
    max: 5,
    title: "Señales de desgaste",
    body: "Hay un patrón que ya te está costando energía. Es buen momento para poner límites explícitos, recuperar apoyos externos y observar si hay cambio real en unas semanas.",
  },
  {
    max: 9,
    title: "Patrón sostenido de daño",
    body: "Lo que describes va más allá de una mala racha: el vínculo te está desregulando de forma sistemática. Buscar apoyo profesional y una red de confianza no es exagerar.",
  },
  {
    max: 99,
    title: "Riesgo alto",
    body: "El nivel de control, anulación y daño que describes es serio. Habla con alguien de confianza y con un profesional. En España: 016 (violencia de género, no deja rastro), 024 (conducta suicida), 112 emergencias.",
  },
];

export const CRISIS_FIELDS: { id: string; label: string; hint: string }[] = [
  { id: "senales", label: "Mis señales tempranas", hint: "Qué noto en el cuerpo y la cabeza antes de que se desborde (mandíbula tensa, no dormir, dejar de comer, rumiar de noche…)." },
  { id: "disparadores", label: "Mis disparadores", hint: "Situaciones que suelen encender la alarma (silencios largos, discusiones de madrugada, alcohol, fechas concretas…)." },
  { id: "hacer", label: "Lo que sí me funciona", hint: "Acciones concretas, no ideales: ducha fría, salir a la calle, poner una serie tonta, llamar a X…" },
  { id: "evitar", label: "Lo que empeora las cosas", hint: "Lo que ya sé que me hunde: releer conversaciones, beber, escribir a las 3 de la mañana…" },
  { id: "frase", label: "Mi frase de anclaje", hint: "Algo que te diría alguien que te quiere. «Esto ya lo he cruzado antes y pasó»." },
  { id: "personas", label: "A quién puedo escribir", hint: "Dos o tres nombres y cómo contactarles. Acordado con ellos si es posible." },
  { id: "profesional", label: "Mi apoyo profesional", hint: "Terapeuta, médico de cabecera, centro de salud mental, teléfono de referencia." },
  { id: "seguridad", label: "Plan de seguridad", hint: "Qué retiro de mi alcance, dónde voy, a quién aviso si la cosa escala." },
];

export const TOOLKIT_DISCLAIMER =
  "Estas herramientas son de apoyo psicoeducativo y de autoobservación. No son un diagnóstico, no evalúan riesgo clínico y no sustituyen a un profesional. Todo lo que escribes se guarda solo en este dispositivo, en tu navegador; nunca sale de aquí. Si hay riesgo para tu vida: 024 (España), 112 emergencias.";