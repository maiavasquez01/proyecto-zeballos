// NEXO Q - Gestión & Procesos
// Menú, sección activa, deslizador, Ampliar/Cerrar, comparador, encuesta y formulario.

const ANCHO_ESCRITORIO = 1025;

document.addEventListener('DOMContentLoaded', function(){
    iniciarMenu();
    marcarSeccionActiva();
    iniciarDeslizadores();
    iniciarAmpliar();
    iniciarModelos();
    iniciarNosotros();
    iniciarEstandares();
    iniciarHerramientas();
    iniciarComparador();
    iniciarEncuesta();
    iniciarFormulario();
});

/* ---------- Menú hamburguesa (pantallas móviles) ---------- */
function iniciarMenu(){
    const boton = document.getElementById('hamburger-btn');
    const lista = document.getElementById('nav-links');
    const anchoMaximo = 1024;

    if(!boton || !lista){
        return;
    }

    function abrir(abierto){
        lista.classList.toggle('active', abierto);
        document.body.classList.toggle('menu-open', abierto);
        boton.setAttribute('aria-expanded', String(abierto));
        boton.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
    }

    boton.setAttribute('aria-expanded', 'false');
    boton.setAttribute('aria-controls', 'nav-links');

    boton.addEventListener('click', function(){
        abrir(!lista.classList.contains('active'));
    });

    lista.querySelectorAll('a').forEach(function(enlace){
        enlace.addEventListener('click', function(e){
            const movil = window.innerWidth <= anchoMaximo;
            const sinAnimacion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            const destino = enlace.getAttribute('href');

            if(!movil || sinAnimacion || destino === '#' || enlace.closest('.menu-social')){
                abrir(false);
                return;
            }

            // Las demás pastillas se desvanecen y la elegida sube al lugar del título
            e.preventDefault();
            const item = enlace.closest('li');
            const primero = lista.querySelector('li');
            const subir = primero.getBoundingClientRect().top - item.getBoundingClientRect().top;
            lista.classList.add('eligiendo');
            item.classList.add('elegida');
            item.style.transform = 'translateY(' + subir + 'px)';
            setTimeout(function(){
                window.location.href = destino;
            }, 420);
        });
    });

    document.addEventListener('keydown', function(e){
        if(e.key === 'Escape'){
            abrir(false);
        }
    });

    window.addEventListener('resize', function(){
        if(window.innerWidth > anchoMaximo){
            abrir(false);
        }
    });
}

/* ---------- Resalta la sección en la que está el usuario ---------- */
function marcarSeccionActiva(){
    const actual = location.pathname.split('/').pop() || 'index.html';

    document.querySelectorAll('.nav-links a').forEach(function(enlace){
        const destino = enlace.getAttribute('href');
        if(destino === actual){
            enlace.classList.add('active');
            enlace.setAttribute('aria-current', 'page');
        }
    });
}

/* ---------- Deslizador ventajas / desventajas ---------- */
function iniciarDeslizadores(){
    document.querySelectorAll('[data-slider]').forEach(function(caja){
        const control = caja.querySelector('input[type="range"]');

        function mover(){
            caja.style.setProperty('--p', control.value + '%');
        }

        control.addEventListener('input', mover);
        mover();
    });
}

/* ---------- Botones Ampliar / Cerrar en Metodologías ---------- */
function iniciarAmpliar(){
    document.querySelectorAll('.metodologia').forEach(function(seccion){
        const boton = seccion.querySelector('.btn-ampliar');

        if(!boton){
            return;
        }

        boton.addEventListener('click', function(){
            const ampliado = seccion.classList.toggle('ampliado');
            boton.textContent = ampliado ? 'Cerrar' : 'Ampliar';
            boton.setAttribute('aria-expanded', String(ampliado));
            if(ampliado){
                seccion.querySelector('figure').scrollIntoView({behavior:'smooth', block:'center'});
            }
        });
    });
}

/* ---------- Gestión de Calidad: estándares ISO (escritorio) ---------- */
const DATOS_ISO = {
    '9126': {
        titulo: 'ISO 9126',
        intro: 'Fue un modelo para evaluar la calidad del producto de software. Define 6 características.',
        items: [
            ['Funcionalidad', 'Hace lo que tiene que hacer.', false],
            ['Fiabilidad', 'Funciona sin fallar.', false],
            ['Usabilidad', 'Es fácil de aprender y de usar.', false],
            ['Eficiencia', 'Usa bien el tiempo y los recursos.', false],
            ['Mantenibilidad', 'Es fácil de corregir y modificar.', false],
            ['Portabilidad', 'Se puede llevar a otro entorno.', false]
        ]
    },
    '25000': {
        titulo: 'ISO/IEC 25000 (SQuaRE)',
        intro: 'Es la familia de normas que reemplazó a la ISO 9126. Su modelo de calidad tiene 8 características: dos son nuevas.',
        items: [
            ['Adecuación funcional', 'Hace lo que tiene que hacer.', false],
            ['Eficiencia de desempeño', 'Rinde bien según los recursos que usa.', false],
            ['Compatibilidad', 'Convive con otros sistemas.', true],
            ['Usabilidad', 'Es fácil de aprender y de usar.', false],
            ['Fiabilidad', 'Funciona sin fallar.', false],
            ['Seguridad', 'Protege la información y los accesos.', true],
            ['Mantenibilidad', 'Es fácil de corregir y modificar.', false],
            ['Portabilidad', 'Se puede llevar a otro entorno.', false]
        ]
    }
};

function iniciarEstandares(){
    const botones = document.querySelectorAll('.btn-iso');
    const detalle = document.getElementById('iso-detalle');

    if(botones.length === 0 || !detalle){
        return;
    }

    function mostrar(id){
        const estandar = DATOS_ISO[id];
        let html = '<h4 class="iso-nombre">' + estandar.titulo + '</h4><p class="iso-intro">' + estandar.intro + '</p><div class="iso-grilla">';

        estandar.items.forEach(function(item){
            const etiqueta = item[2] ? '<span class="etiqueta-nueva">Nueva</span>' : '';

            html += '<article class="iso-item"><h4>' + item[0] + '</h4><p>' + item[1] + '</p>' + etiqueta + '</article>';
        });
        html += '</div>';
        detalle.innerHTML = html;
    }

    botones.forEach(function(boton){
        boton.addEventListener('click', function(){
            botones.forEach(function(otro){
                otro.setAttribute('aria-pressed', String(otro === boton));
            });
            mostrar(boton.getAttribute('data-iso'));
        });
    });
}

/* ---------- Sobre Nosotros: fotos y vista previa del menú ---------- */
const TEXTO_PREVIA_NOSOTROS = 'Conocé al equipo de Nexo Q y qué nos motiva. Somos el equipo detrás de NEXO Q, un proyecto que armamos para la materia Sistemas de Gestión de Calidad. Nuestra propuesta es explicar de forma simple cómo se organizan los procesos y las metodologías de trabajo en el desarrollo de software. Somos dos: una Scrum Master y diseñadora, y una programadora y tester. Trabajamos aplicando lo que mostramos en la página: dividimos las tareas en sprints, nos ayudamos entre nosotras y probamos todo antes de publicarlo. Queremos que aprender sobre calidad y gestión sea fácil para cualquiera.';

function iniciarNosotros(){
    document.querySelectorAll('.avatar img').forEach(function(foto){
        if(foto.complete && foto.naturalWidth === 0){
            foto.remove();
            return;
        }
        foto.addEventListener('error', function(){
            foto.remove();
        });
    });

    const enlace = document.querySelector('.nav-links a[href="nosotros.html"]');

    if(!enlace || enlace.getAttribute('aria-current') === 'page'){
        return;
    }

    const previa = document.createElement('div');
    previa.className = 'previa-nosotros';
    previa.setAttribute('aria-hidden', 'true');
    previa.innerHTML = '<p>' + TEXTO_PREVIA_NOSOTROS + '</p>';
    document.body.appendChild(previa);

    function mostrar(){
        if(window.innerWidth >= ANCHO_ESCRITORIO){
            previa.classList.add('visible');
        }
    }

    function ocultar(){
        previa.classList.remove('visible');
    }

    enlace.addEventListener('mouseenter', mostrar);
    enlace.addEventListener('mouseleave', ocultar);
    enlace.addEventListener('focus', mostrar);
    enlace.addEventListener('blur', ocultar);
}

/* ---------- Modelos tradicionales (Procesos) ---------- */
const DATOS_MODELOS = {
    'cascada': {
        nombre: 'Cascada',
        texto: 'Se trabaja en fases, una tras otra: requisitos, análisis, diseño, codificación, pruebas e implementación. Una fase empieza cuando termina la anterior.',
        ventajas: ['Resultados predecibles', 'Se planifican tareas, presupuesto y plazos desde el inicio', 'Sirve en entornos estables'],
        desventajas: ['Necesita la descripción completa del producto desde el inicio', 'No se adapta bien a requisitos que cambian', 'Tiene problemas en industrias que evolucionan rápido'],
        cuando: 'Cuando los requisitos están claros y no van a cambiar, y se busca cumplir plazo y costo acordados.',
        figura: 'img/cascada.png',
        pie: 'Las fases van una detrás de otra: no se empieza una hasta terminar la anterior.'
    },
    'modelo-v': {
        nombre: 'Modelo en V',
        texto: 'Es parecido a la cascada, pero cada fase de desarrollo tiene su fase de pruebas. Se baja desde los requisitos hasta el código y se sube probando cada nivel.',
        ventajas: ['Las pruebas se piensan desde el inicio', 'Cada fase se controla con su prueba', 'Es fácil de seguir'],
        desventajas: ['Es rígido ante cambios', 'No hay producto funcionando hasta el final', 'Corregir errores tarde sale caro'],
        cuando: 'Cuando los requisitos son claros y la calidad es muy importante, por ejemplo en sistemas críticos.',
        figura: 'img/modelo-v.png',
        pie: 'Cada fase de desarrollo (izquierda) tiene su prueba (derecha) que la controla.'
    },
    'iterativo': {
        nombre: 'Iterativo e Incremental',
        texto: 'El producto se desarrolla por partes. En cada vuelta (iteración) se entrega un incremento: una parte que ya se puede usar, revisar y evaluar.',
        ventajas: ['Se puede probar una parte del producto desde temprano', 'Se descubren errores y malentendidos a tiempo', 'Permite ajustar sobre la marcha'],
        desventajas: ['Al inicio no se conoce la descripción completa', 'El cliente tiene que acompañar al equipo', 'El costo y el alcance final son más difíciles de prever'],
        cuando: 'Cuando los requisitos cambian o no están claros, y el cliente necesita empezar a usar el producto cuanto antes.',
        figura: 'img/iterativo.png',
        pie: 'En cada iteración el producto suma una parte nueva que ya se puede usar y evaluar.'
    }
};

function iniciarModelos(){
    const selector = document.getElementById('modelos-selector');
    const panel = document.getElementById('modelo-panel');
    const titulo = document.querySelector('.content-section .page-pill');

    if(!selector || !panel){
        return;
    }

    function lista(items){
        let html = '';
        items.forEach(function(item){
            html += '<li>' + item + '</li>';
        });
        return html;
    }

    function cerrar(){
        panel.hidden = true;
        panel.innerHTML = '';
        selector.hidden = false;
    }

    function abrir(id){
        const modelo = DATOS_MODELOS[id];
        let html = '<button type="button" class="modelo-volver" id="modelo-volver">&larr; Modelos</button>';
        html += '<h3 class="modelo-nombre">' + modelo.nombre + '</h3>';
        html += '<p class="modelo-texto">' + modelo.texto + '</p>';
        html += '<figure class="modelo-figura" id="modelo-figura"><img src="' + modelo.figura + '" alt="Diagrama del ' + modelo.nombre + '">';
        html += '<figcaption>' + modelo.pie + '</figcaption></figure>';
        html += '<button type="button" class="btn-ampliar-modelo" id="btn-ampliar-modelo" aria-expanded="false">Ampliar</button>';
        html += '<table class="tabla-vd"><thead><tr><th class="si"><span>Ventajas</span></th><th class="no"><span>Desventajas</span></th></tr></thead><tbody>';
        modelo.ventajas.forEach(function(ventaja, i){
            html += '<tr><td>' + ventaja + '</td><td>' + modelo.desventajas[i] + '</td></tr>';
        });
        html += '</tbody></table>';
        html += '<button type="button" class="btn-cuando" id="btn-cuando" aria-expanded="false">¿Cuándo usarlo?</button>';
        html += '<p class="modelo-cuando" id="modelo-cuando" hidden>' + modelo.cuando + '</p>';
        panel.innerHTML = html;
        selector.hidden = true;
        panel.hidden = false;
        window.scrollTo({top: 0, behavior: 'smooth'});

        document.getElementById('modelo-volver').addEventListener('click', cerrar);

        const cuando = document.getElementById('modelo-cuando');
        document.getElementById('btn-cuando').addEventListener('click', function(e){
            cuando.hidden = !cuando.hidden;
            e.currentTarget.setAttribute('aria-expanded', String(!cuando.hidden));
        });

        const ampliar = document.getElementById('btn-ampliar-modelo');
        if(ampliar){
            ampliar.addEventListener('click', function(){
                const figura = document.getElementById('modelo-figura');
                const grande = figura.classList.toggle('ampliada');
                ampliar.textContent = grande ? 'Cerrar' : 'Ampliar';
                ampliar.setAttribute('aria-expanded', String(grande));
            });
        }
    }

    selector.querySelectorAll('.btn-modelo').forEach(function(boton){
        boton.addEventListener('click', function(){
            abrir(boton.getAttribute('data-modelo'));
        });
    });

    if(titulo){
        titulo.addEventListener('click', function(){
            if(!panel.hidden){
                cerrar();
            }
        });
    }
}

/* ---------- Recursos: Comparador y Encuesta ---------- */
function iniciarHerramientas(){
    const seccion = document.querySelector('.content-section');
    const paneles = document.querySelectorAll('.panel-herramienta');
    const titulo = seccion ? seccion.querySelector('.page-pill') : null;

    if(!seccion || paneles.length === 0){
        return;
    }

    function cerrarTodo(){
        paneles.forEach(function(panel){
            panel.classList.remove('visible');
        });
        seccion.classList.remove('herramienta-abierta');
        document.querySelectorAll('.btn-herramienta').forEach(function(boton){
            boton.setAttribute('aria-expanded', 'false');
        });
        titulo.removeAttribute('tabindex');
        titulo.removeAttribute('role');
    }

    function abrirPanel(id){
        cerrarTodo();
        const panel = document.getElementById(id);
        panel.classList.add('visible');
        seccion.classList.add('herramienta-abierta');
        document.querySelectorAll('[data-abre="' + id + '"].btn-herramienta').forEach(function(boton){
            boton.setAttribute('aria-expanded', 'true');
        });
        // El título queda en el borde derecho: al tocarlo se vuelve atrás
        titulo.setAttribute('tabindex', '0');
        titulo.setAttribute('role', 'button');
        titulo.setAttribute('aria-label', 'Volver a Recursos y Aprendizaje');
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    document.querySelectorAll('[data-abre]').forEach(function(boton){
        boton.addEventListener('click', function(){
            abrirPanel(boton.getAttribute('data-abre'));
        });
    });

    titulo.addEventListener('click', function(){
        if(seccion.classList.contains('herramienta-abierta')){
            cerrarTodo();
        }
    });

    titulo.addEventListener('keydown', function(e){
        if(e.key === 'Enter' && seccion.classList.contains('herramienta-abierta')){
            cerrarTodo();
        }
    });
}

/* ---------- Comparador de metodologías ---------- */
const DATOS_METODOLOGIAS = {
    scrum: {
        nombre: 'Scrum',
        filas: [
            'Marco de trabajo agil',
            'Sprints de duracion fija',
            'Propietario del producto, Scrum Master y equipo',
            'Equipo autogestionado',
            'SI',
            'NO',
            'Entornos cambiantes y de innovacion'
        ]
    },
    cascada: {
        nombre: 'Cascada',
        filas: [
            'Ciclo secuencial',
            'Una fase tras otra',
            '6 fases: de requisitos a implementacion',
            'Gestor del proyecto',
            'NO',
            'SI',
            'Entornos estables'
        ]
    },
    kanban: {
        nombre: 'Kanban',
        filas: [
            'Metodo visual de flujo continuo',
            'Tareas que pasan por un tablero, sin sprints',
            'Tablero con columnas y limite de trabajo en curso',
            'Equipo autogestionado',
            'SI',
            'NO',
            'Soporte y tareas que llegan todo el tiempo'
        ]
    },
    xp: {
        nombre: 'XP',
        filas: [
            'Metodologia agil',
            'Ciclos cortos con pruebas constantes',
            'Entregas pequenas y feedback del cliente',
            'Equipo chico y tecnico',
            'SI',
            'NO',
            'Equipos chicos con foco en la calidad del codigo'
        ]
    },
    'modelo-v': {
        nombre: 'Modelo en V',
        filas: [
            'Ciclo secuencial con pruebas',
            'Una fase tras otra, cada una con su prueba',
            'Fases de desarrollo y fases de prueba en paralelo',
            'Gestor del proyecto',
            'NO',
            'SI',
            'Proyectos criticos con requisitos estables'
        ]
    },
    iterativo: {
        nombre: 'Iterativo',
        filas: [
            'Ciclo por partes',
            'Vueltas (iteraciones) que entregan un incremento',
            'Producto que crece en cada iteracion',
            'Equipo y cliente',
            'SI',
            'NO',
            'Cuando conviene probar una parte temprano'
        ]
    }
};

const ETIQUETAS_COMPARADOR = [
    'Tipo',
    'Como avanza',
    'Estructura',
    'Quien lidera',
    'Acepta cambios?',
    'Planifica todo al inicio?',
    'IDEAL para:'
];

/* Comparador de seis metodologías (escritorio) - datos de comparador_us18_seis_metodologias */
const COMPARADOR_SEIS = [
    {id: 'scrum', nombre: 'Scrum', textos: ['Marco de trabajo ágil', 'Sprints de duración fija', 'Un incremento por sprint'], si: [true, false], ideal: 'Entornos cambiantes y de innovación'},
    {id: 'kanban', nombre: 'Kanban', textos: ['Técnica visual ágil', 'Flujo continuo, sin sprints', 'A medida que se terminan las tareas'], si: [true, false], ideal: 'Ver el estado y detectar cuellos de botella'},
    {id: 'xp', nombre: 'XP', textos: ['Metodología ágil', 'Ciclos cortos', 'Entregas pequeñas y frecuentes'], si: [true, false], ideal: 'Software que cambia y necesita calidad'},
    {id: 'cascada', nombre: 'Cascada', textos: ['Ciclo secuencial', 'Una fase tras otra', 'Al final del proyecto'], si: [false, true], ideal: 'Entornos estables'},
    {id: 'modelo-v', nombre: 'Modelo en V', textos: ['Ciclo secuencial con pruebas', 'Una fase tras otra, cada una con su prueba', 'Al final del proyecto'], si: [false, true], ideal: 'Sistemas críticos con calidad muy alta'},
    {id: 'iterativo', nombre: 'Iterativo', textos: ['Ciclo por iteraciones', 'Iteraciones de tiempo fijo', 'Un incremento por iteración'], si: [true, false], ideal: 'Requisitos que cambian o no están claros'}
];

const FILAS_COMPARADOR_SEIS = [
    {etiqueta: 'Tipo', origen: 'textos', pos: 0},
    {etiqueta: 'Cómo avanza', origen: 'textos', pos: 1},
    {etiqueta: 'Entregas', origen: 'textos', pos: 2},
    {etiqueta: 'Acepta cambios', origen: 'si', pos: 0},
    {etiqueta: 'Planifica todo al inicio', origen: 'si', pos: 1},
    {etiqueta: 'Ideal para', origen: 'ideal', pos: 0}
];

function tablaSeisMetodologias(elegidas){
    const activas = COMPARADOR_SEIS.filter(function(metodologia){
        return elegidas.indexOf(metodologia.id) !== -1;
    });
    let html = '<thead><tr><th class="esquina"></th>';

    activas.forEach(function(metodologia){
        html += '<th scope="col">' + metodologia.nombre + '</th>';
    });
    html += '</tr></thead><tbody>';

    FILAS_COMPARADOR_SEIS.forEach(function(fila){
        html += '<tr><th scope="row">' + fila.etiqueta + '</th>';
        activas.forEach(function(metodologia){
            const valor = fila.origen === 'ideal' ? metodologia.ideal : metodologia[fila.origen][fila.pos];
            if(typeof valor === 'boolean'){
                html += valor ? '<td><span class="si">&#10003; Sí</span></td>' : '<td><span class="no">&#10007; No</span></td>';
            }else{
                html += '<td>' + valor + '</td>';
            }
        });
        html += '</tr>';
    });
    html += '</tbody>';
    return html;
}

function iniciarComparador(){
    const contenedor = document.getElementById('chips-comparador');
    const envoltorio = document.getElementById('tabla-comparador-wrap');
    const tabla = document.getElementById('tabla-comparador');
    const aviso = document.getElementById('aviso-comparador');

    if(!contenedor || !tabla){
        return;
    }

    function dibujar(){
        const elegidas = [];
        contenedor.querySelectorAll('.chip[aria-pressed="true"]').forEach(function(chip){
            elegidas.push(chip.getAttribute('data-id'));
        });

        const escritorio = window.innerWidth >= ANCHO_ESCRITORIO;

        tabla.classList.toggle('tabla-seis', escritorio);

        if(elegidas.length < 2){
            envoltorio.classList.add('hidden');
            tabla.innerHTML = '';
            aviso.textContent = escritorio ? 'Elegí 2 o más para comparar' : 'Elegi 2 o mas para comparar!';
            return;
        }

        aviso.textContent = 'Comparando ' + elegidas.length + ' metodologias';

        if(escritorio){
            tabla.innerHTML = tablaSeisMetodologias(elegidas);
            envoltorio.classList.remove('hidden');
            return;
        }

        let html = '<thead><tr><th></th>';
        elegidas.forEach(function(id){
            html += '<th scope="col">' + DATOS_METODOLOGIAS[id].nombre + '</th>';
        });
        html += '</tr></thead><tbody>';

        ETIQUETAS_COMPARADOR.forEach(function(etiqueta, i){
            html += '<tr><th scope="row">' + etiqueta.replace('Como avanza', 'Como avanza') + '</th>';
            elegidas.forEach(function(id){
                html += '<td>' + DATOS_METODOLOGIAS[id].filas[i] + '</td>';
            });
            html += '</tr>';
        });
        html += '</tbody>';

        tabla.innerHTML = html;
        envoltorio.classList.remove('hidden');
    }

    contenedor.querySelectorAll('.chip').forEach(function(chip){
        chip.addEventListener('click', function(){
            const activo = chip.getAttribute('aria-pressed') === 'true';
            chip.setAttribute('aria-pressed', String(!activo));
            dibujar();
        });
    });
}

/* ---------- Encuesta de preferencias metodológicas ---------- */
const PREGUNTAS_ENCUESTA = [
    {
        texto: '¿Que tan claros estan los requisitos desde el inicio?',
        opciones: [
            {texto: 'Claros y no van a cambiar', puntos: {cascada: 2}},
            {texto: 'Algunos pueden cambiar', puntos: {scrum: 1, kanban: 1}},
            {texto: 'Cambian seguido', puntos: {scrum: 2, xp: 1}}
        ]
    },
    {
        texto: '¿Como queres entregar el trabajo?',
        soloEscritorio: true,
        opciones: [
            {texto: 'Todo junto al final', puntos: {cascada: 2, 'modelo-v': 1}},
            {texto: 'Por partes, en ciclos de duracion fija', puntos: {scrum: 2, iterativo: 1}},
            {texto: 'Tarea por tarea, a medida que se termina', puntos: {kanban: 2}},
            {texto: 'Entregas muy pequeñas y frecuentes', puntos: {xp: 2, iterativo: 1}}
        ]
    },
    {
        texto: '¿Como es tu equipo de trabajo?',
        opciones: [
            {texto: 'Grande, con roles fijos', puntos: {cascada: 2}},
            {texto: 'De 3 a 9 personas', puntos: {scrum: 2}},
            {texto: 'Chico y muy tecnico', puntos: {xp: 2}}
        ]
    },
    {
        texto: '¿Cada cuanto necesitas mostrar avances?',
        opciones: [
            {texto: 'Una sola entrega al final', puntos: {cascada: 2}},
            {texto: 'Cada 1 a 4 semanas', puntos: {scrum: 2}},
            {texto: 'Todo el tiempo, sin fechas fijas', puntos: {kanban: 2, xp: 1}}
        ]
    },
    {
        texto: '¿Que tan presente esta el cliente?',
        opciones: [
            {texto: 'Solo al inicio y al final', puntos: {cascada: 2}},
            {texto: 'Participa en cada ciclo', puntos: {scrum: 1, xp: 2}},
            {texto: 'Pide tareas cuando las necesita', puntos: {kanban: 2}}
        ]
    },
    {
        texto: '¿Que es lo que mas te importa?',
        opciones: [
            {texto: 'Seguir un plan y documentar todo', puntos: {cascada: 2}},
            {texto: 'Ver el trabajo y evitar cuellos de botella', puntos: {kanban: 2}},
            {texto: 'Entregar valor rapido y adaptarme', puntos: {scrum: 2}},
            {texto: 'La calidad tecnica del codigo', puntos: {xp: 2}}
        ]
    }
];

const NOMBRES_RESULTADO = {
    scrum: 'Scrum',
    kanban: 'Kanban',
    xp: 'XP',
    cascada: 'Cascada',
    'modelo-v': 'Modelo en V',
    iterativo: 'Iterativo'
};

const DESCRIPCION_RESULTADO = {
    scrum: 'Trabajo por sprints con equipos autogestionados: ideal si los requisitos cambian y querés entregar valor seguido.',
    kanban: 'Flujo continuo con un tablero visual: ideal si las tareas llegan todo el tiempo y querés detectar cuellos de botella.',
    xp: 'Ciclos cortos, pruebas constantes y feedback del cliente: ideal para equipos chicos con foco en la calidad técnica.',
    cascada: 'Fases secuenciales con plan completo al inicio: ideal si los requisitos son estables y están bien definidos.',
    'modelo-v': 'Como cascada, pero con una prueba para cada fase: ideal si la calidad es crítica y los requisitos son estables.',
    iterativo: 'Producto que crece por partes en cada vuelta: ideal si querés probar algo temprano y ajustar sobre la marcha.'
};

function iniciarEncuesta(){
    const zona = document.getElementById('encuesta-contenido');

    if(!zona){
        return;
    }

    const esEscritorio = window.innerWidth >= ANCHO_ESCRITORIO;
    const PREGUNTAS = PREGUNTAS_ENCUESTA.filter(function(pregunta){
        return esEscritorio || !pregunta.soloEscritorio;
    });
    let indice = 0;
    const respuestas = [];

    function mostrarPregunta(){
        const pregunta = PREGUNTAS[indice];
        const total = PREGUNTAS.length;
        let html = '<p class="encuesta-contador">Pregunta ' + (indice + 1) + ' de ' + total + '</p>';
        html += '<div class="encuesta-progreso" aria-hidden="true"><span style="width:' + Math.round(indice / total * 100) + '%"></span></div>';
        html += '<form class="encuesta" id="form-encuesta">';
        html += '<p class="encuesta-pregunta">' + pregunta.texto + '</p>';
        html += '<div class="encuesta-opciones">';
        pregunta.opciones.forEach(function(opcion, i){
            const marcada = respuestas[indice] === i ? ' checked' : '';
            html += '<label><input type="radio" name="opcion" value="' + i + '"' + marcada + '> ' + opcion.texto + '</label>';
        });
        html += '</div><div class="encuesta-botones">';
        html += '<button type="button" class="btn-atras" id="btn-atras"' + (indice === 0 ? ' disabled' : '') + '>Atrás</button>';
        html += '<button type="submit" class="btn-enviar"' + (respuestas[indice] === undefined ? ' disabled' : '') + '>';
        html += indice === total - 1 ? 'Enviar' : 'Siguiente';
        html += '</button></div></form>';
        zona.innerHTML = html;

        const form = document.getElementById('form-encuesta');
        const enviar = form.querySelector('.btn-enviar');

        document.getElementById('btn-atras').addEventListener('click', function(){
            if(indice > 0){
                indice--;
                mostrarPregunta();
            }
        });

        form.addEventListener('change', function(e){
            respuestas[indice] = Number(e.target.value);
            enviar.disabled = false;
        });

        form.addEventListener('submit', function(e){
            e.preventDefault();
            if(respuestas[indice] === undefined){
                return;
            }
            if(indice < total - 1){
                indice++;
                mostrarPregunta();
            }else{
                mostrarResultado();
            }
        });
    }

    function mostrarResultado(){
        const puntaje = {scrum: 0, kanban: 0, xp: 0, cascada: 0, 'modelo-v': 0, iterativo: 0};
        PREGUNTAS.forEach(function(pregunta, i){
            const puntos = pregunta.opciones[respuestas[i]].puntos;
            Object.keys(puntos).forEach(function(clave){
                puntaje[clave] += puntos[clave];
            });
        });

        const claves = esEscritorio ? Object.keys(puntaje) : ['scrum', 'kanban', 'xp', 'cascada'];
        const suma = claves.reduce(function(acum, clave){
            return acum + puntaje[clave];
        }, 0);
        let ganadora = claves[0];
        claves.forEach(function(clave){
            if(puntaje[clave] > puntaje[ganadora]){
                ganadora = clave;
            }
        });

        let html = '<div class="encuesta resultado-encuesta">';
        html += '<p class="encuesta-pregunta">Tu metodologia ideal</p>';
        html += '<p class="ganadora">' + NOMBRES_RESULTADO[ganadora] + '</p>';
        html += '<p>' + DESCRIPCION_RESULTADO[ganadora] + '</p><br>';
        claves.forEach(function(clave){
            const porcentaje = suma === 0 ? 0 : Math.round(puntaje[clave] / suma * 100);
            html += '<div class="barra-fila"><span>' + NOMBRES_RESULTADO[clave] + '</span>';
            html += '<div class="barra"><span style="width:' + porcentaje + '%"></span></div>';
            html += '<span>' + porcentaje + '%</span></div>';
        });
        html += '<br><button type="button" class="btn-enviar" id="reiniciar-encuesta">Repetir encuesta</button></div>';
        zona.innerHTML = html;

        document.getElementById('reiniciar-encuesta').addEventListener('click', function(){
            indice = 0;
            respuestas.length = 0;
            mostrarPregunta();
        });
    }

    mostrarPregunta();
}

/* ---------- Formulario de contacto (demo local) ---------- */
function iniciarFormulario(){
    const form = document.getElementById('contact-form');

    if(!form){
        return;
    }

    form.addEventListener('submit', function(e){
        e.preventDefault();
        const mensaje = document.createElement('p');
        mensaje.textContent = '¡Gracias! Tu consulta fue registrada (demo local, no se envía a ningún servidor).';
        mensaje.style.fontWeight = 'bold';
        form.replaceWith(mensaje);
    });
}
