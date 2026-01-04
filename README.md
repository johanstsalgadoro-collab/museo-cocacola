# 🏛️ Museo Digital Coca-Cola

## Descripción

Museo Digital Interactivo sobre The Coca-Cola Company y Coca-Cola FEMSA, diseñado como una presentación web interactiva estilo museo moderno. Incluye 8 salas temáticas más una sala de Trivia, con navegación fluida, animaciones y contenido educativo completo.

## 📁 Estructura del Proyecto

```
museo-coca-cola/
├── index.html          # Página principal con todas las salas
├── css/
│   └── styles.css      # Estilos del museo (diseño moderno, responsivo)
├── js/
│   └── app.js          # Lógica de interactividad y navegación
├── assets/
│   ├── img/            # Imágenes de las salas (placeholders)
│   └── icons/          # Íconos SVG o PNG
└── README.md           # Este archivo
```

## 🚀 Cómo Ejecutar

### Método 1: Abrir Directamente
1. Navega a la carpeta `museo-coca-cola`
2. Haz doble clic en `index.html`
3. El museo se abrirá en tu navegador predeterminado

### Método 2: Servidor Local (Recomendado)
Si prefieres usar un servidor local:

**Con Python:**
```bash
cd museo-coca-cola
python -m http.server 8000
```
Luego abre: `http://localhost:8000`

**Con Node.js (http-server):**
```bash
npx http-server museo-coca-cola -p 8000
```

**Con PHP:**
```bash
cd museo-coca-cola
php -S localhost:8000
```

## ✏️ Cómo Editar el Contenido

### Editar Información del Equipo (Sala 1)
Abre `index.html` y busca la sección con clase `equipo-grid`:

```html
<div class="integrante-card">
    <h4>Integrante 1</h4>
    <p class="ficha">Ficha: [Editar aquí]</p>
</div>
```

Reemplaza `[Editar aquí]` con la información real.

### Editar Textos de las Salas
Cada sala está dentro de una sección con `id="salaX"`. Busca el contenido dentro de los elementos `.exhibicion-panel` y modifica los textos según necesites.

### Agregar Imágenes
1. Coloca tus imágenes en la carpeta `assets/img/`
2. Actualiza las rutas en `index.html`:

```html
<img src="assets/img/tu-imagen.jpg" alt="Descripción">
```

### Modificar Colores
Edita las variables CSS en `css/styles.css`:

```css
:root {
    --color-coca-cola: #E41C23;
    --color-negro: #0A0A0A;
    /* ... más colores ... */
}
```

### Agregar Más Preguntas a la Trivia
En `js/app.js`, busca el array `estadoApp.trivia.preguntas` y agrega nuevos objetos:

```javascript
{
    pregunta: 'Tu pregunta aquí?',
    opciones: ['Opción A', 'Opción B', 'Opción C', 'Opción D'],
    correcta: 0, // Índice de la respuesta correcta (0-3)
    explicacion: 'Explicación de la respuesta correcta.'
}
```

## 🎨 Características

### Navegación
- **Menú Principal**: Mapa del museo con acceso rápido a todas las salas
- **Botones de Navegación**: Anterior / Siguiente en cada sala
- **Indicadores de Progreso**: Muestra "Sala X de 9"
- **Botón Flotante**: Volver al menú desde cualquier punto

### Interactividad
- **Modo Presentación**: Oculta el scroll y muestra cada sala en pantalla completa
- **Acordeones**: Contenido desplegable en Sala 3 (Proceso Administrativo)
- **Tarjetas Volteables**: Efecto 3D en Sala 5 (Talento Humano)
- **Modales**: Información detallada en Timeline (Sala 2)
- **Carrusel**: Navegación de campañas en Sala 7 (Marketing)
- **Trivia Interactiva**: 10 preguntas con puntaje y retroalimentación

### Diseño
- **Responsive**: Adaptado para desktop, tablet y móvil
- **Animaciones**: Transiciones suaves entre salas y elementos
- **Tema Oscuro**: Estética de museo moderno
- **Efectos Neón**: Luces y sombras tipo museo digital

## 📋 Salas del Museo

1. **Sala de Impacto** - Introducción y equipo de trabajo
2. **ADN Corporativo** - Historia y clasificación empresarial
3. **Proceso Administrativo** - Las 4 funciones administrativas
4. **Producción / Servicio** - Flujo productivo y mejoras
5. **Talento Humano** - Gestión de personas y desafíos
6. **Finanzas** - Estructura financiera e indicadores
7. **Cliente y Marketing** - Segmentación y campañas
8. **Innovación y Futuro** - Tecnologías y ODS
9. **Trivia** - Preguntas interactivas sobre el museo

## 🖼️ Imágenes Sugeridas

### Sala 1 - Impacto
- `sala1-producto-insignia.jpg` - Botella o lata de Coca-Cola
- Palabras clave: "Coca-Cola bottle iconic", "Coca-Cola product display"

### Sala 2 - ADN Corporativo
- `sala2-historia.jpg` - Fotos históricas de Coca-Cola
- Palabras clave: "Coca-Cola history timeline", "Coca-Cola vintage ads"

### Sala 3 - Proceso Administrativo
- `sala3-proceso.jpg` - Diagramas de procesos administrativos
- Palabras clave: "business management process", "organizational structure"

### Sala 4 - Producción
- `sala4-fabrica.jpg` - Planta de producción
- Palabras clave: "Coca-Cola factory production line", "bottling plant"

### Sala 5 - Talento Humano
- `sala5-equipo.jpg` - Equipos de trabajo diversos
- Palabras clave: "diverse team workplace", "corporate culture"

### Sala 6 - Finanzas
- `sala6-finanzas.jpg` - Gráficos y datos financieros
- Palabras clave: "financial charts graphs", "business analytics dashboard"

### Sala 7 - Marketing
- `sala7-campanas.jpg` - Campañas publicitarias
- Palabras clave: "Coca-Cola advertising campaigns", "Share a Coke campaign"

### Sala 8 - Innovación
- `sala8-tecnologia.jpg` - Tecnología y futuro
- Palabras clave: "artificial intelligence technology", "digital transformation"

## 📚 Fuentes APA Incluidas

El museo incluye 6 fuentes APA confiables en la sección de Recursos:

1. The Coca-Cola Company. (2023). Annual Report 2023
2. FEMSA. (2023). Informe Anual 2023
3. Pendergrast, M. (2013). For God, Country, and Coca-Cola
4. Keller, K. L. (2013). Strategic Brand Management
5. United Nations. (2023). Sustainable Development Goals Report 2023
6. Statista. (2024). Coca-Cola Company - Statistics & Facts

## 💡 Frases Impactantes (Sala 1)

El museo incluye una frase impactante por defecto. Aquí hay 3 alternativas adicionales:

1. **"Desde una farmacia en Atlanta hasta más de 200 países. Una historia de innovación, pasión y compromiso que ha refrescado al mundo durante más de 135 años."**

2. **"Más de 700,000 empleados en todo el mundo trabajan cada día para llevar momentos de felicidad a millones de personas, una botella a la vez."**

3. **"La marca más valiosa del mundo en el sector de bebidas, con un valor estimado de más de $80 mil millones de dólares. Un legado construido con excelencia operativa y conexión emocional."**

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica
- **CSS3**: Estilos modernos con variables, animaciones y diseño responsivo
- **JavaScript Vanilla**: Interactividad sin dependencias externas
- **Google Fonts**: Tipografías Montserrat y Playfair Display

## 📝 Notas Importantes

- El proyecto funciona completamente sin frameworks ni librerías externas
- No requiere servidor, pero se recomienda para mejor rendimiento
- Compatible con navegadores modernos (Chrome, Firefox, Safari, Edge)
- Las imágenes son placeholders - reemplázalas con imágenes reales
- La función "Descargar PDF" es demostrativa (requiere librería adicional para implementar)

## 🎯 Funcionalidades Extra

- ✅ Modo Presentación (pantalla completa)
- ✅ Botón "Descargar Guía PDF" (simulado)
- ✅ Panel de Fuentes APA
- ✅ Sugerencias de imágenes por sala
- ✅ Navegación tipo presentación
- ✅ Indicadores de progreso
- ✅ Trivia interactiva con puntaje

## 📞 Soporte

Para editar o personalizar el museo:
1. Revisa los comentarios en el código
2. Cada sección está claramente identificada
3. Los estilos están organizados por salas
4. Las funciones JavaScript están documentadas

## 📄 Licencia

Este proyecto es educativo y está diseñado para uso académico. El contenido sobre Coca-Cola es informativo y basado en fuentes públicas.

---

**¡Disfruta explorando el Museo Digital Coca-Cola!** 🥤✨

