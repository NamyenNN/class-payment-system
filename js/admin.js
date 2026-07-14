async function adminLogin(){


    const password =
    document.getElementById("password").value.trim();



    if(!password){


        alert("กรอกรหัสผ่าน");

        return;

    }



    try{


        const res = await fetch(

            CONFIG.GAS_URL +

            "?action=adminLogin&password=" +

            encodeURIComponent(password)

        );



        const result =
        await res.json();




        if(result.status === "success"){


            localStorage.setItem(

                "adminLogin",

                "true"

            );



            // ไปหน้า Admin Dashboard

            window.location.href =
            "admin-panel.html";


        }
        else{


            document.getElementById("status").innerText =
            result.message;


        }



    }

    catch(err){


        console.error(err);


        document.getElementById("status").innerText =
        "เกิดข้อผิดพลาด";


    }


}
