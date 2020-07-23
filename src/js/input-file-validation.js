const checkFileType = (fileName) => {
    const splitedFileName = fileName.split(".");
    const type = splitedFileName[splitedFileName.length - 1];
    if (type.toLowerCase() === "jpg" || type.toLowerCase() === "png") {

        return false;
    }

    return true;
};

export default function checkFile(event) {
    const target = event.target || event.srcElement;
    const fileName = target.files[0].name;
    const fileImputForm = document.getElementById("customFile");
    const fileImputLabel = document.getElementById("customFileLabel");
    
    if (checkFileType(fileName)) {
        fileImputForm.value = "";
        fileImputLabel.innerHTML = "";
        alert("Nieprawidłowy format pliku. Dopuszczalny format obrazu: jpg, png.");
    } else {
        fileImputLabel.innerHTML = fileName;
    }
}
