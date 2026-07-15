window.onload = async function () {


    const user = JSON.parse(
        localStorage.getItem("lineUser")
    );


    if(!user){

        window.location.href = "index.html";

        return;

    }



    document.getElementById("username").innerText =
        user.displayName || "ผู้ใช้งาน";



    if(user.pictureUrl){

        document.getElementById("avatar").src =
            user.pictureUrl;

    }


    loadBills();


};







async function loadBills() {


    try {


        const user = JSON.parse(
            localStorage.getItem("lineUser")
        );


        const res = await fetch(

            CONFIG.GAS_URL +
            "?action=getBills"

        );


        const result = await res.json();


        console.log("BILLS =", result);



        const billList =
        document.getElementById("billList");



        billList.innerHTML = "";



        if(result.status !== "success"){


            billList.innerHTML =
            "<p>โหลดรายการไม่สำเร็จ</p>";

            return;

        }





        for(const bill of result.bills){


            const status =
            await checkBillStatus(
                bill.BillID,
                user.studentID
            );



            let button = "";



            if(status === "รอตรวจสอบ"){


                button = `

                <button disabled
                style="
                background:#f5b942;
                opacity:.8;
                ">

                🟡 รอตรวจสอบ

                </button>

                `;


            }
            else if(status === "ผ่าน"){


                button = `

                <button disabled
                style="
                background:#2ecc71;
                opacity:.8;
                ">

                ✅ ชำระแล้ว

                </button>

                `;


            }
            else{


                button = `

                <button onclick="openBill('${bill.BillID}')">

                💳 ชำระเงิน

                </button>

                `;


            }




            billList.innerHTML += `

            <div class="bill-card">


                <h3>
                ${bill.Title}
                </h3>



                <p>
                จำนวนเงิน : ${bill.Amount} บาท
                </p>



                <p>
                ครบกำหนด : ${bill.DueDate}
                </p>



                ${button}



            </div>

            `;


        }



    }
    catch(err){

        console.error(err);

    }

}









async function checkBillStatus(billId, studentId){


    try{


        const res = await fetch(

            CONFIG.GAS_URL +

            "?action=getPayments&studentId=" +

            encodeURIComponent(studentId)

        );



        const result =
        await res.json();



        if(result.status !== "success"){

            return "";

        }



        const payment =
        result.payments.find(

            p =>

            String(p.BillID) === String(billId)

        );



        if(payment){

            return payment.Status;

        }



        return "";


    }
    catch(err){


        console.error(
            "CHECK PAYMENT ERROR",
            err
        );


        return "";


    }


}








function openBill(billId){


    console.log(
        "CLICK BILL =",
        billId
    );



    localStorage.setItem(

        "billId",

        String(billId)

    );



    window.location.href =
    "bill.html";


}
