<?php include 'header.php'; ?>

<section class="content-section">
    <h2>Contacto y Consultas</h2>
    <p>¿Tenés alguna duda o querés saber más sobre nuestros servicios de gestión y procesos? Completá el formulario:</p>
    
    <form action="contacto.php" method="POST">
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" required placeholder="Tu nombre">

        <label for="email">Correo Electrónico:</label>
        <input type="email" id="email" name="email" required placeholder="correo@ejemplo.com">

        <label for="mensaje">Mensaje:</label>
        <textarea id="mensaje" name="mensaje" rows="5" required placeholder="Escribinos tu consulta..."></textarea>

        <button type="submit">Enviar Consulta</button>
    </form>
</section>

<?php include 'footer.php'; ?>