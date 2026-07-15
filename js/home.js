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



        result.bills.forEach(bill => {


            billList.innerHTML += `

            <div class="bill-card">

                <h3>${bill.Title}</h3>

                <p>
                จำนวนเงิน : ${bill.Amount} บาท
                </p>

                <p>
                ครบกำหนด : ${bill.DueDate}
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

    }

}





function openBill(billId){


    console.log("CLICK BILL =", billId);


    localStorage.setItem(
        "billId",
        String(billId)
    );



    console.log(
        "SAVE BILL ID =",
        localStorage.getItem("billId")
    );



    window.location.href =
    "bill.html";


}
