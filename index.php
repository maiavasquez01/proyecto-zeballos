<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NEXO Q - Gestión & Procesos</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>

    <header>
        <nav class="navbar">
            <a href="index.php" class="logo-container">
                <img src="img/logonexo.jpg" alt="Logo NEXO Q">
            </a>

            <button class="hamburger" id="hamburger-btn" aria-label="Abrir menú">
                <i class="fas fa-bars"></i>
            </button>

            <ul class="nav-links" id="nav-links">
                <li><a href="calidad.php">Gestion de Calidad</a></li>
                <li><a href="procesos.php">Procesos de Desarrollo de Software</a></li>
                <li><a href="metodologias.php">Metodologias agiles</a></li>
                <li><a href="recursos.php">Recursos y Aprendizaje</a></li>
                <li><a href="nosotros.php">Sobre Nosotros</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <div class="hero-text">
            <p>
                NEXO Q es una propuesta orientada a la gestión de la calidad, diseñada para facilitar la organización, el control y la mejora continua de los procesos dentro de una organización.<br>
                Nuestro objetivo es conectar personas, procesos y herramientas para lograr una gestión más eficiente, ordenada y enfocada en la calidad.
            </p>
        </div>

        <div class="features-grid">
            <a href="calidad.php" class="feature-card">
                <div class="feature-box">
                    <h3>Gestión de la Calidad del Software:</h3>
                </div>
            </a>

            <a href="procesos.php" class="feature-card">
                <div class="feature-box">
                    <h3>Procesos de Desarrollo de Software:</h3>
                </div>
            </a>

            <a href="metodologias.php" class="feature-card">
                <div class="feature-box">
                    <h3>Metodologías Ágiles:</h3>
                </div>
            </a>

            <a href="recursos.php" class="feature-card">
                <div class="feature-box">
                    <h3>Recursos y Aprendizaje:</h3>
                </div>
            </a>
        </div>

        <div class="icons-grid">
            <a href="calidad.php" class="icon-item">
                <img src="img/copia1.png.jpg" alt="Icono Gestión de Calidad">
            </a>
            <a href="procesos.php" class="icon-item">
                <img src="img/icono2.jpg" alt="Icono Procesos de Software">
            </a>
            <a href="metodologias.php" class="icon-item">
                <img src="img/icono3.jpg" alt="Icono Metodologías Ágiles">
            </a>
            <a href="recursos.php" class="icon-item">
                <img src="img/icono4.jpg" alt="Icono Recursos y Aprendizaje">
            </a>
        </div>

        <a href="nosotros.php" class="banner-about">
            Sobre Nosotros
        </a>
    </main>

    <footer>
        <div class="social-icons">
            <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
            <a href="#" aria-label="Facebook"><i class="fab fa-facebook"></i></a>
            <a href="#" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>
            <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
        </div>
    </footer>

    <script src="js/main.js"></script>
</body>
</html>