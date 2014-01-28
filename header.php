<!DOCTYPE html>
<html>
<head>
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
  <script src="loadFile.js"></script>
  <link rel="stylesheet" type="text/css" href="style.css">
  <title> Vagabond Multilingual Journal @ Cal</title>
</head>
<body>
  <header class="noselect">
    <div id="title">
      <div class="centered">
        <img id="logo" src="resources/logo.png">
      </div>
    </div>
    <?php
      echo "<div id='contDisp' style='background-image:url(\"resources/bg/$page.jpg\")'>";
      echo "</div>";
    ?>
    <nav id="navbar" class="centered">
        <a href='index.php' class='menu'>home</a>
      | <a href='issues.php' class='menu'>issues</a>
      | <a href='submissions.php' class='menu'>submissions</a>
      | <a href='staff.php' class='menu'>staff</a>
      | <a href='FAQ.php' class='menu'>FAQ</a>
    </nav>
  </header>
  <div id="contArea" class="centered">
    <section id="contMain">
