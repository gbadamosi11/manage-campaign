
const stateObject = {
  
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

let campaigns = [
  {
    id: 1,
    name: 'Kano campaign',
    type: 'Routine Immunization',
    startDate: '12/27/2021',
    endDate: '12/31/2021',
    location: {
      state: 'Kano',
      lga: 'Kano LGA',
      ward: 'KANO LGA Ward',
    },
    strategy: 'Use Mobile session',
    status: 'failed'
  },
  {
    id: 1,
    name: 'Kano campaign',
    type: 'Routine Immunization',
    startDate: '12/27/2021',
    endDate: '12/31/2021',
    location: {
      state: 'Kano',
      lga: 'Kano LGA',
      ward: 'KANO LGA Ward',
    },
    strategy: 'Use Mobile session',
    status: 'failed'
  }
]

const states = Object.keys(stateObject);

const states_el = document.getElementById('state')
const lga_el = document.getElementById('lga')
const ward_el = document.getElementById('ward')

const campaign = document.getElementById("add-campaign");
const btn = document.querySelector(".btn");
const span = document.querySelector(".close");

function populateDropDown(item_array, select_el, default_option='Select'){
    item_array.sort()
    select_el.innerHTML = ''

    option_el = document.createElement('option');
    option_el.textContent = default_option;
    option_el.value = '';
    select_el.appendChild(option_el);

    item_array.forEach(item => {
      option_el = document.createElement('option');
      option_el.textContent = item;
      option_el.value = item;
      select_el.appendChild(option_el);
    });

}

function initCampaigns(campaigns){
  campaigns.forEach(campaign => {
    console.log(campaign)
  });
}


window.onload = function(){

  populateDropDown(states, states_el, 'State')
  lga_el.innerHTML = ''
  ward_el. innerHTML = ''


  initCampaigns(campaigns)

}

states_el.onchange = function(el){

  ward_el. innerHTML = ''
  lgas = Object.keys(stateObject[states_el.value])
  populateDropDown(lgas, lga_el, 'LGA')

}

lga_el.onchange = function(el){
  
  wards = stateObject[states_el.value][lga_el.value]
  console.log(wards)
  populateDropDown(wards, ward_el, 'Ward')

}

// popup
btn.onclick = function() {
  campaign.style.display = "block";
}
span.onclick = function() {
  campaign.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == campaign) {
    campaign.style.display = "none";
  }
}