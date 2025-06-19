<?php include "Includes/header.php"; ?>
    
    <form method="post" action="validarForm.php">
        <label for="nome">Digite seu Nome: </label>
        <input type="text" name="nome">

        <label for="tema">Tema: </label>
        <select name="tema">
            <option value="1" selected>Claro</option>
            <option value="2">Escuro</option>
        </select>
        
        <input type="submit" value="Enviar">
        <input type="reset" value="Limpar">
    </form>

<?php include "Includes/footer.php"; ?>