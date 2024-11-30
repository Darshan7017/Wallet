<?php
include "./assets/data.php";
$response = [
  "status" => "error",
  "message" => "Invalid request",
];

function generateToken()
{
  return bin2hex(random_bytes(16));
}

if ($_SERVER["REQUEST_METHOD"] === "GET") {
  $action = $_GET["action"] ?? null;
  $mobile = $_GET["mobile"] ?? null;

  if ($action == "send_otp") {
    $otp = rand(1000, 9999);
    $query = "INSERT INTO `user` (number, otp, balance) VALUES ('$mobile', '$otp', 0)
                  ON DUPLICATE KEY UPDATE otp='$otp'";
    if (mysqli_query($conn, $query)) {
      $response = [
        "status" => "success",
        "message" => "OTP sent successfully",
        "otp_sent_to" => $mobile,
        "otp" => $otp,
      ];
    } else {
      $response = [
        "status" => "error",
        "message" => "Failed to store OTP: " . mysqli_error($conn),
      ];
    }
  } elseif ($action === "verify_otp") {
    $entered_otp = $_GET["otp"] ?? null;
    $query = "SELECT otp, name, tgid FROM `user` WHERE number = '$mobile'";
    $result = mysqli_query($conn, $query);

    if ($result && mysqli_num_rows($result) > 0) {
      $row = mysqli_fetch_assoc($result);
      if ($row["otp"] == $entered_otp) {
        $token = generateToken();
        $update_token = "UPDATE `user` SET token='$token' WHERE number='$mobile'";

        if (mysqli_query($conn, $update_token)) {
          $response = [
            "status" => "success",
            "message" => "OTP verified successfully",
            "token" => $token,
          ];

          if (empty($row["name"]) || empty($row["tgid"])) {
            $response["action"] = "required";
          }
        } else {
          $response = [
            "status" => "error",
            "message" => "Failed to update token: " . mysqli_error($conn),
          ];
        }
      } else {
        $response = [
          "status" => "error",
          "message" => "Invalid OTP. Entered OTP: " . $entered_otp,
        ];
      }
    } else {
      $response = [
        "status" => "error",
        "message" => "Mobile number not found",
      ];
    }
  } elseif ($action === "user_data") {
    $name = $_GET["name"] ?? null;
    $tgid = $_GET["tgid"] ?? null;
    $query = "SELECT token, name, tgid FROM `user` WHERE number='$mobile'";
    $result = mysqli_query($conn, $query);

    if ($result && mysqli_num_rows($result) > 0) {
      $row = mysqli_fetch_assoc($result);
        if ($name && $tgid) {
          $query = "UPDATE `user` SET name='$name', tgid='$tgid' WHERE number='$mobile'";
          if (mysqli_query($conn, $query)) {
            $new_token = generateToken();
            $update_token = "UPDATE `user` SET token='$new_token' WHERE number='$mobile'";
            mysqli_query($conn, $update_token);

            $response = [
              "status" => "success",
              "message" => "User data updated successfully",
              "token" => $new_token,
            ];
          } else {
            $response = [
              "status" => "error",
              "message" => "Failed to update user data: " . mysqli_error($conn),
            ];
          }
        } else {
          $response = [
            "status" => "error",
            "message" => "Name or Telegram ID is missing",
          ];
        }
    } else {
      $response = [
        "status" => "error",
        "message" => "Token is required for this action",
      ];
    }
  } else {
    $response["message"] = "Invalid action.";
  }
}

header("Content-Type: application/json");
echo json_encode($response);
?>
