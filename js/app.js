// ============================================
// MUSEO DIGITAL COCA-COLA - JAVASCRIPT
// Interactividad y Navegación
// ============================================

// Estado de la aplicación
let estadoApp = {
    salaActual: 'menuPrincipal',
    modoPresentacion: false,
    trivia: {
        preguntas: [],
        preguntaActual: 0,
        puntaje: 0,
        respuestas: []
    }
};

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    inicializarApp();
    inicializarTrivia();
    inicializarEventos();
});

// Inicializar aplicación
function inicializarApp() {
    // Mostrar menú principal por defecto
    mostrarSala('menuPrincipal');
    
    // Configurar botones de navegación
    document.querySelectorAll('.sala-card').forEach(card => {
        card.addEventListener('click', function() {
            const salaNum = this.getAttribute('data-sala');
            mostrarSala(`sala${salaNum}`);
        });
    });
}

// Inicializar eventos
function inicializarEventos() {
    // Los botones de presentación y descarga PDF han sido eliminados

    // Eventos de timeline (Sala 2)
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.addEventListener('click', function() {
            const evento = this.getAttribute('data-evento');
            mostrarModalTimeline(evento);
        });
    });

    // Eventos de flujo (Sala 4)
    document.querySelectorAll('.flujo-paso').forEach(paso => {
        paso.addEventListener('click', function() {
            const numero = this.querySelector('.flujo-numero').textContent;
            mostrarDetalleFlujo(parseInt(numero));
        });
    });

    // Animar barras de gráfico al entrar a la sala 6
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animarBarras();
            }
        });
    }, { threshold: 0.5 });

    const sala6 = document.getElementById('sala6');
    if (sala6) {
        observer.observe(sala6);
    }
}

// Navegación entre salas
function mostrarSala(idSala) {
    // Ocultar todas las salas
    document.querySelectorAll('.sala').forEach(sala => {
        sala.classList.remove('activa');
        sala.style.display = 'none';
    });

    // Mostrar sala seleccionada
    const sala = document.getElementById(idSala);
    if (sala) {
        sala.style.display = 'block';
        setTimeout(() => {
            sala.classList.add('activa');
            sala.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 50);
    }

    estadoApp.salaActual = idSala;

    // Si es modo presentación, ajustar scroll
    if (estadoApp.modoPresentacion) {
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
    }
}

function irAMenu() {
    mostrarSala('menuPrincipal');
}

function salaSiguiente(numSala) {
    if (numSala < 9) {
        mostrarSala(`sala${numSala + 1}`);
    } else {
        mostrarSala('recursos');
    }
}

function salaAnterior(numSala) {
    if (numSala > 1) {
        mostrarSala(`sala${numSala - 1}`);
    } else {
        irAMenu();
    }
}

// Funciones de modo presentación y descarga PDF eliminadas según solicitud del usuario

// Dato Curioso (Sala 1)
function mostrarDatoCurioso(num) {
    const contenido = document.getElementById(`curioso${num}`);
    if (contenido) {
        contenido.classList.toggle('mostrar');
    }
}

// Modal Timeline (Sala 2)
function mostrarModalTimeline(evento) {
    const eventos = {
        '1886': {
            titulo: '1886 - Creación de la Fórmula',
            texto: 'El farmacéutico Dr. John Stith Pemberton creó la fórmula original de Coca-Cola en su laboratorio de Atlanta. La bebida fue vendida inicialmente como un tónico medicinal en la farmacia Jacobs de Atlanta por 5 centavos el vaso.'
        },
        '1892': {
            titulo: '1892 - Fundación de la Compañía',
            texto: 'Asa Candler, un empresario visionario, adquirió la fórmula y los derechos de Coca-Cola por $2,300. Fundó The Coca-Cola Company y comenzó la expansión de la marca mediante publicidad y distribución estratégica.'
        },
        '1915': {
            titulo: '1915 - Botella Contour',
            texto: 'Se patentó la icónica botella de vidrio con forma de cintura, diseñada para ser reconocible incluso al tacto. Este diseño se convirtió en uno de los símbolos más reconocidos del mundo.'
        },
        '1941': {
            titulo: '1941 - Expansión Global',
            texto: 'Durante la Segunda Guerra Mundial, Coca-Cola estableció plantas embotelladoras cerca de los frentes de batalla para mantener la moral de las tropas. Esto facilitó la expansión global de la marca a más de 50 países.'
        },
        '1985': {
            titulo: '1985 - New Coke',
            texto: 'La compañía lanzó "New Coke" con un sabor más dulce, pero tras protestas masivas de consumidores leales, se reintrodujo la fórmula original como "Coca-Cola Classic" apenas 79 días después.'
        },
        '2010': {
            titulo: '2010 - Compromiso Sostenible',
            texto: 'Coca-Cola lanzó la iniciativa "World Without Waste" con el objetivo de recolectar y reciclar el equivalente a cada botella o lata que vende para 2030, promoviendo una economía circular.'
        }
    };

    const eventoData = eventos[evento];
    if (eventoData) {
        document.getElementById('modalTimelineTitulo').textContent = eventoData.titulo;
        document.getElementById('modalTimelineTexto').textContent = eventoData.texto;
        document.getElementById('modalTimeline').classList.add('mostrar');
    }
}

function cerrarModal(idModal) {
    document.getElementById(idModal).classList.remove('mostrar');
}

// Cerrar modal al hacer clic fuera
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('mostrar');
    }
});

// Acordeones (Sala 3)
function toggleAcordeon(id) {
    const contenido = document.getElementById(id);
    if (contenido) {
        const estaAbierto = contenido.classList.contains('mostrar');
        
        // Cerrar todos los acordeones del mismo grupo
        document.querySelectorAll('.proceso-contenido').forEach(acc => {
            acc.classList.remove('mostrar');
        });

        // Abrir el seleccionado si estaba cerrado
        if (!estaAbierto) {
            contenido.classList.add('mostrar');
        }
    }
}

// Detalles de Flujo (Sala 4)
function mostrarDetalleFlujo(numero) {
    const detalles = {
        1: {
            titulo: 'Paso 1: Entradas',
            contenido: `
                <p><strong>Descripción:</strong> Recepción y control de calidad de todas las materias primas necesarias para la producción.</p>
                <ul>
                    <li><strong>Agua purificada:</strong> Agua que cumple con estándares internacionales de calidad, sometida a procesos de filtración, ósmosis inversa y esterilización UV.</li>
                    <li><strong>Azúcar refinada:</strong> Azúcar de caña o remolacha que cumple con especificaciones de pureza y granulometría.</li>
                    <li><strong>Concentrado de Coca-Cola:</strong> Fórmula secreta que contiene los sabores y extractos naturales. Se almacena en condiciones controladas de temperatura y humedad.</li>
                    <li><strong>Dioxido de carbono (CO2):</strong> Gas de grado alimentario que proporciona la efervescencia característica de las bebidas gaseosas.</li>
                    <li><strong>Envases:</strong> Botellas PET, botellas de vidrio, latas de aluminio, todos previamente inspeccionados y esterilizados.</li>
                    <li><strong>Etiquetas y tapas:</strong> Materiales de empaque que cumplen con especificaciones de diseño y resistencia.</li>
                </ul>
                <p><strong>Control de Calidad:</strong> Todas las materias primas son sometidas a inspección visual y análisis de laboratorio antes de ser aceptadas para producción.</p>
            `
        },
        2: {
            titulo: 'Paso 2: Procesamiento',
            contenido: `
                <p><strong>Descripción:</strong> Transformación de materias primas en producto terminado mediante procesos automatizados.</p>
                <ul>
                    <li><strong>Mezcla de ingredientes:</strong> Los ingredientes se combinan en tanques de acero inoxidable según fórmulas precisas. El proceso es controlado por sistemas automatizados que garantizan proporciones exactas.</li>
                    <li><strong>Carbonatación:</strong> Inyección de CO2 a presión específica para lograr el nivel de efervescencia característico. La presión y temperatura son monitoreadas constantemente.</li>
                    <li><strong>Filtración:</strong> El líquido pasa por sistemas de filtración de múltiples etapas para eliminar impurezas y garantizar claridad.</li>
                    <li><strong>Envasado automático:</strong> Llenado de envases mediante líneas de alta velocidad que pueden procesar hasta 2,000 botellas por minuto. El proceso incluye llenado, tapado y sellado hermético.</li>
                    <li><strong>Etiquetado:</strong> Aplicación automática de etiquetas con información del producto, fecha de producción y código de lote.</li>
                    <li><strong>Sellado hermético:</strong> Garantiza la integridad del producto y previene contaminación.</li>
                </ul>
                <p><strong>Tiempo de Proceso:</strong> El ciclo completo desde la mezcla hasta el envasado toma aproximadamente 15-20 minutos por lote.</p>
            `
        },
        3: {
            titulo: 'Paso 3: Control de Calidad',
            contenido: `
                <p><strong>Descripción:</strong> Verificación exhaustiva de que el producto cumple con todos los estándares de calidad antes de ser embalado.</p>
                <ul>
                    <li><strong>Inspección visual:</strong> Revisión de cada envase para detectar defectos, contaminación visible o problemas de etiquetado.</li>
                    <li><strong>Pruebas de sabor:</strong> Catas periódicas realizadas por panelistas entrenados para verificar que el sabor cumple con los estándares establecidos.</li>
                    <li><strong>Verificación de presión de gas:</strong> Medición de la presión de CO2 para asegurar el nivel correcto de carbonatación.</li>
                    <li><strong>Análisis microbiológico:</strong> Pruebas de laboratorio para detectar presencia de microorganismos patógenos o contaminantes.</li>
                    <li><strong>Pruebas de hermeticidad:</strong> Verificación de que los envases están correctamente sellados y no presentan fugas.</li>
                    <li><strong>Análisis de pH y contenido de azúcar:</strong> Verificación de parámetros químicos para garantizar consistencia del producto.</li>
                </ul>
                <p><strong>Frecuencia:</strong> Se toman muestras cada 15 minutos durante la producción. Los productos que no cumplen estándares son rechazados automáticamente y no pasan a la siguiente etapa.</p>
                <p><strong>Tasa de Aceptación:</strong> Más del 99.9% de los productos pasan el control de calidad.</p>
            `
        },
        4: {
            titulo: 'Paso 4: Embalaje',
            contenido: `
                <p><strong>Descripción:</strong> Agrupación y protección de productos para su almacenamiento y transporte.</p>
                <ul>
                    <li><strong>Agrupación en cajas:</strong> Los productos se agrupan automáticamente en cajas de cartón reciclado según especificaciones de tamaño y cantidad. Las cajas incluyen información de producto, fecha y código de lote.</li>
                    <li><strong>Paletizado:</strong> Las cajas se organizan en pallets de madera o plástico siguiendo patrones específicos que optimizan el espacio y garantizan estabilidad durante el transporte.</li>
                    <li><strong>Envoltura con plástico retráctil:</strong> Los pallets se envuelven con plástico retráctil para proteger los productos de polvo, humedad y daños durante el manejo.</li>
                    <li><strong>Etiquetado de lotes:</strong> Cada pallet recibe etiquetas con información completa del lote, incluyendo fecha de producción, fecha de vencimiento, y código de trazabilidad.</li>
                    <li><strong>Control de inventario:</strong> Registro automático de cada pallet en el sistema de gestión de inventario para trazabilidad completa.</li>
                </ul>
                <p><strong>Capacidad:</strong> Cada pallet puede contener entre 1,200 y 2,400 unidades dependiendo del tamaño del envase.</p>
                <p><strong>Trazabilidad:</strong> Todos los productos pueden ser rastreados desde la materia prima hasta el punto de venta mediante códigos de lote únicos.</p>
            `
        },
        5: {
            titulo: 'Paso 5: Distribución',
            contenido: `
                <p><strong>Descripción:</strong> Transporte y entrega de productos desde las plantas de producción hasta los puntos de venta.</p>
                <ul>
                    <li><strong>Almacenamiento en centros de distribución:</strong> Los productos se almacenan en centros de distribución estratégicamente ubicados. Estos centros cuentan con sistemas de control de temperatura y humedad cuando es necesario.</li>
                    <li><strong>Carga en camiones refrigerados:</strong> Para productos que requieren refrigeración, se utilizan camiones con sistemas de frío que mantienen la temperatura adecuada durante todo el trayecto.</li>
                    <li><strong>Entrega a puntos de venta:</strong> Los productos se entregan directamente a supermercados, tiendas de conveniencia, restaurantes y otros puntos de venta según rutas optimizadas.</li>
                    <li><strong>Reposición de estantes:</strong> En muchos casos, el personal de Coca-Cola participa en la reposición de estantes para garantizar que los productos estén disponibles y bien presentados.</li>
                    <li><strong>Gestión de inventario en tiempo real:</strong> Sistemas tecnológicos permiten monitorear niveles de inventario en cada punto de venta y programar entregas automáticas cuando los niveles son bajos.</li>
                </ul>
                <p><strong>Frecuencia de Entrega:</strong> En Colombia, Coca-Cola FEMSA realiza más de 1.2 millones de visitas a puntos de venta semanalmente.</p>
                <p><strong>Flota:</strong> Más de 3,000 vehículos de distribución operan en Colombia, incluyendo camiones grandes, vehículos medianos y motocicletas para áreas de difícil acceso.</p>
            `
        },
        6: {
            titulo: 'Paso 6: Salidas',
            contenido: `
                <p><strong>Descripción:</strong> Productos terminados disponibles para consumo en diversos canales de venta.</p>
                <ul>
                    <li><strong>Supermercados e hipermercados:</strong> Representan aproximadamente el 40% de las ventas. Los productos están disponibles en diferentes presentaciones y tamaños.</li>
                    <li><strong>Tiendas de conveniencia:</strong> Representan el 30% de las ventas. Incluyen tiendas pequeñas, minimercados y tiendas de barrio.</li>
                    <li><strong>Restaurantes y food service:</strong> Representan el 15% de las ventas. Incluyen restaurantes, cafeterías, hoteles y servicios de catering.</li>
                    <li><strong>Máquinas expendedoras:</strong> Representan el 10% de las ventas. Máquinas ubicadas en oficinas, universidades, hospitales y espacios públicos.</li>
                    <li><strong>Eventos y estadios:</strong> Presencia en eventos deportivos, conciertos, ferias y otros eventos masivos.</li>
                    <li><strong>Plataformas de delivery:</strong> Ventas a través de aplicaciones móviles y servicios de entrega a domicilio.</li>
                </ul>
                <p><strong>Cobertura:</strong> Coca-Cola está disponible en más de 1.2 millones de puntos de venta en Colombia, garantizando acceso fácil para los consumidores.</p>
                <p><strong>Disponibilidad:</strong> Los productos están disponibles las 24 horas del día en muchos puntos de venta, y se reponen constantemente para garantizar disponibilidad continua.</p>
            `
        }
    };

    const detalle = detalles[numero];
    if (detalle) {
        document.getElementById('modalFlujoTitulo').textContent = detalle.titulo;
        document.getElementById('modalFlujoContenido').innerHTML = detalle.contenido;
        document.getElementById('modalFlujo').classList.add('mostrar');
    }
}

// Mejoras (Sala 4)
function toggleMejora(id) {
    const contenido = document.getElementById(id);
    if (contenido) {
        contenido.classList.toggle('mostrar');
    }
}

// Detalles de Procesos de Talento (Sala 5)
function mostrarDetalleTalento(proceso) {
    const detalles = {
        reclutamiento: {
            titulo: 'Reclutamiento',
            contenido: `
                <p><strong>Descripción:</strong> Búsqueda activa de talento mediante múltiples canales y estrategias para atraer candidatos calificados y diversos.</p>
                <ul>
                    <li><strong>Portales de empleo:</strong> Publicación de vacantes en plataformas como LinkedIn, Indeed, y portales locales. Coca-Cola publica más de 10,000 vacantes anualmente a nivel global.</li>
                    <li><strong>Partnerships con universidades:</strong> Colaboración con más de 200 universidades a nivel mundial para programas de pasantías, prácticas profesionales y reclutamiento de recién graduados. En Colombia, se trabaja con universidades como Los Andes, Nacional, y Javeriana.</li>
                    <li><strong>Redes sociales profesionales:</strong> Uso activo de LinkedIn, Facebook Careers, y otras plataformas para llegar a profesionales pasivos y activos. Se publican contenidos sobre cultura corporativa y oportunidades de carrera.</li>
                    <li><strong>Programas de referidos internos:</strong> Sistema de incentivos para empleados que recomiendan candidatos exitosos. Los empleados que refieren candidatos que son contratados reciben bonos y reconocimiento.</li>
                    <li><strong>Ferias de empleo:</strong> Participación en ferias universitarias, eventos de carrera, y ferias especializadas por industria para conectar directamente con candidatos.</li>
                    <li><strong>Programas de diversidad e inclusión:</strong> Estrategias específicas para atraer talento de grupos subrepresentados, personas con discapacidades, y minorías. Colaboración con organizaciones que promueven diversidad.</li>
                </ul>
                <p><strong>Estrategia:</strong> Coca-Cola utiliza una estrategia de reclutamiento multicanal que combina métodos tradicionales y digitales. Se prioriza la construcción de marca empleadora para atraer talento de alta calidad. El proceso de reclutamiento está alineado con los valores corporativos de integridad, pasión, diversidad e inclusión.</p>
            `
        },
        seleccion: {
            titulo: 'Selección',
            contenido: `
                <p><strong>Descripción:</strong> Proceso riguroso y estructurado para identificar y seleccionar los mejores candidatos que se alineen con las necesidades y cultura de Coca-Cola.</p>
                <ul>
                    <li><strong>Evaluación de CV:</strong> Revisión inicial de currículums mediante sistemas automatizados y revisión manual por reclutadores. Se evalúa experiencia, educación, y logros relevantes.</li>
                    <li><strong>Pruebas técnicas y cognitivas:</strong> Evaluación de habilidades técnicas específicas del puesto y capacidades cognitivas mediante pruebas estandarizadas. Las pruebas varían según el nivel y tipo de posición.</li>
                    <li><strong>Entrevistas telefónicas:</strong> Primera ronda de entrevistas para evaluar comunicación, motivación, y fit inicial. Duración promedio de 30-45 minutos.</li>
                    <li><strong>Entrevistas presenciales:</strong> Entrevistas con múltiples entrevistadores incluyendo el supervisor directo, pares, y miembros del equipo. Se evalúan competencias técnicas y blandas.</li>
                    <li><strong>Assessment Centers:</strong> Para posiciones gerenciales y de liderazgo, se realizan centros de evaluación que incluyen ejercicios de simulación, presentaciones, y trabajo en equipo.</li>
                    <li><strong>Evaluación de valores y fit cultural:</strong> Evaluación de alineación con valores corporativos como integridad, pasión, responsabilidad, y compromiso con la diversidad.</li>
                    <li><strong>Verificación de referencias:</strong> Contacto con referencias profesionales y académicas para validar información y obtener feedback sobre el candidato.</li>
                </ul>
                <p><strong>Duración del proceso:</strong> El proceso completo puede durar de 2 a 8 semanas dependiendo del nivel de la posición. Para posiciones operativas, el proceso es más rápido (2-3 semanas), mientras que para posiciones ejecutivas puede extenderse hasta 8 semanas.</p>
                <p><strong>Prioridades:</strong> Se evalúa no solo la competencia técnica sino también la alineación con valores corporativos, potencial de crecimiento, y capacidad de trabajo en equipo. La diversidad e inclusión son prioridades en todos los niveles.</p>
            `
        },
        formacion: {
            titulo: 'Formación',
            contenido: `
                <p><strong>Descripción:</strong> Inversión continua en el desarrollo y crecimiento profesional de los empleados mediante programas estructurados y oportunidades de aprendizaje.</p>
                <ul>
                    <li><strong>Coca-Cola University:</strong> Plataforma de aprendizaje en línea con más de 5,000 cursos disponibles en múltiples idiomas. Incluye cursos técnicos, de liderazgo, habilidades blandas, idiomas, y certificaciones profesionales.</li>
                    <li><strong>Capacitación técnica:</strong> Programas específicos para desarrollar habilidades técnicas relacionadas con cada función: producción, marketing, finanzas, logística, etc. Incluye certificaciones en tecnologías específicas.</li>
                    <li><strong>Desarrollo de liderazgo:</strong> Programas estructurados para desarrollar habilidades de liderazgo en diferentes niveles: líderes de primera línea, gerentes medios, y ejecutivos. Incluye programas como "Leadership Development Program" y "Executive Coaching".</li>
                    <li><strong>Habilidades blandas:</strong> Capacitación en comunicación, trabajo en equipo, resolución de problemas, pensamiento crítico, y adaptabilidad. Estas habilidades son esenciales para el éxito en cualquier rol.</li>
                    <li><strong>Programas de mentoría:</strong> Sistema de mentoría donde ejecutivos senior guían a empleados junior. Los mentores proporcionan orientación profesional, comparten experiencias, y ayudan en el desarrollo de carrera.</li>
                    <li><strong>Rotaciones de trabajo:</strong> Oportunidades para que empleados trabajen en diferentes departamentos o regiones para desarrollar experiencia amplia y prepararse para roles de mayor responsabilidad.</li>
                    <li><strong>Programas de MBA patrocinados:</strong> Para empleados de alto potencial, Coca-Cola patrocina programas de MBA y otras maestrías. Esto representa una inversión significativa en el desarrollo de futuros líderes.</li>
                    <li><strong>Certificaciones profesionales:</strong> Apoyo para obtener certificaciones relevantes como PMP, Six Sigma, SAP, y otras que son valoradas en la industria.</li>
                </ul>
                <p><strong>Inversión:</strong> Coca-Cola invierte más de $50 millones anuales en programas de desarrollo y capacitación a nivel global. En Colombia, Coca-Cola FEMSA tiene programas específicos de formación técnica para operarios y desarrollo gerencial para líderes.</p>
                <p><strong>Metodología:</strong> Se utiliza una combinación de aprendizaje presencial, en línea, y experiencial. Los programas se adaptan a diferentes estilos de aprendizaje y se actualizan constantemente para reflejar las mejores prácticas y tendencias del mercado.</p>
            `
        },
        evaluacion: {
            titulo: 'Evaluación',
            contenido: `
                <p><strong>Descripción:</strong> Sistema continuo de evaluación de desempeño y desarrollo profesional que permite identificar fortalezas, áreas de mejora, y oportunidades de crecimiento.</p>
                <ul>
                    <li><strong>Evaluaciones formales:</strong> Evaluaciones semestrales y anuales donde se revisa el desempeño del empleado, logro de objetivos, y desarrollo de competencias. Incluye autoevaluación y evaluación del supervisor.</li>
                    <li><strong>Feedback 360°:</strong> Evaluación integral que incluye feedback de supervisores, pares, subordinados, y clientes internos. Esto proporciona una visión completa del desempeño y comportamiento del empleado.</li>
                    <li><strong>Objetivos SMART:</strong> Establecimiento de objetivos específicos, medibles, alcanzables, relevantes y con tiempo definido. Los objetivos se alinean con los objetivos corporativos y se revisan trimestralmente.</li>
                    <li><strong>Planes de Desarrollo Individual (IDP):</strong> Planes personalizados que identifican objetivos de crecimiento, habilidades a desarrollar, y acciones concretas. Los IDP se actualizan trimestralmente y se revisan en las evaluaciones formales.</li>
                    <li><strong>Feedback continuo:</strong> Además de las evaluaciones formales, se promueve el feedback continuo entre supervisores y empleados. Esto permite ajustes oportunos y desarrollo constante.</li>
                    <li><strong>Reconocimiento y recompensas:</strong> Sistema de reconocimiento que incluye programas como "Living Our Values Awards" para empleados que demuestran valores corporativos, bonos por desempeño excepcional, promociones, y reconocimiento público en eventos corporativos.</li>
                    <li><strong>Calificaciones de desempeño:</strong> Sistema de calificación que identifica empleados de alto desempeño, desempeño sólido, y aquellos que necesitan desarrollo. Esto informa decisiones sobre promociones, aumentos salariales, y planes de desarrollo.</li>
                </ul>
                <p><strong>Proceso:</strong> El sistema de evaluación es continuo y basado en objetivos claros. Se realizan evaluaciones formales semestrales y anuales, pero el feedback es constante. El proceso incluye autoevaluación, evaluación del supervisor, feedback 360° de pares y subordinados, y revisión de objetivos SMART.</p>
                <p><strong>Resultados:</strong> Los resultados de las evaluaciones se utilizan para identificar empleados de alto potencial, planificar sucesiones, diseñar programas de desarrollo, y tomar decisiones sobre compensación y promociones.</p>
            `
        },
        bienestar: {
            titulo: 'Bienestar',
            contenido: `
                <p><strong>Descripción:</strong> Programas integrales que promueven el bienestar físico, mental, emocional y financiero de los empleados y sus familias.</p>
                <ul>
                    <li><strong>Seguro médico completo:</strong> Cobertura médica integral para empleados y sus familias que incluye consultas, hospitalización, medicamentos, y servicios especializados. En Colombia, se trabaja con las mejores aseguradoras del país.</li>
                    <li><strong>Programas de salud preventiva:</strong> Campañas de vacunación, chequeos médicos anuales, programas de detección temprana de enfermedades, y educación en salud. Se promueve la prevención como estrategia principal.</li>
                    <li><strong>Gimnasios en oficinas:</strong> Instalaciones de gimnasio en oficinas principales con equipos modernos y clases grupales de yoga, pilates, y fitness. Acceso gratuito para todos los empleados.</li>
                    <li><strong>Clases de yoga y meditación:</strong> Programas regulares de yoga y meditación para reducir estrés, mejorar flexibilidad, y promover bienestar mental. Se ofrecen durante horarios laborales.</li>
                    <li><strong>Programas de nutrición:</strong> Educación nutricional, consultas con nutricionistas, y opciones saludables en cafeterías. Se promueve una alimentación balanceada y saludable.</li>
                    <li><strong>Apoyo psicológico:</strong> Líneas de ayuda 24/7 para apoyo psicológico y emocional. Acceso a psicólogos y consejeros para manejo de estrés, ansiedad, y otros temas de salud mental.</li>
                    <li><strong>Horarios flexibles:</strong> Opciones de horarios flexibles y trabajo remoto cuando es posible. Esto permite a los empleados balancear mejor sus responsabilidades personales y profesionales.</li>
                    <li><strong>Días de descanso adicionales:</strong> Días adicionales de vacaciones, días personales, y días de cumpleaños libres. Se reconoce la importancia del descanso y tiempo personal.</li>
                    <li><strong>Planes de pensiones:</strong> Programas de ahorro para el retiro con contribuciones de la empresa. Esto proporciona seguridad financiera a largo plazo.</li>
                    <li><strong>Seguros de vida:</strong> Cobertura de seguro de vida para empleados y sus familias, proporcionando protección financiera en caso de fallecimiento.</li>
                    <li><strong>Programas de ahorro:</strong> Planes de ahorro con beneficios fiscales y contribuciones de la empresa. Ayuda a los empleados a alcanzar metas financieras.</li>
                    <li><strong>Descuentos en productos:</strong> Descuentos significativos en productos Coca-Cola y de otras marcas del portafolio para empleados y sus familias.</li>
                </ul>
                <p><strong>En Colombia:</strong> Coca-Cola FEMSA tiene programas específicos de bienestar que incluyen atención médica preventiva, programas de actividad física, apoyo para el cuidado de familiares, y programas de recreación y esparcimiento. Se organizan eventos deportivos, actividades familiares, y programas de voluntariado que fortalecen el sentido de comunidad.</p>
                <p><strong>Filosofía:</strong> El bienestar integral reconoce que los empleados son más productivos y comprometidos cuando están saludables física, mental y financieramente. Los programas de bienestar son una inversión en el capital humano de la organización.</p>
            `
        }
    };

    const detalle = detalles[proceso];
    if (detalle) {
        document.getElementById('modalTalentoTitulo').textContent = detalle.titulo;
        document.getElementById('modalTalentoContenido').innerHTML = detalle.contenido;
        document.getElementById('modalTalento').classList.add('mostrar');
    }
}

// Mostrar Rol de Colaborador (Sala 5)
function mostrarRol(tipo) {
    const rolContenido = document.getElementById('rolGerente');
    if (rolContenido) {
        rolContenido.classList.toggle('mostrar');
    }
}

// 4P Marketing (Sala 7)
function mostrarDetalle4P(tipo) {
    const detalles = document.querySelectorAll('.p-detalle');
    detalles.forEach(det => {
        if (det.id === tipo) {
            det.classList.toggle('mostrar');
        } else {
            det.classList.remove('mostrar');
        }
    });
}

// Carrusel de Campañas (Sala 7)
let indiceCampana = 0;

function cambiarCampana(direccion) {
    const slides = document.querySelectorAll('.campana-slide');
    if (slides.length === 0) return;

    slides[indiceCampana].classList.remove('activa');

    indiceCampana += direccion;

    if (indiceCampana < 0) {
        indiceCampana = slides.length - 1;
    } else if (indiceCampana >= slides.length) {
        indiceCampana = 0;
    }

    slides[indiceCampana].classList.add('activa');
}

// Tecnologías (Sala 8)
function mostrarTecnologia(id) {
    const detalles = document.querySelectorAll('.tecnologia-detalle');
    detalles.forEach(det => {
        if (det.id === id) {
            det.classList.toggle('mostrar');
        } else {
            det.classList.remove('mostrar');
        }
    });
}

// Animar Barras de Gráfico (Sala 6)
function animarBarras() {
    const barras = document.querySelectorAll('.barra-fill');
    barras.forEach(barra => {
        const width = barra.style.width;
        barra.style.width = '0%';
        setTimeout(() => {
            barra.style.width = width;
        }, 100);
    });
}

// ============================================
// TRIVIA - Sistema Completo
// ============================================

function inicializarTrivia() {
    estadoApp.trivia.preguntas = [
        {
            pregunta: '¿En qué año fue fundada The Coca-Cola Company?',
            opciones: ['1886', '1892', '1900', '1915'],
            correcta: 1,
            explicacion: 'The Coca-Cola Company fue fundada oficialmente en 1892 por Asa Candler, aunque la fórmula fue creada en 1886.'
        },
        {
            pregunta: '¿Cuál es el proceso administrativo que incluye la definición de objetivos y estrategias?',
            opciones: ['Organización', 'Planeación', 'Dirección', 'Control'],
            correcta: 1,
            explicacion: 'La Planeación es la función administrativa que establece objetivos, estrategias y planes para alcanzar las metas organizacionales.'
        },
        {
            pregunta: '¿Qué porcentaje aproximado del mercado global de refrescos tiene Coca-Cola?',
            opciones: ['25%', '35%', '42%', '50%'],
            correcta: 2,
            explicacion: 'Coca-Cola tiene aproximadamente el 42% del mercado global de refrescos, siendo la marca líder mundial.'
        },
        {
            pregunta: '¿Cuál es uno de los principales desafíos del Talento Humano en Coca-Cola?',
            opciones: ['Falta de personal', 'Rotación de personal', 'Sobrecarga de trabajo', 'Falta de tecnología'],
            correcta: 1,
            explicacion: 'La rotación de personal, especialmente en roles operativos, es uno de los principales desafíos que enfrenta la gestión de talento humano.'
        },
        {
            pregunta: '¿Qué herramienta tecnológica utiliza Coca-Cola para gestión financiera y contable?',
            opciones: ['Excel', 'ERP SAP', 'QuickBooks', 'Oracle'],
            correcta: 1,
            explicacion: 'Coca-Cola utiliza el sistema ERP SAP para gestión financiera integrada, contabilidad y control de costos.'
        },
        {
            pregunta: '¿Cuál fue una de las campañas más exitosas de Coca-Cola que personalizó botellas con nombres?',
            opciones: ['Taste the Feeling', 'Share a Coke', 'Open Happiness', 'Life Tastes Good'],
            correcta: 1,
            explicacion: '"Share a Coke" fue una campaña global que personalizó botellas con nombres propios, generando conexión emocional y viralidad.'
        },
        {
            pregunta: '¿Cuál es uno de los Objetivos de Desarrollo Sostenible (ODS) que Coca-Cola apoya?',
            opciones: ['ODS 6: Agua Limpia', 'ODS 1: Fin de la Pobreza', 'ODS 4: Educación', 'ODS 16: Paz'],
            correcta: 0,
            explicacion: 'Coca-Cola apoya el ODS 6 (Agua Limpia y Saneamiento) con su compromiso de devolver el 100% del agua utilizada.'
        },
        {
            pregunta: '¿Qué tecnología permite a Coca-Cola predecir la demanda y optimizar inventarios?',
            opciones: ['Blockchain', 'Inteligencia Artificial', 'Realidad Virtual', 'Criptomonedas'],
            correcta: 1,
            explicacion: 'La Inteligencia Artificial permite a Coca-Cola predecir demanda, optimizar rutas de distribución y personalizar marketing.'
        },
        {
            pregunta: '¿Cuál es el margen de utilidad neta aproximado de Coca-Cola?',
            opciones: ['15%', '22%', '30%', '35%'],
            correcta: 1,
            explicacion: 'Coca-Cola tiene un margen de utilidad neta de aproximadamente 22%, reflejando su eficiencia operativa.'
        },
        {
            pregunta: '¿En qué ciudad se encuentra la sede principal de The Coca-Cola Company?',
            opciones: ['Nueva York', 'Los Ángeles', 'Atlanta', 'Chicago'],
            correcta: 2,
            explicacion: 'La sede principal de The Coca-Cola Company se encuentra en Atlanta, Georgia, Estados Unidos.'
        }
    ];

    estadoApp.trivia.preguntaActual = 0;
    estadoApp.trivia.puntaje = 0;
    estadoApp.trivia.respuestas = [];

    mostrarPreguntaTrivia();
}

function mostrarPreguntaTrivia() {
    const trivia = estadoApp.trivia;
    const pregunta = trivia.preguntas[trivia.preguntaActual];

    if (!pregunta) {
        mostrarResultadoTrivia();
        return;
    }

    // Actualizar indicadores
    document.getElementById('preguntaActual').textContent = trivia.preguntaActual + 1;
    document.getElementById('totalPreguntas').textContent = trivia.preguntas.length;
    document.getElementById('puntajeActual').textContent = trivia.puntaje;

    // Actualizar barra de progreso
    const progreso = ((trivia.preguntaActual + 1) / trivia.preguntas.length) * 100;
    document.getElementById('triviaBarFill').style.width = progreso + '%';

    // Mostrar pregunta
    const preguntaElement = document.getElementById('triviaPregunta');
    preguntaElement.innerHTML = `<h3>${pregunta.pregunta}</h3>`;

    // Mostrar opciones
    const opcionesElement = document.getElementById('triviaOpciones');
    opcionesElement.innerHTML = '';

    pregunta.opciones.forEach((opcion, index) => {
        const boton = document.createElement('button');
        boton.className = 'opcion-btn';
        boton.textContent = `${String.fromCharCode(65 + index)}. ${opcion}`;
        boton.onclick = () => seleccionarRespuesta(index);
        opcionesElement.appendChild(boton);
    });

    // Ocultar botones de control
    document.getElementById('btnSiguientePregunta').style.display = 'none';
    document.getElementById('btnReiniciar').style.display = 'none';
    document.getElementById('triviaFeedback').classList.remove('mostrar', 'correcta', 'incorrecta');
    document.getElementById('triviaResultado').style.display = 'none';
}

function seleccionarRespuesta(indice) {
    const trivia = estadoApp.trivia;
    const pregunta = trivia.preguntas[trivia.preguntaActual];
    const opciones = document.querySelectorAll('.opcion-btn');
    const feedback = document.getElementById('triviaFeedback');

    // Deshabilitar todos los botones
    opciones.forEach(btn => {
        btn.classList.add('deshabilitada');
        btn.disabled = true;
    });

    // Marcar respuesta correcta e incorrecta
    if (indice === pregunta.correcta) {
        opciones[indice].classList.add('correcta');
        trivia.puntaje++;
        feedback.textContent = `¡Correcto! ${pregunta.explicacion}`;
        feedback.className = 'trivia-feedback mostrar correcta';
    } else {
        opciones[indice].classList.add('incorrecta');
        opciones[pregunta.correcta].classList.add('correcta');
        feedback.textContent = `Incorrecto. La respuesta correcta es: ${pregunta.opciones[pregunta.correcta]}. ${pregunta.explicacion}`;
        feedback.className = 'trivia-feedback mostrar incorrecta';
    }

    // Guardar respuesta
    trivia.respuestas.push({
        pregunta: trivia.preguntaActual,
        seleccionada: indice,
        correcta: indice === pregunta.correcta
    });

    // Mostrar botón siguiente o finalizar
    setTimeout(() => {
        if (trivia.preguntaActual < trivia.preguntas.length - 1) {
            document.getElementById('btnSiguientePregunta').style.display = 'inline-block';
        } else {
            document.getElementById('btnReiniciar').style.display = 'inline-block';
        }
    }, 1500);
}

function siguientePregunta() {
    estadoApp.trivia.preguntaActual++;
    mostrarPreguntaTrivia();
}

function reiniciarTrivia() {
    estadoApp.trivia.preguntaActual = 0;
    estadoApp.trivia.puntaje = 0;
    estadoApp.trivia.respuestas = [];
    mostrarPreguntaTrivia();
}

function mostrarResultadoTrivia() {
    const trivia = estadoApp.trivia;
    const porcentaje = (trivia.puntaje / trivia.preguntas.length) * 100;

    document.getElementById('puntajeFinal').textContent = trivia.puntaje;
    document.getElementById('triviaResultado').style.display = 'block';

    let mensaje = '';
    if (porcentaje >= 90) {
        mensaje = '¡Excelente! Eres un verdadero experto en Coca-Cola. 🏆';
    } else if (porcentaje >= 70) {
        mensaje = '¡Muy bien! Tienes un buen conocimiento sobre la empresa. 👍';
    } else if (porcentaje >= 50) {
        mensaje = 'Buen intento. Sigue aprendiendo sobre Coca-Cola.';
    } else {
        mensaje = 'No te desanimes. Revisa el museo nuevamente para mejorar. 💪';
    }

    document.getElementById('resultadoMensaje').textContent = mensaje;

    // Ocultar pregunta y opciones
    document.getElementById('triviaPregunta').innerHTML = '';
    document.getElementById('triviaOpciones').innerHTML = '';
    document.getElementById('triviaFeedback').classList.remove('mostrar');
    document.getElementById('btnSiguientePregunta').style.display = 'none';
}

// Smooth scroll para navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Botón flotante siempre visible
window.addEventListener('scroll', function() {
    const btnFlotante = document.getElementById('btnVolverArriba');
    if (btnFlotante) {
        btnFlotante.style.display = 'flex';
    }
});

// Inicializar primera sala visible
setTimeout(() => {
    mostrarSala('menuPrincipal');
}, 100);

