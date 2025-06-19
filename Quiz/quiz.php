<?php include "Includes/header.php" ?>
    
    <form method="post" action="validarQuiz.php">
        <fieldset>
            <legend>1. Qual é a teoria científica mais aceita sobre a origem do universo?</legend><br>
            <label><input type="radio" name="q1" value="a">Teoria do Big Bang</label><br>
            <label><input type="radio" name="q1" value="b">Teoria da Criação Inteligente</label><br>
            <label><input type="radio" name="q1" value="c">Teoria da Terra Plana</label><br>
            <label><input type="radio" name="q1" value="d">Teoria do Multiverso</label>
        </fieldset>

        <fieldset>
            <legend>2. Qual filósofo é conhecido pela frase "Penso, logo existo"?</legend><br>
            <label><input type="radio" name="q2" value="a">Friedrich Nietzsche</label><br>
            <label><input type="radio" name="q2" value="b">René Descartes</label><br>
            <label><input type="radio" name="q2" value="c">Jean-Paul Sartre</label><br>
            <label><input type="radio" name="q2" value="d">Immanuel Kant</label>
        </fieldset>

        <fieldset>
            <legend>3. O que é o "multiverso" na teoria cosmológica?</legend><br>
            <label><input type="radio" name="q3" value="a">Uma galáxia distante</label><br>
            <label><input type="radio" name="q3" value="b">A ideia de múltiplos universos coexistindo</label><br>
            <label><input type="radio" name="q3" value="c">Uma teoria sobre buracos negros</label><br>
            <label><input type="radio" name="q3" value="d">Uma região do espaço-tempo</label>
        </fieldset>

        <input type="submit" value="Enviar">
        <input type="reset" value="Limpar">
    </form>
<?php
    include "Includes/footer.php"
?>