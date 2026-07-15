window.onload = function(){

    loadPayments();

};



async function loadPayments(){


    const user =
    JSON.parse(
        localStorage.getItem("lineUser")
    );



    if(!user){

        window.location.href =
        "index.html";

        return;

    }



    try{


        const response =
        await fetch(

            CONFIG.GAS_URL +

            "?action=getPayments" +

            "&studentId=" +

            encodeURIComponent(
                user.studentID
            )

        );



        const result =
        await response.json();



        const list =
        document.getElementById(
            "paymentList"
        );



        list.innerHTML = "";



        if(result.status !== "success" ||
           result.payments.length === 0){


            list.innerHTML =
            "<p>ยังไม่มีประวัติการชำระ</p>";

            return;

        }



        result.payments.forEach(p => {


            list.innerHTML += `

            <div class="bill-card">

                <p>
                รายการ: ${p.BillID}
                </p>

                <p>
                สถานะ:
                ${p.Status}
                </p>

                <p>
                เวลา:
                ${p.UploadTime}
                </p>

            </div>

            `;


        });



    }
    catch(err){

        console.error(err);

        document.getElementById(
            "paymentList"
        ).innerHTML =
        "โหลดข้อมูลไม่สำเร็จ";

    }

}
