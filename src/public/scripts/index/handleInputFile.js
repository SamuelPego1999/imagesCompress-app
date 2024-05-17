export async function handleInputFile(e) {
  const formData = new FormData();
  const files = e.target.files;
  const format = document.getElementById("inputSelect");
  const quality = document.getElementById("inputQuality");
  formData.append("format", format.value);
  formData.append("quality", quality.value);
  const container = document.querySelector(".files-container");
  container.innerHTML = "";
  const conprimedFiles = document.querySelector(".filesCompressed-container");

  try {
    for (let file = 0; file < files.length; file++) {
      formData.append("files[]", files[file]);
      container.innerHTML += `<tr>
        <th scope="row">${parseInt(file) + 1}</th>
        <td>${files[file].name}</td>
        <td class="state">subiendo...</td>
      </tr>`;
    }
    const req = await fetch("/compress", {
      method: "POST",
      body: formData,
    });
    const states = document.getElementsByClassName("state");
    if (req.ok) {
      for (let element of states) {
        const btnUpload = document.querySelector(".btn-upload").classList.remove("disabled")
        element.innerHTML = "archivo subido";
        element.classList.add("text-success");
      }
    } else {
      for (let element of states) {
        const btnUpload = document.querySelector(".btn-upload").classList.add("disabled")
        element.innerHTML = "error subiendo archivo";
        element.classList.add("text-danger");
      }
    }
    const res = await req.json();
    conprimedFiles.innerHTML = "";
    if (res.status == 415) {
      conprimedFiles.innerHTML = "";
    } else {
      for (let file in res) {
        conprimedFiles.innerHTML += `<tr>
        <th scope="row">${parseInt(file) + 1}</th>
        <td>${res[file]}</td>
        <td class="btn-download"><a href="filesCompressed/${
          res[file]
        }" download>download</a></td>
      </tr>`;
      }
    }
  } catch (err) {
    console.log(err);
  }
}
