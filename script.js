
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
    id: 2,
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
const campaigns_body_el = document.getElementById('campaigns-body')

const campaign = document.getElementById("add-campaign");
const btn = document.querySelector(".btn");
const close = document.querySelector(".close");

const button = document.querySelectorAll(".button");
const hide = document.querySelectorAll(".hide");
const content = document.querySelector(".popup-content");

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

    campaign_content = `
                        <div class="campaign">
                            <div class="campaign-box">
                                <span>
                                    <input type="radio">
                                    &nbsp;
                                    <span class="name">Mike Emmanuel</span>
                                    <span class="date">25/7/2015</span>
                                </span>
                                <span class="type">Rountine</span>
                                <span class="status">Ongoing</span>
                            </div>
                        </div>
                        `

    campaigns_body_el.insertAdjacentHTML('beforeend', campaign_content)

  });
}

function addCampaign(campaign){
  campaign['id'] = campaigns[campaigns.length - 1]['id'] + 1
  campaigns.push(campaign)
}

function deleteCampaign(campaign_id, multiple=false){
  campaigns =  campaigns.filter(campaign => {
      return multiple == true ? campaign_id.includes(campaign['id']) : campaign['id'] != campaign_id;
  }); 
}

function updateCampaign(campaign_id, data){
  campaign_index =  campaigns.findIndex(campaign => {
      return campaign['id'] == campaign_id;
  });

  Object.keys(data).forEach(key => {
    campaigns[campaign_index][key] = data[key]
  })

}




window.onload = function(){

  populateDropDown(states, states_el, 'State')
  lga_el.innerHTML = ''
  ward_el. innerHTML = ''


  initCampaigns(campaigns)

  addCampaign({
    id: 2,
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
  });

  deleteCampaign(2)

  console.log(campaigns);

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
close.onclick = function() {
  campaign.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == campaign) {
    campaign.style.display = "none";
  }
}

// Accordion

content.addEventListener('click', function(e){
  const id = e.target.dataset.id;
  if(id){
            button.forEach(function(btn){
                      btn.classList.remove('active');
                      e.target.classList.add('active');
            });
            hide.forEach(function(article){
                      article.classList.remove('active')
            });
            const element = document.getElementById(id);
            element.classList.add('active');
  };
})