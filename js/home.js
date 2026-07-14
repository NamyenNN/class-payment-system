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


        const res = await fetch(

            CONFIG.GAS_URL +

            "?action=getBills"

        );


        const result =
        await res.json();



        const billList =
        document.getElementById("billList");



        billList.innerHTML = "";



        if(result.status !== "success"){


            billList.innerHTML =
            "<p>ไม่พบข้อมูลรายการชำระเงิน</p>";

            return;

        }





        if(result.bills.length === 0){


            billList.innerHTML =
            "<p>ยังไม่มีรายการชำระเงิน</p>";

            return;

        }




        result.bills.forEach(bill => {



            billList.innerHTML += `


            <div class="bill-card">


                <h3>
                    ${bill.Title}
                </h3>


                <p>
                    <b>ยอดเงิน :</b>
                    ${bill.Amount}
                    บาท
                </p>


                <p>
                    <b>ครบกำหนด :</b>
                    ${bill.DueDate}
                </p>



                <button onclick="openBill('${bill.BillID}')">

                    ชำระเงิน

                </button>


            </div>


            `;



        });



    }
    catch(err){


        console.error(err);


        document.getElementById("billList").innerHTML =
        "<p>โหลดข้อมูลไม่สำเร็จ</p>";


    }


}





function openBill(billId){


    localStorage.setItem(

        "billId",

        billId

    );



    window.location.href =
    "bill.html";


}
