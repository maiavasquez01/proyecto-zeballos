<?php
$currentPage = basename($_SERVER['PHP_SELF']);
?>
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

