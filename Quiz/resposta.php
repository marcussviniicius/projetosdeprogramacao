<?php 
include "Includes/header.php"; 

$certas = isset($_COOKIE['resultado']) ? base64_decode($_COOKIE['resultado']) : 0;
$respostasUsuario = isset($_COOKIE['respostasUsuario']) ? json_decode(base64_decode($_COOKIE['respostasUsuario']), true) : [];
$gabarito = isset($_COOKIE['gabarito']) ? json_decode(base64_decode($_COOKIE['gabarito']), true) : [];
?>

<div>
    <p>Você acertou <?php echo $certas?> de 3 perguntas.</p>

    <div>
        <ul>
            <?php for ($i = 1; $i <= 3; $i++): ?>
                <li>Questão <?php echo $i; ?></li>
                <div>
                    <p>Sua Resposta: <?php echo $respostasUsuario["q$i"]; ?></p>
                    <p>Resposta Correta: <?php echo $gabarito["q$i"]; ?></p>
                    <p>
                        <?php echo ($respostasUsuario["q$i"] === $gabarito["q$i"]) ? '<span style="color: green;">Acertou!</span>':'<span style="color: red;">Errou!</span>'; ?>
                    </p>
                </div>
            <?php endfor; ?>
        </ul>
    </div>

    <form action="quiz.php">
        <input type="submit" value="Reiniciar Quiz">
    </form>
</div>

<?php include "Includes/footer.php"; ?>