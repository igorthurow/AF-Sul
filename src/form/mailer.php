<?php
 
// Inclui o arquivo class.phpmailer.php
require_once("../PHPMailer/class.phpmailer.php");
 
// Inicia a classe PHPMailer
$mail = new PHPMailer(true);

// Define a formatação padrão
$mail->CharSet = 'UTF-8';
 
// Define os dados do servidor e tipo de conexão
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 
try {
     $mail->Host = 'smtp.afsulmaquinas.com.br'; // Endereço do servidor SMTP (Autenticação, utilize o host smtp.seudomínio.com.br)
     $mail->SMTPAuth   = true;  // Usar autenticação SMTP (obrigatório para smtp.seudomínio.com.br)
     $mail->Port       = 587; //  Usar 587 porta SMTP
     $mail->Username = 'debora@afsulmaquinas.com.br'; // Usuário do servidor SMTP (endereço de email)
     $mail->Password = '#Dschambeck9'; // Senha do servidor SMTP (senha do email usado)



     //Define as variáveis
     // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=  
    $nomeremetente     = $_POST['name'];
    $emailremetente    = $_POST['email'];
    $telefone           = $_POST['tel'];
    $msg          = $_POST['msg'];
    

    //Define o remetente
     // =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=    
     $mail->SetFrom('debora@afsulmaquinas.com.br', $nomeremetente); //Seu e-mail
     $mail->AddReplyTo($emailremetente, $nomeremetente); //Seu e-mail
     $mail->Subject = 'Novo contato, formulário parceiros';//Assunto do e-mail
 
 
     //Define os destinatário(s)
     //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
     $mail->AddAddress('contato@actimpermeabilizacao.com.br', 'Formulário de parceiros');
 
     //Campos abaixo são opcionais 
     //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
     //$mail->AddCC('destinarario@dominio.com.br', 'Destinatario'); // Copia
     //$mail->AddBCC('destinatario_oculto@dominio.com.br', 'Destinatario2`'); // Cópia Oculta
     //$mail->AddAttachment('images/phpmailer.gif');      // Adicionar um anexo
 
    $mensagemHTML = "Dados do remente: <br>
    Nome: $nomeremetente <br>  
    E-mail: $emailremetente    <br> 
    Telefone: $telefone  <br>          
    Mensagem: $msg";

 
     //Define o corpo do email
     $mail->MsgHTML($mensagemHTML);
 
     ////Caso queira colocar o conteudo de um arquivo utilize o método abaixo ao invés da mensagem no corpo do e-mail.
     //$mail->MsgHTML(file_get_contents('arquivo.html'));
 
     $mail->Send();
 
    //caso apresente algum erro é apresentado abaixo com essa exceção.
    }catch (phpmailerException $e) {
      echo $e->errorMessage(); //Mensagem de erro costumizada do PHPMailer
}

    //Salvando uma cópia do contato em TXT.
    //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

if(isset($_POST['name']) && isset($_POST['tel'])) {
    $timeD = date('d/m/Y');
    $timeH = date('H:i:s');
    $data = $_POST['name'] . "\t" . $_POST['email'] . "\t" . $_POST['tel'] . "\t" . $_POST['msg'] . $attachment . "\t $timeD \t" . "$timeH \t" . "\n";
    $filename = 'Contatos TXT/' . 'Contato' . ' ' . date('d.m.Y').".txt";
    if (!file_exists($filename)) {
        $fh = fopen($filename, 'w') or die;
    }
    $ret = file_put_contents($filename, $data, FILE_APPEND | LOCK_EX);
}

?>