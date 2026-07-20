async function savePayment() {

    const fileInput =
    document.getElementById("slip");

    if(!fileInput || fileInput.files.length === 0){
        alert("กรุณาเลือกสลิป");
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = async function(e){

        try{

            const uploadResult =
            await postData({
                action:"uploadSlip",
                file:e.target.result,
                fileName:file.name
            });

            console.log("UPLOAD RESULT", uploadResult);

            if(uploadResult.status !== "success"){
                alert("อัปโหลดสลิปไม่สำเร็จ");
                return;
            }

            const user =
            JSON.parse(localStorage.getItem("lineUser"));

            const billId =
            localStorage.getItem("billId");

            if(!user || !user.studentID){
                alert("ไม่พบรหัสนักศึกษา");
                return;
            }

            const saveURL =
                CONFIG.GAS_URL +
                "?action=savePayment" +
                "&billId=" + encodeURIComponent(billId) +
                "&studentId=" + encodeURIComponent(user.studentID) +
                "&slipFileId=" + encodeURIComponent(uploadResult.fileId);

            const response = await fetch(saveURL);
            const result = await response.json();

            console.log("SAVE RESULT", result);

            if(result.status === "success"){
                alert("ส่งสลิปเรียบร้อย");
                window.location.replace("./history.html");
            }else{
                alert(result.message || "บันทึกไม่สำเร็จ");
            }

        }catch(err){

            console.error("UPLOAD ERROR", err);
            alert("เกิดข้อผิดพลาด\n" + err.message);

        }

    };

    reader.readAsDataURL(file);

}
