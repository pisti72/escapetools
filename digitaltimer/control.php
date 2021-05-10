<!doctype html>
<html>

<head>
    <title>Control Center</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" href="style.css">
    <link rel="stylesheet" type="text/css" href="w3.css">
    <link rel="icon" type="image/svg+xml" href="assets/favicon.svg">
    <meta charset="UTF-8">
</head>

<body>
    <div class="w3-container">
        <h1>Control center</h1>
        <h2 id="name"></h2>
        <p id="timestring">NO CONNECTION</p>
        <img id="connection" src="assets/sad_cloud_01.svg" height="50px"/>
        <div class="w3-container w3-blue-gray w3-padding-large">
            <button class="w3-button w3-gray" onclick="playPressed()" id="play"></button>
            <button class="w3-button w3-gray" onclick="setToZero()">&#8635;&nbsp;Restart</button>
            <button class="w3-button w3-gray" onclick="setOneHour()">Start 1 hour</button>
            <button class="w3-button w3-gray" onclick="decFiveMins()">- 5 mins</button>
            <button class="w3-button w3-gray" onclick="addFiveMins()">+ 5 mins</button>
            <button class="w3-button w3-red" onclick="setToRed()">red</button>
            <button class="w3-button w3-green" onclick="setToGreen()">green</button>
            <button class="w3-button w3-blue" onclick="setToBlue()">blue</button>
            <button class="w3-button w3-light-gray" onclick="setToWhite()">white</button>
        </div>
    </div>
    <div id="message">Message</div>
    <script>
    var id = '<?php echo ($_GET['id']); ?>';
    </script>
    <script src="control.js"></script>
</body>

</html>