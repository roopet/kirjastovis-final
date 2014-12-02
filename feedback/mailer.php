<?php
/* Set e-mail recipient */
$myemail = 'tilastot@kirjastot.fi';



$name = check_input($_POST['nimi'], "Muista antaa nimesi");
/*$subject = check_input($_POST['aihe'], "Mikä on palautteen aihe?"); */
$email = check_input($_POST['email']);
$message = check_input($_POST['viesti'], "Älkää unohtako antaa palautetta");
$captcha = check_input($_POST['captcha']);


if (!preg_match("/([\w\-]+\@[\w\-]+\.[\w\-]+)/", $email))
{
show_error("Sähköpostiosoite on väärä.");
}
if (!preg_match("/o/", $captcha))
{
show_error("Roskapostitesti-kysymyksen vastaus oli väärä. Ole hyvä ja kokeilepa vastata uudelleen.");
}
$subject ="Palautetta kirjastotilastojen visualisoinnista";

$message = "

Nimi: $name
E-mail: $email
Aihe: $subject

Palaute:
$message

";


mail($myemail, $subject, $message);


header('Location: kiitos.htm');
exit();


function check_input($data, $problem='')
{
$data = trim($data);
$data = stripslashes($data);
$data = htmlspecialchars($data);
if ($problem && strlen($data) == 0)
{
show_error($problem);
}
return $data;
}

function show_error($myError)
{
?>
<html>
<head>
<script>
function goBack() {
    window.history.back()
}
</script>
</head>
<body>

<p>Olkaa hyvä ja korjatkaa:</p>
<strong><?php echo $myError; ?></strong>
<p>Paina edellistä ja yritä uudelleen</p>
<button onclick="goBack()">Edellinen</button>
</body>
</html>
<?php
exit();
}
?>