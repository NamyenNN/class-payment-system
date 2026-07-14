async function uploadPayment() {

    const fileInput = document.getElementById("slip");

    if (fileInput.files.length === 0) {
        alert("กรุณาเลือกสลิป");
        return;
    }

    const file = fileInput.files[0];

    const reader = new FileReader();

    reader.onload = async function (e) {

        try {

            // ส่งรูปขึ้น Google Drive
            const uploadResult = await postData({

                action: "uploadSlip",

                file: e.target.result,

                fileName: file.name

            });

            if (uploadResult.status !== "success") {

                alert("อัปโหลดรูปไม่สำเร็จ");

                return;

            }

            // บันทึกข้อมูลการชำระเงิน
            const user =
                JSON.parse(localStorage.getItem("lineUser"));

            const billId =
                localStorage.getItem("billId");

            const payment = await fetch(

                CONFIG.GAS_URL +

                "?action=savePayment" +

                "&billId=" + encodeURIComponent(billId) +

                "&studentId=" + encodeURIComponent(user.studentID || "") +

                "&slipFileId=" + encodeURIComponent(uploadResult.fileId)

            );

            const result = await payment.json();

            if (result.status === "success") {

                alert("ส่งสลิปเรียบร้อย");

                window.location.href = "history.html";

            } else {

                alert(result.message);

            }

        } catch (err) {

            console.error(err);

            alert("เกิดข้อผิดพลาด");

        }

    };

    reader.readAsDataURL(file);

}


// Preview รูป
document
.getElementById("slip")
.addEventListener("change", function () {

    if (!this.files.length) return;

    const reader = new FileReader();

    reader.onload = function (e) {

        const img =
            document.getElementById("preview");

        img.src = e.target.result;

        img.style.display = "block";

    };

    reader.readAsDataURL(this.files[0]);

});
