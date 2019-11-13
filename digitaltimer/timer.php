<!doctype html>
<html>

<head>
    <title>Timer</title>
    <link rel="stylesheet" type="text/css" href="style.css">
    <link rel="icon" type="image/svg+xml" href="assets/favicon.svg">
    <meta charset="UTF-8">
    <style>
    html{
        cursor:none;
    }
    </style>
</head>

<body class="bg-black">
    <div id="alice_container">
        <div id="bg_alice"></div>
        <div class="container_digits">
            <div id="d1" class="digit_alice">1</div>
            <div id="d2" class="digit_alice">2</div>
            <div class="digit_alice">:</div>
            <div id="d3" class="digit_alice">3</div>
            <div id="d4" class="digit_alice">4</div>
            <div class="digit_alice">:</div>
            <div id="d5" class="digit_alice">5</div>
            <div id="d6" class="digit_alice">6</div>
        </div>
    </div>
    <div id="digit_container">
        <div id="container">
            <div id="time"></div>
        </div>
    </div>
    <img id="connection" src="assets/sad_cloud_01.svg"/>
    <script>
    var id = '<?php echo ($_GET['id']); ?>';
    </script>
    <script src="timer.js"></script>
</body>

</html>