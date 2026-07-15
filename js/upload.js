async function uploadPayment() {


    const fileInput =
        document.getElementById("slip");



    if(!fileInput || fileInput.files.length === 0){


        alert("กรุณาเลือกสลิป");


        return;

    }



    const file =
        fileInput.files[0];



    const reader =
        new FileReader();



    reader.onload = async function(e){


        try{


            // 1. Upload รูปไป Drive

            const uploadResult =
            await postData({

                action:"uploadSlip",

                file:e.target.result,

                fileName:file.name

            });



            console.log(
                "UPLOAD RESULT",
                uploadResult
            );



            if(uploadResult.status !== "success"){


                alert(
                    "อัปโหลดสลิปไม่สำเร็จ"
                );


                return;

            }





            // 2. ดึงข้อมูลผู้ใช้

            const user =
            JSON.parse(
                localStorage.getItem("lineUser")
            );



            if(!user || !user.studentID){


                alert(
                    "ไม่พบรหัสนักศึกษา"
                );


                return;

            }





            const billId =
            localStorage.getItem("billId");



            // 3. บันทึก Payment

            const url =

                CONFIG.GAS_URL +

                "?action=savePayment" +

                "&billId=" +
                encodeURIComponent(billId) +

                "&studentId=" +
                encodeURIComponent(user.studentID) +

                "&slipFileId=" +
                encodeURIComponent(uploadResult.fileId);



            console.log(
                "SAVE PAYMENT URL",
                url
            );



            const paymentResponse =
            await fetch(url);



            const result =
            await paymentResponse.json();



            console.log(
                "PAYMENT RESULT",
                result
            );



            if(result.status === "success"){


                alert(
                    "ส่งสลิปเรียบร้อย"
                );


                window.location.href =
                "history.html";


            }
            else{


                alert(
                    result.message ||
                    "บันทึกการชำระเงินไม่สำเร็จ"
                );


            }



        }
        catch(err){


            console.error(
                "UPLOAD ERROR",
                err
            );


            alert(
                "เกิดข้อผิดพลาด\n" +
                err.message
            );


        }


    };



    reader.readAsDataURL(file);


}






// Preview รูปสลิป

window.addEventListener(
"load",
function(){


    const slip =
    document.getElementById("slip");



    if(!slip) return;



    slip.addEventListener(
    "change",
    function(){



        if(!this.files.length)
            return;



        const reader =
        new FileReader();



        reader.onload =
        function(e){



            const img =
            document.getElementById("preview");



            if(img){


                img.src =
                e.target.result;


                img.style.display =
                "block";


            }


        };



        reader.readAsDataURL(
            this.files[0]
        );



    });



});
