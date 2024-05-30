export function handleDragEnter(e) {
  e.preventDefault();
}

export function handleDragOver(e) {
  e.preventDefault();
}
export async function handleDrop(e) {
  e.preventDefault();
  const formData = new FormData();
  const files = e.dataTransfer.files;
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
        <td>${
          Math.floor(files[file].size / 1024) < 1000
            ? Math.floor(files[file].size / 1024) + "KB"
            : parseFloat(files[file].size / 1024 / 1024).toFixed(1) + "MB"
        }</td>
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
        const btnUpload = document
          .querySelector(".btn-upload")
          .classList.remove("disabled");
        element.innerHTML = "archivo subido";
        element.classList.add("text-success");
      }
    } else {
      for (let element of states) {
        const btnUpload = document
          .querySelector(".btn-upload")
          .classList.add("disabled");
        element.innerHTML = "error subiendo archivo";
        element.classList.add("text-danger");
      }
    }
    const res = await req.json();
    console.log(res)
    conprimedFiles.innerHTML = "";
    if (res.status == 415) {
      conprimedFiles.innerHTML = "";
    } else if(Array.isArray(res[0])) {
      for (let file in res) {
        conprimedFiles.innerHTML += `<tr>
        <th scope="row">${parseInt(file) + 1}</th>
        <td>${res[file][0]}</td>
        <td>${Math.floor(res[file][1] / 1024) < 1000
              ? Math.floor(res[file][1] / 1024) + "KB"
              : parseFloat(res[file][1] / 1024 / 1024).toFixed(1) + "MB"}
        
        </td>
        <td class="btn-download"><a href="filesCompressed/${
          res[file][0]
        }" download>download</a></td>
      </tr>`;
      }
    }
    else {
      conprimedFiles.innerHTML += `<tr>
      <th scope="row">1</th>
      <td>${res[0]}</td>
      <td>${Math.floor(res[1] / 1024) < 1000
            ? Math.floor(res[1] / 1024) + "KB"
            : parseFloat(res[1] / 1024 / 1024).toFixed(1) + "MB"}
      
      </td>
      <td class="btn-download"><a href="filesCompressed/${
        res[0]
      }" download>download</a></td>
    </tr>`;
    }
  } catch (err) {
    console.log(err);
  }
}
