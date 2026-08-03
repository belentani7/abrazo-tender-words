import type { Translations } from "../types";

type Extras = Required<Pick<Translations, "clinical" | "resources" | "news" | "a11y">> & {
  nav: Pick<Translations["nav"], "clinical" | "resources" | "news">;
};

export const extrasEs: Extras = {
  nav: {
    clinical: "Clínico",
    resources: "Recursos",
    news: "Noticias",
  },
  clinical: {
    title: "Mirada clínica al TLP",
    subtitle: "Lo que dice la evidencia, contado con cuidado",
    intro:
      "Este apartado reúne información clínica para que entiendas mejor lo que ocurre, sin diagnosticar a nadie. Conocer el mapa no sustituye a un profesional, pero ayuda a soltar culpa, a poner palabras y a tomar decisiones más serenas.",
    dsmTitle: "Criterios DSM-5 (resumen humano)",
    dsmIntro:
      "El manual diagnóstico DSM-5 describe nueve rasgos. Para hablar de TLP, suelen aparecer cinco o más, de forma persistente y en varios contextos de la vida.",
    dsmCriteria: [
      { n: "01", title: "Miedo intenso al abandono", desc: "Esfuerzos frenéticos para evitar separaciones reales o imaginarias, incluso ante señales menores." },
      { n: "02", title: "Relaciones inestables e intensas", desc: "Vaivenes entre idealización (eres todo) y devaluación (no vales nada), a veces el mismo día." },
      { n: "03", title: "Identidad inestable", desc: "Imagen de sí mismo cambiante: gustos, valores, planes y roles que se reescriben." },
      { n: "04", title: "Impulsividad dañina", desc: "En al menos dos áreas: gasto, sexo, sustancias, comida, conducción, atracones." },
      { n: "05", title: "Conductas suicidas o autolesivas recurrentes", desc: "Amenazas, gestos o autolesiones que aparecen sobre todo en crisis relacionales." },
      { n: "06", title: "Inestabilidad afectiva", desc: "Episodios intensos de tristeza, ansiedad o irritabilidad que duran horas, rara vez días." },
      { n: "07", title: "Sensación crónica de vacío", desc: "Un hueco interno que el ruido, las personas o las sustancias intentan tapar." },
      { n: "08", title: "Ira inapropiada o difícil de controlar", desc: "Estallidos desproporcionados, sarcasmo amargo, peleas frecuentes." },
      { n: "09", title: "Ideación paranoide o disociación bajo estrés", desc: "Sensación transitoria de que no se puede confiar en nadie o de estar fuera del cuerpo." },
    ],
    dsmNote:
      "Tener algunos de estos rasgos no significa tener TLP. Todas las personas viven, en distintos grados, momentos así. Solo un profesional puede diagnosticar.",
    originTitle: "De dónde viene",
    originIntro: "El TLP no aparece por una sola causa. Es un cruce entre biología, historia y entorno.",
    originPoints: [
      { title: "Genética y temperamento", desc: "Heredabilidad estimada entre 40 % y 60 %. Un sistema nervioso más reactivo desde la infancia." },
      { title: "Neurobiología", desc: "Amígdala más activa ante señales emocionales y corteza prefrontal con menor capacidad reguladora." },
      { title: "Trauma y entorno invalidante", desc: "Hasta un 70 % de los casos refieren experiencias tempranas de abuso, negligencia o invalidación crónica." },
      { title: "Apego inseguro", desc: "Estilos ansioso o desorganizado son más frecuentes; el cuerpo aprendió que el vínculo era impredecible." },
    ],
    diffTitle: "No confundir con…",
    diffIntro: "Hay condiciones que se parecen al TLP pero tienen otra raíz, otro ritmo y otro tratamiento.",
    diffItems: [
      { name: "Trastorno bipolar", desc: "El bipolar muestra episodios de ánimo de días o semanas. El TLP cambia en horas y suele estar gatillado por algo relacional. La manía/hipomanía no aparece en TLP." },
      { name: "TEPT complejo (TEPT-C)", desc: "Comparte heridas de trauma, pero el TEPT-C tiene flashbacks, hipervigilancia y evitación más marcadas. En TLP la inestabilidad de identidad es central." },
      { name: "TDAH", desc: "La impulsividad del TDAH viene del déficit ejecutivo (atención, organización). En TLP viene de la desregulación emocional y del miedo al abandono." },
      { name: "Depresión mayor", desc: "La tristeza en depresión es persistente y poco contextual. En TLP es reactiva, intensa y suele apagarse cuando la relación se siente segura." },
      { name: "Trastorno narcisista", desc: "Comparten la inestabilidad de autoestima, pero el narcisismo defiende una imagen grandiosa; el TLP suele sentirse indigno y vacío." },
      { name: "Espectro autista", desc: "Algunas dificultades sociales se solapan, pero el autismo no implica vaivenes afectivos rápidos ni miedo intenso al abandono." },
    ],
    neuroTitle: "El cerebro detrás de la intensidad",
    neuroIntro:
      "No es 'carácter difícil': es un sistema nervioso que procesa el mundo a otro volumen. Esto no excusa ninguna conducta dañina, pero ayuda a entender por qué ocurre y por qué no se 'decide' simplemente calmarse.",
    neuroPoints: [
      { title: "Alarma encendida", desc: "La amígdala — el centro del miedo — reacciona ante señales sociales neutras como si fueran amenazas. El cerebro del TLP se activa ante la 'rechazo' de una mirada que pasa de largo." },
      { title: "Freno lento", desc: "El córtex prefrontal, que regula y calma, se recluta más tarde y con más esfuerzo. El resultado: actuar impulsivamente cuando la amígdala ya disparó, antes de que el freno conecte." },
      { title: "Rechazo como dolor físico", desc: "Estudios de resonancia muestran que la exclusión social activa en TLP las mismas redes que el dolor físico. Por eso 'se siente' como una herida real, no como un capricho." },
      { title: "Buena noticia: el cerebro cambia", desc: "El tratamiento repetido — sobre todo DBT — refuerza las vías de regulación. Con práctica, el freno conecta antes y la alarma se calibra. La neuroplasticidad está de tu lado." },
    ],
    comorbidTitle: "Cuando conviven otras cosas",
    comorbidIntro:
      "El TLP rara vez llega solo. Saberlo evita sorpresas y explica por qué a veces el proceso parece más lento: no es que no funcione, es que hay varias piezas en juego.",
    comorbidPoints: [
      { title: "Depresión y ansiedad", desc: "Son las compañeras más frecuentes. La tristeza y el miedo del TLP se montan encima de las suyas; se tratan a la vez, no una después de la otra." },
      { title: "TEPT y trauma", desc: "Muchas personas con TLP tienen historias de trauma. El TEPT complejo comparte heridas: flashbacks, hipervigilancia, dificultad para confiar. El tratamiento integra ambas." },
      { title: "Sustancias", desc: "Alcohol y otras sustancias se usan a veces como 'anestesia' para el dolor emocional. Son un intento de regular sin herramientas, y se aborda sin culpa en el tratamiento." },
      { title: "TDAH y bipolaridad", desc: "Cuando coexisten, el diagnóstico cruzado se vuelve complejo. El profesional especializado desenreda qué impulso viene de dónde, porque cada pieza tiene su tratamiento." },
    ],
    improvementTitle: "Señales de que algo mejora",
    improvementIntro:
      "La recuperación no es lineal: hay avances y recaídas. Estas son señales reales de que el tratamiento (o el vínculo) está funcionando, para mirarlas con esperanza y sin medir cada día.",
    improvementList: [
      "Las crisis son menos frecuentes o duran menos: la misma tormenta, olas más bajas.",
      "Aparece una pausa entre el impulso y la acción: primero siente, luego decide.",
      "Puede nombrar lo que siente ('estoy en una ola') en lugar de solo actuarlo.",
      "Pide ayuda o se retira a regularse en vez de atacar: el semáforo funciona.",
      "Pide perdón y repara cuando se ha dañado el vínculo, sin hundirse en la culpa.",
      "Tolera desacuerdos sin que 'no estar de acuerdo' signifique 'no me quieres'.",
      "Recuerda los hechos buenos de la relación incluso en los días malos.",
    ],
    dbtTitle: "Terapia Dialéctica Conductual (DBT)",
    dbtIntro:
      "La DBT, desarrollada por Marsha Linehan, es hoy el tratamiento con más evidencia para el TLP. Trabaja en cuatro módulos prácticos.",
    dbtModules: [
      { name: "Mindfulness", desc: "Observar lo que pasa por dentro sin pelearse con ello.", example: "Notar 'estoy sintiendo rabia' en lugar de actuarla." },
      { name: "Tolerancia al malestar", desc: "Sobrevivir a las crisis sin empeorar la situación.", example: "Técnica TIPP: agua fría en la cara, ejercicio breve, respiración lenta, relajación muscular." },
      { name: "Regulación emocional", desc: "Identificar, nombrar y modular emociones intensas.", example: "Diario emocional: nombre · intensidad 0-10 · qué la disparó · qué la calmó." },
      { name: "Efectividad interpersonal", desc: "Pedir lo que necesitas sin destruir el vínculo ni anularte.", example: "Modelo DEAR MAN: describir, expresar, afirmar, reforzar, mantenerse, parecer seguro/a, negociar." },
    ],
    selfcareTitle: "Autocuidado práctico (para la persona con TLP)",
    selfcareItems: [
      { title: "Plan de seguridad escrito", desc: "Cinco personas a las que escribir, tres lugares calmantes, dos líneas de crisis. En el móvil, accesible en menos de diez segundos." },
      { title: "Mapa de gatillos", desc: "Lista personal de qué desencadena la ola: hora del día, hambre, sueño, ciertas frases, ciertas pantallas." },
      { title: "Caja de regulación", desc: "Objetos físicos que devuelven al cuerpo: hielo, aceite esencial, una manta pesada, una canción ancla." },
      { title: "Higiene de sueño", desc: "Dormir mal multiplica la intensidad emocional. Es tratamiento, no lujo." },
    ],
    familyTitle: "Para familias y personas cercanas",
    familyDo: [
      "Validar la emoción aunque no compartas la conducta: «veo que esto te duele».",
      "Aprender sobre TLP juntos: reduce el «lo hace a propósito».",
      "Cuidarte tú también: el agotamiento del cuidador no ayuda a nadie.",
      "Mantener rutinas estables: la previsibilidad calma el sistema nervioso.",
    ],
    familyDont: [
      "Frases invalidantes: «no es para tanto», «deja de dramatizar».",
      "Amenazar con marcharte en plena crisis: confirma el miedo al abandono.",
      "Asumir su recuperación como tu trabajo: es su proceso, tú acompañas.",
      "Discutir cuando el cuerpo está al 9/10: primero bajar, después hablar.",
    ],
    recoveryTitle: "La recuperación es real",
    recoveryText:
      "Los estudios longitudinales más sólidos (Zanarini, Gunderson) muestran que cerca del 50 % de las personas con TLP dejan de cumplir criterios diagnósticos a los diez años de seguimiento, y muchas más viven con síntomas mucho más manejables. La intensidad emocional, bien acompañada, se vuelve sensibilidad, profundidad y empatía.",
    disclaimer:
      "Este contenido es informativo. No diagnostica, no sustituye a un profesional de salud mental y no debe usarse para etiquetar a nadie.",
  },
  resources: {
    title: "Recursos para pedir ayuda",
    subtitle: "Barcelona, España y el mundo",
    intro:
      "Si en algún momento esto te queda grande, no estás sola/o. Aquí tienes lugares con personas reales esperando una llamada, un correo o una visita.",
    bcnTitle: "Barcelona",
    bcnItems: [
      { name: "Centre LGTBI de Barcelona", desc: "Espacio público con atención psicológica, jurídica y social.", contact: "C/ Comte Borrell 22 · 93 320 27 17 · centrelgtbi@bcn.cat" },
      { name: "Teléfono de la Esperanza Catalunya", desc: "Escucha 24/7 ante crisis emocional y soledad.", contact: "93 414 48 48" },
      { name: "ACAI-TLP", desc: "Asociación catalana de ayuda e investigación del TLP. Grupos para familias y para personas con TLP.", contact: "acaitlp.org" },
      { name: "Sant Pere Claver · Hospital de Día TLP", desc: "Atención especializada en trastornos de personalidad en Barcelona.", contact: "santpereclaver.org" },
    ],
    spainTitle: "España",
    spainItems: [
      { name: "024 · Línea de atención a la conducta suicida", desc: "Atención 24/7, gratuita y confidencial, del Ministerio de Sanidad.", contact: "Marca 024" },
      { name: "Teléfono de la Esperanza", desc: "Escucha emocional en toda España.", contact: "717 003 717" },
      { name: "Teléfono Arcoíris (FELGTBI+)", desc: "Atención específica para personas LGTBI+.", contact: "028" },
      { name: "ACAI-TP", desc: "Federación de asociaciones de TP en España.", contact: "acai-tp.org" },
    ],
    worldTitle: "Mundo",
    worldIntro: "Si lees desde fuera de España, estos son puntos de partida fiables por región.",
    worldItems: [
      { region: "Global", name: "ILGA World", desc: "Federación internacional con directorio de organizaciones por país.", url: "ilga.org" },
      { region: "Global", name: "OMS · Salud mental", desc: "Recursos y guías oficiales de la Organización Mundial de la Salud.", url: "who.int/health-topics/mental-health" },
      { region: "EE. UU. / Canadá", name: "The Trevor Project", desc: "Crisis 24/7 para jóvenes LGBTQ+.", url: "thetrevorproject.org" },
      { region: "EE. UU.", name: "NEABPD", desc: "National Education Alliance for Borderline Personality Disorder.", url: "borderlinepersonalitydisorder.org" },
      { region: "Reino Unido", name: "Mind / Samaritans", desc: "Apoyo emocional y guías clínicas.", url: "mind.org.uk · samaritans.org" },
      { region: "América Latina", name: "ILGALAC", desc: "Coordinadora regional con recursos por país.", url: "ilgalac.org" },
      { region: "Europa", name: "ILGA-Europe", desc: "Mapa de derechos y recursos europeos.", url: "ilga-europe.org" },
      { region: "Asia-Pacífico", name: "APCOM", desc: "Red regional de salud y derechos LGBTI+.", url: "apcom.org" },
      { region: "África", name: "UHAI EASHRI", desc: "Fondo de derechos sexuales y de salud en África Oriental.", url: "uhai-eashri.org" },
    ],
    crisisTitle: "Si ahora mismo estás en crisis",
    crisisText:
      "Si estás pensando en hacerte daño o en quitarte la vida, por favor llama al 024 (España) o a tu línea local de emergencias. No tienes que explicarlo bien. Solo descolgar.",
  },
  news: {
    title: "Noticias y lecturas",
    subtitle: "Actualidad sobre TLP y salud mental, en castellano",
    intro:
      "Una selección automática de titulares recientes sobre trastorno límite de la personalidad, salud mental y vínculos. Se actualiza sola cada seis horas y se guarda en tu dispositivo.",
    refresh: "Actualizar ahora",
    refreshing: "Buscando…",
    lastUpdate: "Última actualización",
    empty: "Aún no hay titulares cargados.",
    error: "No se pudieron cargar las noticias en directo. Mostrando una selección curada.",
    source: "Fuente",
    open: "Leer",
  },
  a11y: {
    title: "Accesibilidad",
    open: "Abrir panel de accesibilidad",
    close: "Cerrar",
    contrast: "Alto contraste",
    fontSize: "Tamaño de texto",
    reduceMotion: "Reducir movimiento",
    skipSensitive: "Atenuar contenido sensible",
    dyslexia: "Tipografía amable (dislexia)",
    reset: "Restablecer",
  },
};
