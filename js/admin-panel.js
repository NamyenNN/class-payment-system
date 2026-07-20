let currentTab = "pending";



window.onload = function(){

    loadPayments();

};





async function loadPayments(){


    try{


        const res = await fetch(

            CONFIG.GAS_URL +

            "?action=getAllPayments"

        );



        const result =
        await res.json();



        const list =
        document.getElementById("paymentList");



        list.innerHTML = "";



        if(result.status !== "success"){


            list.innerHTML =
            "<p>ไม่พบข้อมูล</p>";

            return;

        }





        const payments = result.payments.filter(payment => {



            // รอยืนยัน

            if(currentTab === "pending"){


                return payment.Status !== "ผ่าน";


            }




            // ยืนยันแล้ว

            if(currentTab === "approved"){


                return payment.Status === "ผ่าน";


            }



            return true;


        });







        if(payments.length === 0){


            list.innerHTML =

            "<p>ไม่มีรายการ</p>";


            return;


        }







        payments.forEach(payment => {



            list.innerHTML += `


            <div class="bill-card">


                <h3>
                ${payment.PaymentID}
                </h3>


                <p>
                Bill : ${payment.BillID}
                </p>


                <p>
                Student : ${payment.StudentID}
                </p>


                <p>
                Status : ${payment.Status}
                </p>



                <a href="https://drive.google.com/file/d/${payment.SlipFileID}/view"
                target="_blank">

                    เปิดสลิป

                </a>



                <br><br>



                ${
                currentTab === "pending"

                ?

                `

                <button onclick="updateStatus('${payment.PaymentID}','ผ่าน')">

                    ✅ ผ่าน

                </button>



                <button onclick="updateStatus('${payment.PaymentID}','ไม่ผ่าน')">

                    ❌ ไม่ผ่าน

                </button>

                `

                :

                ""

                }



            </div>


            `;



        });



    }
    catch(err){

        console.error(err);

    }


}






async function updateStatus(paymentId,status){


    const res = await fetch(

        CONFIG.GAS_URL +

        "?action=updatePayment" +

        "&paymentId=" +

        encodeURIComponent(paymentId) +

        "&status=" +

        encodeURIComponent(status)

    );



    const result =

    await res.json();



    alert(result.message);



    loadPayments();


}






function changeTab(tab){


    currentTab = tab;


    loadPayments();


}
