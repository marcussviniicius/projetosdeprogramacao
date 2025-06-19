<?php

$tema = isset($_COOKIE['tema']) ? base64_decode($_COOKIE['tema']) : 1;

switch ($tema) {
    case '2': 
        $backgroundColor = '#222';
        $textColor = '#fff';
        break;
    default: 
        $backgroundColor = '#fff';
        $textColor = '#000';
        break;
}
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz PHP</title>
    <style>
        body {
            background-color: <?php echo $backgroundColor; ?>;
            color: <?php echo $textColor; ?>;
        }
        header {
            background-color: <?php echo $backgroundColor; ?>;
        }
        footer {
            background-color: <?php echo $backgroundColor; ?>;
        }
    </style>
</head>
<body>
    <header>
        <h1>Bem-vindo ao Quiz</h1>
    </header>