
$("document").ready(function(){

var stateObject = {
    Kano: {
      Nasarawa: ["Darkata", "Jirgiya", "Kawaji"],
      Fagge: ["Kwakwache", "Faggae A", "Faggae B"],
      Gazewa: ["Babawa", "Jogana", "Gawo"],
    },
    Kaduna: {
      Zaria: ["Dambo", "Gyallesu", "Kaura"],
      Kagarko: ["Jere", "Iddah", "KargarkoSouth"],
      Kachia: ["Doka", "Katari", "Awon"],
    },

    Kastina: {
      Mashi: ["Karau", "Magami", "Matazu"],
      Musawa: ["Kurkujan", "Dangani", "Kira"],
      Sandamu: ["Daneji", "Fago", "Karkaru"],
    },

    Borno: {
      Maiduguri: ["Bulabulin", "Fezan", "Gamboru"],
      Monguno: ["Kaguram", "Damakuli", "Ngurno"],
      Mafa: ["Abbari", "Limanti", "Gawa"],
    },

    Yobe: {
      Bade: ["Gwio-kura", "Katuzu", "Sarkin Hausawa"],
      Potiskum: ["Bolewa", "Hausawa", "Mamudo"],
      Damaturu: ["Bindigari", "Gabir", "Murfa Kalam"],
    },



};

window.onload = function () {
  var stateSel = document.getElementById("state"),
    countySel = document.getElementById("lga"),
    citySel = document.getElementById("ward");
    
  for (var state in stateObject) {
    stateSel.options[stateSel.options.length] = new Option(
      state,
      state
    );
  }
  stateSel.onchange = function () {
    countySel.length = 1;
    // remove all options bar first
    citySel.length = 1;
    // remove all options bar first
    if (this.selectedIndex < 1) return;
    // done
    for (var county in stateObject[this.value]) {
      countySel.options[countySel.options.length] =
        new Option(county, county);
    }
  };
  stateSel.onchange(); // reset in case page is reloaded
  countySel.onchange = function () {
    citySel.length = 1; // remove all options bar first
    if (this.selectedIndex < 1) return; // done
    var cities = stateObject[stateSel.value][this.value];
    for (var i = 0; i < cities.length; i++) {
      citySel.options[citySel.options.length] = new Option(
        cities[i],
        cities[i]
      );
    }
  };
};





var selectedRow = null

function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
}





function readFormData() {
    var formData = {};
    formData["name"] = document.getElementById("name").value;
    formData["type"] = document.getElementById("type").value;
    formData["actualStart"] = document.getElementById("duration01").value;
    formData["actualEnd"] = document.getElementById("duration02").value;
    formData["stateSel"] = document.getElementById("state").value;
    formData["countySel"] = document.getElementById("lga").value;
    formData["citySel"] = document.getElementById("ward").value;
    formData["Fixed"] = document.getElementById("strat01").value;
    formData["Outreach"] = document.getElementById("strat02").value;
    formData["Mobile"] = document.getElementById("srat03").value;
    formData["Fixed"] = document.getElementById("strat01").value;
    return formData;
}



function insertNewRecord(data) {
    var table = document.getElementById("tableSpace").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.name;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.type;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.status;
    cell4 = newRow.insertCell(4);
    cell4.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;



function resetForm() {
    document.getElementById("name").value = "";
    document.getElementById("type").value = "";
    document.getElementById("status").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("name").value = selectedRow.cells[0].innerHTML;
    document.getElementById("type").value = selectedRow.cells[1].innerHTML;
    document.getElementById("status").value = selectedRow.cells[2].innerHTML;
}

function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.name;
    selectedRow.cells[1].innerHTML = formData.type;
    selectedRow.cells[2].innerHTML = formData.status;
}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("tableSpace").deleteRow(row.rowIndex);
        resetForm();
    }
}
function validate() {
    isValid = true;
    if (document.getElementById("name").value == "") {
        isValid = false;
        document.getElementById("nameValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("nameValidationError").classList.contains("hide"))
            document.getElementById("nameValidationError").classList.add("hide");
    }
    return isValid;
}


$("button#save"). on("click", function(){
    $("#tableLine").show();   
     $("#middleText").hide();
});

function status(actualStart,  proposedStart, proposedEnd, actualEnd, dateToday = new Date() ) {
  
  // console.log("actualStart", actualStart)
  // console.log("proposedStart", proposedStart)
  // console.log("proposedEnd", proposedEnd)
  // console.log("actualEnd", actualEnd)
  // console.log("dateToday", dateToday)
  
    formData["actualStart"] = document.getElementById("duration01").value;
    formData["actualEnd"] = document.getElementById("duration02").value;



function status(actualStart,  proposedStart, proposedEnd, actualEnd) {
  
var today = new Date();
var dateToday = today.getFullYear()+'-'+(today.getMonth())+'-'+today.getDate();


  if ((actualStart < proposedStart || actualStart > proposedStart  || actualStart == proposedStart) && (actualEnd >= dateToday && actualEnd == proposedEnd))
     { return 'Ongoing'; }

  else if ((actualStart < proposedStart || actualStart > proposedStart  || actualStart == proposedStart) && (proposedEnd == actualEnd))
     {return 'Successfully Completed';  }


  else if ((actualStart < proposedStart || actualStart > proposedStart  || actualStart == proposedStart) && (proposedEnd < actualEnd))
    { return 'Extended Completion'; }

  else if ((actualStart != proposedStart) && (proposedEnd != actualEnd)) {
    return 'Failed!';  

  }
  else {
    return "Uncategorised"; 

  }
}
// actualStart,  proposedStart, proposedEnd, actualEnd
console.log(status('2021-02-21', '2021-03-01', '2021-04-22','2021-04-22'))
 
});




