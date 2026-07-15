function showAlert(message,type="success"){

    const alertBox = document.createElement("div");

    alertBox.className = "alert-box " + type;

    alertBox.innerHTML = message;


    document.body.appendChild(alertBox);


    setTimeout(()=>{

        alertBox.remove();

    },3000);

}
