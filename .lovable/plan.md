## Visión general

Vamos a ampliar ABRAZO con una **segunda capa discreta** dentro de la misma web — no una página separada, sino un "umbral" que aparece de forma sutil al final de la sección de TLP, con aviso claro de cambio de tono. Se llamará **"EL OTRO LADO · Manual de supervivencia relacional"** (nombre provisional, ajustable).

El principio rector: **no mezclar conceptos**. Primero validamos profundamente el dolor de las personas con TLP (víctimas también de su propio sistema nervioso). Después, con un guiño explícito, abrimos una sección distinta para cuando el TLP (u otros perfiles) se combinan con intención compensatoria, tríada oscura, o dinámicas de abuso.

## Estructura nueva

### Capa 1 — ABRAZO (existente, se refuerza)
Añadimos una sección nueva antes del umbral:
- **`tlpDolor`** — "El dolor de quien vive con TLP"
  - Validación profunda: víctimas de su propio sistema nervioso
  - Sentirse frágil, vacío, indigno de amor
  - El autosabotaje como sensación de control
  - Recordar: la regla es que no hay regla, cada persona es única

### Umbral (nuevo componente)
- **`threshold`** — Tarjeta discreta al final del flujo principal
  - Aviso: "Lo que sigue es otra conversación. Solo entra si la necesitas."
  - Explica por qué el autor (desde su experiencia empírica, sin acceso al cuadro clínico de su persona favorita) decidió separar estos contenidos
  - Botón "Cruzar el umbral" → revela Capa 2

### Capa 2 — EL OTRO LADO (nueva, oculta hasta activar)
Cambio visual sutil (tono más frío, tipografía mono más presente, mismo sistema de diseño). Secciones:

1. **`darkIntro`** — Cuando el dolor se vuelve daño
   - El caso particular: TLP + identificación con figuras de poder maligno
   - Sombra no trabajada, envidia, impulsos no regulados
   - Aclaración: caso único, no generalizable

2. **`spectrum`** — Más allá de un solo diagnóstico
   - Breve y respetuoso: narcisismo, antisocial, psicopatía, esquizoide, Cluster A/B/C, Asperger, autismo
   - Recordatorio: solo profesionales con experiencia diagnostican
   - Cómo se ven en dinámicas de pareja, amistad, colega, vecino

3. **`darkTriad`** — Tríada oscura y perfiles manipuladores
   - Narcisismo, maquiavelismo, psicopatía
   - Señales en relación

4. **`tactics`** — Tácticas de manipulación (diccionario)
   - Gaslighting, DARVO, Love Bombing, Triangulación, Hoovering, Chemrape (coerción química)
   - Cada una: definición, ejemplo, contramedida

5. **`attachment`** — Estilos de apego y combinaciones
   - Seguro, ansioso, evitativo, desorganizado
   - Las 16 combinaciones principales y cómo se viven

6. **`profiles`** — Perfiles según contexto
   - Hombres hetero, hombres gay, mujeres hetero, mujeres queer
   - Por qué a veces el más victimista es quien daña
   - "El patrón es que no hay patrón"

7. **`redFlags`** — Si te sientes confundido, anulado, inseguro, hipervigilante
   - No estás en una relación sana
   - Checklist amplio

8. **`faqRelational`** — Dudas frecuentes en relaciones
   - Bloque amplio (~30-50 preguntas, no 500 — sería ilegible; lo decimos honestamente)
   - "¿Es normal que…?" agrupadas por tema

9. **`protocol`** — Protocolo de acción
   - Observación silenciosa → Límites absolutos → Silencio asertivo → Reconstrucción soberana

10. **`darkClosing`** — Cierre
    - Recordatorio: cada persona es única, no encasillar
    - Recursos de ayuda

## Detalles técnicos

- **i18n**: extender `Translations` en `src/i18n/types.ts` con dos bloques nuevos (`tlpDolor` y `darkSide` con todas sus subsecciones). Traducir a `es`, `en`, `pt`, `ca`.
- **Estado del umbral**: hook simple en `Index.tsx` con `useState` (`crossed: boolean`). Persistir en `localStorage` para que no haya que volver a cruzar.
- **Navegación**: el menú principal NO muestra Capa 2 hasta cruzar. Una vez cruzado, aparece un separador discreto y los nuevos enlaces.
- **Diseño**: misma base (Glassmorphism 2.0, negro absoluto) pero Capa 2 usa acento más frío (azul profundo `hsl(220 80% 55%)` en lugar del rojo láser) para diferenciar tono sin romper sistema. Todo vía tokens en `index.css`.
- **Componentes nuevos**:
  - `src/components/Threshold.tsx` — la tarjeta de cruce
  - Reutilizar tarjetas existentes para el resto
- **Animaciones**: `useScrollReveal` ya existente.
- **Accesibilidad**: aviso de contenido sensible antes de Capa 2.

## Lo que NO haremos (para ser honestos)

- **No 500 preguntas** — sería ruido. Haremos ~40-50 bien curadas. Si quieres más después, las añadimos por bloques.
- **No diagnosticar** — todo el lenguaje será descriptivo y educativo, con disclaimers claros.
- **No nombres ni detalles** — respetamos la indicación previa de no mencionar a Thiago.

## Orden de ejecución

1. Extender tipos i18n (`types.ts`)
2. Escribir contenido en español (`es.ts`) — completo
3. Traducir a en/pt/ca
4. Añadir tokens de color "frío" en `index.css`
5. Crear componente `Threshold` y estado de cruce
6. Renderizar Capa 2 condicionalmente en `Index.tsx`
7. Verificar build y navegación en los 4 idiomas
8. Publicar
