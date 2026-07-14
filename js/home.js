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


        const user =
        JSON.parse(
            localStorage.getItem("lineUser")
        );



        // โหลดรายการบิล

        const billRes = await fetch(

            CONFIG.GAS_URL +

            "?action=getBills"

        );



        const billResult =
        await billRes.json();




        const billList =
        document.getElementById("billList");



        billList.innerHTML = "";




        if(billResult.status !== "success"){


            billList.innerHTML =
            "<p>ไม่พบข้อมูลรายการชำระเงิน</p>";

            return;

        }





        // โหลดประวัติการจ่ายของนักศึกษา

        const paymentRes = await fetch(

            CONFIG.GAS_URL +

            "?action=getPayments&studentId=" +

            encodeURIComponent(user.studentID || "")

        );



        const paymentResult =
        await paymentRes.json();



        const payments =
        paymentResult.payments || [];







        billResult.bills.forEach(bill => {



            const payment = payments.find(

                p =>

                p.BillID == bill.BillID

            );



            let button = "";



            if(payment){


                if(payment.Status === "รอตรวจสอบ"){


                    button = `

                    <button disabled>

                        รอตรวจสอบ

                    </button>

                    `;


                }
                else if(payment.Status === "ผ่าน"){


                    button = `

                    <button disabled>

                        ชำระแล้ว ✅

                    </button>

                    `;


                }
                else{


                    button = `

                    <button onclick="openBill('${bill.BillID}')">

                        ชำระใหม่

                    </button>

                    `;


                }


            }
            else{


                button = `

                <button onclick="openBill('${bill.BillID}')">

                    ชำระเงิน

                </button>

                `;


            }





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



                ${button}


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
