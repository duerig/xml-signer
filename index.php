<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>GENI Authorization Tool</title>

  <link rel="shortcut icon" href="favicon.ico"/>
  <link rel="stylesheet" style="text/css"
        href="lib/bootstrap/css/bootstrap.min.css">
        <link rel="stylesheet" style="text/css"
  		href="signer.css">
  <script data-main="xml-signer" src="require-jquery.js"></script>

  <script type='text/plain' id='tool_id'><?php echo $_REQUEST['tool_id'] ?></script>
  <script type='text/plain' id='backto'><?php echo $_REQUEST['backto'] ?></script>
  <script type='text/plain' id='tool_cert'><?php echo $_REQUEST['tool_cert'] ?></script>

<body>
  <div class="container" id="main-content">
    <h1>Initializing...</h1>
  </div>
</body>
</html>
