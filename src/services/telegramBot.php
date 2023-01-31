<?php

$token = "5633212263:AAEnkqD9f4QcmoYbXNf8rRU8_wApLnO908w";

$chat_id = "-1001612630737";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $input = json_decode(file_get_contents("php://input"), true);


  if (isset($input['title'])) {
    if (!empty($input['title'])) {
      $title = strip_tags($input['title']);
      $titleFieldset = "";
    }
  }


  if (isset($input['name'])) {
    if (!empty($input['name'])) {
      $name = strip_tags($input['name']);
      $nameFieldset = "Ім'я: ";
    }
  }


  if (isset($input['phone'])) {
    if (!empty($input['phone'])) {
      $phone = strip_tags($input['phone']);
      $phoneFieldset = "Телефон: ";
    }
  }
  if (isset($input['materials'])) {
    if (!empty($input['materials'])) {
      $materials = strip_tags($input['materials']);
      $materialsFieldset = "Чи потрібна пряжа: ";
    }
  }
  if (isset($input['skill'])) {
    if (!empty($input['skill'])) {
      $skill = strip_tags($input['skill']);
      $skillFieldset = "Який навик в’язання: ";
    }
  }
  if (isset($input['city'])) {
    if (!empty($input['city'])) {
      $city = strip_tags($input['city']);
      $cityFieldset = "Населений пункт: ";
    }
  }
  if (isset($input['delivery'])) {
    if (!empty($input['delivery'])) {
      $delivery = strip_tags($input['delivery']);
      $deliveryFieldset = "Відділення: ";
    }
  }
  if (isset($input['comment'])) {
    if (!empty($input['comment'])) {
      $comment = strip_tags($input['comment']);
      $commentFieldset = "Коментар: ";
    }
  }

 
    $arr = array(
      $titleFieldset => $title,

      $nameFieldset => $name,
      $phoneFieldset => $phone . '%0A',
      $materialsFieldset => $materials,
      $skillFieldset => $skill . '%0A',
      "Реквізити Нової пошти для відправки пряжі:" => '',
      $cityFieldset => $city,
      $deliveryFieldset => $delivery . '%0A',
     
      $commentFieldset => $comment,
   
    );
  




  foreach ($arr as $key => $value) {

    $txt .= "<b>" . $key . "</b> " . $value . "%0A";
  };
  $sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}", "r");
  // }
}
