fetchingData();

function fetchingData(search) {
  fetch("./cd_catalog.xml")
    .then((res) => res.text())
    .then((data) => {
      // console.log(data);

      let parser = new DOMParser();
      xmlDoc = parser.parseFromString(data, "text/xml");

      if (!search) {
        createXmlTable(xmlDoc);
      }

      checkerSearchData(xmlDoc);
    });
}

function checkerSearchData(data) {
  document
    .querySelector(".js-btn-search")
    .addEventListener("click", (event) => {
      let inputSearch = document.querySelector(".js-input-search").value;
      console.log(data);
      if (inputSearch.length === 0) {
        return createXmlTable(data);
      }

      if (inputSearch.length < 4) {
        return createPushMessage();
      }

      let colMainInfoXML = data.getElementsByTagName("CD");

      for (let i = 0; i < colMainInfoXML.length; i++) {
        let titleInfo = colMainInfoXML[i].getElementsByTagName("TITLE")[0]
          .textContent;
        let artistInfo = colMainInfoXML[i].getElementsByTagName("ARTIST")[0]
          .textContent;

        if (
          artistInfo.includes(inputSearch) ||
          titleInfo.includes(inputSearch)
        ) {
          return createSearchTableXML(colMainInfoXML[i]);
        }
      }

      return createPushMessageNotExists();
    });
}

function createPushMessage() {
  let html = ``;

  html += `<div class="pushMessage">`;
  html += `<span class="pushMessage">Incorrect data entering</span>`;
  html += `</div>`;

  document.querySelector(".push").innerHTML = html;

  setTimeout(function () {
    document.querySelector(".push").innerHTML = ``;
  }, 1000);
}

function createPushMessageNotExists() {
  let html = ``;

  html += `<div class="pushMessage">`;
  html += `<span class="pushMessage">Doesn't exists</span>`;
  html += `</div>`;

  document.querySelector(".push").innerHTML = html;

  setTimeout(function () {
    document.querySelector(".push").innerHTML = ``;
  }, 1000);
}

function createSearchTableXML(data) {
  let html = ``;
  html += ` <tr>`;
  html += ` <th>Title</th>`;
  html += `<th>Artist</th>`;
  html += ` <th>Country</th>`;
  html += ` <th>Company</th>`;
  html += `<th>Price</th>`;
  html += `<th>Year</th>`;
  html += `</tr>`;
  html += `<tr>`;
  html += `<td> ${data.getElementsByTagName("TITLE")[0].textContent}</td>`;
  html += `<td> ${data.getElementsByTagName("ARTIST")[0].textContent}</td>`;
  html += `<td> ${data.getElementsByTagName("COUNTRY")[0].textContent}</td>`;
  html += `<td> ${data.getElementsByTagName("COMPANY")[0].textContent}</td>`;
  html += `<td> ${data.getElementsByTagName("PRICE")[0].textContent}</td>`;
  html += `<td> ${data.getElementsByTagName("YEAR")[0].textContent}</td>`;
  html += `</tr>`;
  document.querySelector("table").innerHTML = html;
}

function createXmlTable(data) {
  let html = ``;
  html += ` <tr>`;
  html += ` <th>Title</th>`;
  html += `<th>Artist</th>`;
  html += ` <th>Country</th>`;
  html += ` <th>Company</th>`;
  html += `<th>Price</th>`;
  html += `<th>Year</th>`;
  html += `</tr>`;
  let colMainTag = data.getElementsByTagName("CD");
  for (let i = 0; i < colMainTag.length; i++) {
    html += `<tr>`;
    html += `<td> ${
      colMainTag[i].getElementsByTagName("TITLE")[0].textContent
    }</td>`;
    html += `<td> ${
      colMainTag[i].getElementsByTagName("ARTIST")[0].textContent
    }</td>`;
    html += `<td> ${
      colMainTag[i].getElementsByTagName("COUNTRY")[0].textContent
    }</td>`;
    html += `<td> ${
      colMainTag[i].getElementsByTagName("COMPANY")[0].textContent
    }</td>`;
    html += `<td> ${
      colMainTag[i].getElementsByTagName("PRICE")[0].textContent
    }</td>`;
    html += `<td> ${
      colMainTag[i].getElementsByTagName("YEAR")[0].textContent
    }</td>`;
    html += `</tr>`;
  }

  document.querySelector("table").innerHTML = html;
}
