<?php
    $nome = isset($_POST["nome"]) ? $_POST["nome"] : false;
    $tema = isset($_POST["tema"]) ? $_POST["tema"] : false;

    if(!($nome && $tema)):
        header("Location: form.php");
        exit;
    endif;
    
    setcookie('nome', base64_encode($nome), time() + 60*60*24*7);
    setcookie('tema', base64_encode($tema), time() + 60*60*24*7);

    header("Location: quiz.php");
    exit;
?>