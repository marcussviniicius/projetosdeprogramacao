<?php

    if (!isset($_POST['q1'], $_POST['q2'], $_POST['q3'])) {
        header("Location: quiz.php");
        exit;
    }

    $gabarito = [
        'q1' => 'a',
        'q2' => 'b',
        'q3' => 'b'
    ];

    $respostasUsuario = [
        'q1' => $_POST['q1'],
        'q2' => $_POST['q2'],
        'q3' => $_POST['q3']
    ];

    $certas = 0;

    foreach($gabarito as $q => $respostaCerta){
        if($_POST[$q] == $respostaCerta){
            $certas++;
        };
    }

    setcookie('resultado', base64_encode($certas), time() + 300);
    setcookie('gabarito', base64_encode(json_encode($gabarito)), time() + 300);
    setcookie('respostasUsuario', base64_encode(json_encode($respostasUsuario)), time() + 300);

    header("Location: resposta.php");
    exit;
?>