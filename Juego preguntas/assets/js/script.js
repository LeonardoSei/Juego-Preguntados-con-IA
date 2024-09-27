// Elementos del DOM
const ruleta = document.getElementById('ruleta');
const girarBtn = document.getElementById('girarBtn');
const preguntaContainer = document.getElementById('preguntaContainer');
const categoriaDisplay = document.getElementById('categoriaDisplay');
const preguntaDisplay = document.getElementById('preguntaDisplay');
const respuestasContainer = document.getElementById('respuestasContainer');
const resultadoContainer = document.getElementById('resultadoContainer');
const resultadoDisplay = document.getElementById('resultadoDisplay');
// Inicializar conteos
let respuestasCorrectas = 0;
let respuestasIncorrectas = 0;

// Preguntas por categoría
const preguntasPorCategoria = {
        "Inteligencia Artificial": [
            { pregunta: "¿Qué es una red neuronal?", respuestas: ["Un modelo matemático inspirado en el cerebro", "Una red de computadoras", "Un tipo de software de oficina", "Un protocolo de internet"], correcta: "Un modelo matemático inspirado en el cerebro" },
            { pregunta: "¿Cuál es el principal lenguaje de programación utilizado en el aprendizaje automático?", respuestas: ["C++", "Java", "Python", "Ruby"], correcta: "Python" },
            { pregunta: "¿Qué significa el término 'Machine Learning'?", respuestas: ["Aprendizaje automático", "Aprendizaje supervisado", "Redes neuronales", "Procesamiento de lenguaje natural"], correcta: "Aprendizaje automático" },
            { pregunta: "¿Cuál es un uso común de la inteligencia artificial?", respuestas: ["Juegos de mesa", "Reconocimiento facial", "Escritura de novelas", "Fotografía"], correcta: "Reconocimiento facial" },
            { pregunta: "¿Qué algoritmo se utiliza comúnmente para la clasificación?", respuestas: ["K-means", "Algoritmo de Dijkstra", "Regresión logística", "Redes neuronales"], correcta: "Regresión logística" }
        ],
        "Desarrollo de Software": [
            { pregunta: "¿Qué es un repositorio en el contexto de Git?", respuestas: ["Un lugar para almacenar proyectos de software", "Una base de datos", "Un servidor web", "Un lenguaje de programación"], correcta: "Un lugar para almacenar proyectos de software" },
            { pregunta: "¿Cuál es el propósito del control de versiones?", respuestas: ["Gestionar cambios en el código fuente", "Almacenar datos de clientes", "Crear aplicaciones móviles", "Diseñar interfaces gráficas"], correcta: "Gestionar cambios en el código fuente" },
            { pregunta: "¿Qué significa el término 'API'?", respuestas: ["Interfaz de programación de aplicaciones", "Aplicación para la interfaz", "Integración de datos", "Algoritmo de programación internacional"], correcta: "Interfaz de programación de aplicaciones" },
            { pregunta: "¿Qué es un framework en desarrollo web?", respuestas: ["Una estructura básica para construir aplicaciones", "Un tipo de base de datos", "Un sistema operativo", "Un lenguaje de programación"], correcta: "Una estructura básica para construir aplicaciones" },
            { pregunta: "¿Qué es la programación orientada a objetos?", respuestas: ["Un paradigma de programación basado en objetos", "Un enfoque de diseño web", "Un lenguaje de programación", "Un tipo de algoritmo"], correcta: "Un paradigma de programación basado en objetos" }
        ],
        "Ciberseguridad": [
            { pregunta: "¿Qué es un firewall?", respuestas: ["Un sistema de seguridad que controla el tráfico de red", "Una aplicación de chat", "Un tipo de virus informático", "Un lenguaje de programación"], correcta: "Un sistema de seguridad que controla el tráfico de red" },
            { pregunta: "¿Qué significa 'phishing'?", respuestas: ["Suplantación de identidad para robar información", "Un tipo de malware", "Un software antivirus", "Un protocolo de seguridad"], correcta: "Suplantación de identidad para robar información" },
            { pregunta: "¿Qué es un virus informático?", respuestas: ["Un software dañino que se replica", "Un tipo de hardware", "Un sistema operativo", "Una aplicación de mensajería"], correcta: "Un software dañino que se replica" },
            { pregunta: "¿Cuál es la función de un antivirus?", respuestas: ["Proteger el sistema contra malware", "Optimizar el rendimiento del ordenador", "Conectar a internet", "Aumentar la memoria RAM"], correcta: "Proteger el sistema contra malware" },
            { pregunta: "¿Qué es el cifrado?", respuestas: ["Un método para proteger datos mediante codificación", "Una técnica de programación", "Un tipo de hardware", "Un software de diseño"], correcta: "Un método para proteger datos mediante codificación" }
        ],
        "Nuevas Tecnologías": [
            { pregunta: "¿Qué es el Internet de las Cosas (IoT)?", respuestas: ["La conexión de dispositivos a internet", "Una red social", "Un lenguaje de programación", "Una forma de hacer compras en línea"], correcta: "La conexión de dispositivos a internet" },
            { pregunta: "¿Cuál es la función de la realidad aumentada?", respuestas: ["Superponer información digital en el mundo real", "Crear videojuegos", "Proteger datos personales", "Transmitir información a través de satélites"], correcta: "Superponer información digital en el mundo real" },
            { pregunta: "¿Qué es blockchain?", respuestas: ["Una tecnología de registro distribuido", "Un tipo de malware", "Un lenguaje de programación", "Una aplicación de chat"], correcta: "Una tecnología de registro distribuido" },
            { pregunta: "¿Qué es el 5G?", respuestas: ["La quinta generación de tecnología móvil", "Un tipo de virus", "Una plataforma de programación", "Un modelo de computadora"], correcta: "La quinta generación de tecnología móvil" },
            { pregunta: "¿Qué es el machine learning?", respuestas: ["Un campo de la inteligencia artificial que permite a las máquinas aprender", "Un software de chat", "Una técnica de programación", "Un tipo de hardware"], correcta: "Un campo de la inteligencia artificial que permite a las máquinas aprender" }
        ]
    };

// Configuración de la ruleta
const categorias = Object.keys(preguntasPorCategoria);
const anguloPorCategoria = (2 * Math.PI) / categorias.length;
let anguloActual = 0;

// Iniciar ruleta
ruleta.width = 300;
ruleta.height = 300;
dibujarRuleta();

girarBtn.addEventListener('click', () => {
    resultadoContainer.classList.add('hidden');
    respuestasContainer.innerHTML = ''; // Limpiar respuestas previas
    preguntaContainer.classList.add('hidden'); // Ocultar el contenedor de preguntas al girar
    let giros = Math.floor(Math.random() * 5) + 5; // Número de giros aleatorio
    let totalGiro = giros * 2 * Math.PI; // Giros en radianes
    let inicio = null;

    function girarRuleta(timestamp) {
        if (!inicio) inicio = timestamp;
        let progreso = timestamp - inicio;
        
        // Calculamos el ángulo actual
        let anguloActualGiro = (progreso / 1000) * totalGiro; // Gira la ruleta en 1 segundo

        // Actualizamos el ángulo actual y redibujamos
        anguloActual += (progreso / 1000) * (totalGiro / 3); // Controlar la velocidad de rotación
        dibujarRuleta();

        // Si no hemos completado el giro, seguimos girando
        if (progreso < 3000) {
            requestAnimationFrame(girarRuleta);
        } else {
            // Al finalizar el giro, calcular la categoría seleccionada
            anguloActual = anguloActual % (2 * Math.PI); // Asegúrate de que el ángulo esté dentro del rango
            let categoriaSeleccionada = categorias[Math.floor(((anguloActual / (2 * Math.PI)) * categorias.length))];
            mostrarPreguntaIA(categoriaSeleccionada);
        }
    }

    requestAnimationFrame(girarRuleta);
});

function dibujarRuleta() {
    const ctx = ruleta.getContext('2d');
    ctx.clearRect(0, 0, ruleta.width, ruleta.height); // Limpiar el canvas
    ctx.save(); // Guardar el estado del canvas
    ctx.translate(ruleta.width / 2, ruleta.height / 2); // Mover el origen al centro del canvas
    ctx.rotate(anguloActual); // Rotar el canvas

    for (let i = 0; i < categorias.length; i++) {
        const angulo = anguloPorCategoria * i;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, 100, angulo, angulo + anguloPorCategoria);
        ctx.fillStyle = i % 2 === 0 ? '#FFCC00' : '#FF9900'; // Alternar colores
        ctx.fill();
        
        // Dibujar texto
        ctx.save();
        ctx.rotate(angulo + anguloPorCategoria / 2);
        ctx.fillStyle = '#000';
        ctx.font = 'bold 16px Arial';
        ctx.fillText(categorias[i], 30, 10);
        ctx.restore();
    }

    ctx.restore(); // Restaurar el estado del canvas
}

function mostrarPreguntaIA(categoria) {
    categoriaDisplay.innerText = `Categoría: ${categoria}`;
    const preguntas = preguntasPorCategoria[categoria];
    const preguntaSeleccionada = preguntas[Math.floor(Math.random() * preguntas.length)];
    preguntaDisplay.innerText = preguntaSeleccionada.pregunta;
    
    // Crear botones de respuestas
    respuestasContainer.innerHTML = ''; // Limpiar respuestas previas
    preguntaSeleccionada.respuestas.forEach(respuesta => {
        const btn = document.createElement('button');
        btn.innerText = respuesta;
        btn.onclick = () => verificarRespuesta(respuesta, preguntaSeleccionada.correcta);
        respuestasContainer.appendChild(btn);
    });

    preguntaContainer.classList.remove('hidden');
}

function verificarRespuesta(respuestaSeleccionada, respuestaCorrecta) {
    resultadoContainer.classList.remove('hidden');
    preguntaContainer.classList.add('hidden'); // Ocultar preguntas al verificar

    if (respuestaSeleccionada === respuestaCorrecta) {
        resultadoDisplay.innerText = '¡Respuesta correcta!';
        respuestasCorrectas++; // Aumentar contador de respuestas correctas
    } else {
        resultadoDisplay.innerText = `Respuesta incorrecta. La correcta era: ${respuestaCorrecta}`;
        respuestasIncorrectas++; // Aumentar contador de respuestas incorrectas
    }
    
    // Actualizar y mostrar el conteo de respuestas
    conteoDisplay.innerText = `Correctas: ${respuestasCorrectas}, Incorrectas: ${respuestasIncorrectas}`;
}


// Referencias a los elementos para mostrar conteos
const correctasCountDisplay = document.getElementById('correctasCount');
const incorrectasCountDisplay = document.getElementById('incorrectasCount');

// En la función verificarRespuesta, añade la lógica para contar respuestas correctas e incorrectas
function verificarRespuesta(respuestaSeleccionada, respuestaCorrecta) {
    resultadoContainer.classList.remove('hidden');
    preguntaContainer.classList.add('hidden'); // Ocultar preguntas al verificar

    if (respuestaSeleccionada === respuestaCorrecta) {
        resultadoDisplay.innerText = '¡Respuesta correcta!';
        respuestasCorrectas++; // Incrementar contador de respuestas correctas
    } else {
        resultadoDisplay.innerText = `Respuesta incorrecta. La correcta era: ${respuestaCorrecta}`;
        respuestasIncorrectas++; // Incrementar contador de respuestas incorrectas
    }

    // Actualizar los conteos en la pantalla
    correctasCountDisplay.innerText = respuestasCorrectas;
    incorrectasCountDisplay.innerText = respuestasIncorrectas;
}