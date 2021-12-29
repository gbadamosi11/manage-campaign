
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
    type: 'Campaign type 3',
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
    type: 'Campaign type 3',
    startDate: '12/27/2021',
    endDate: '12/15/2021',
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
const btnShowAddCampaignPopup = document.querySelector(".add-campaign-popup");
const btnClosePopup = document.querySelector(".close-popup");

const tabButtons = document.querySelectorAll(".tabs-buttons .tab-btn");
const tabs = document.querySelectorAll(".tabs");

const hide = document.querySelectorAll(".hide");
const content = document.querySelector(".popup-content");
const saveCampaign = document.getElementById("save-campaign");
const addCampaignForm = document.getElementById("add-campaign-form");

const formInput = document.querySelectorAll('.form-input, .location-input');

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
    addCampaignToDom(campaign)
  });
}

function addCampaignToDom(campaign){
  
    campaign_content = `
                        <div class="campaign" data-id="${campaign['id']}">
                            <div class="campaign-box">
                                <span>
                                    <input type="radio">
                                    &nbsp;
                                    <span class="name">${campaign['name']}</span>
                                    <span class="date">${campaign['startDate']}</span>
                                </span>
                                <span class="type">${campaign['type']}</span>
                                <span class="status ${ campaignStatus(campaign) }">${ campaignStatus(campaign) }</span>
                            </div>
                        </div>
                        `
    campaigns_body_el.insertAdjacentHTML('beforeend', campaign_content)
}

function addCampaign(campaign){
  campaign['id'] = campaigns[campaigns.length - 1]['id'] + 1
  addCampaignToDom(campaign)
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

function campaignStatus(campaign){
  today = new Date();
  end_date = new Date(campaign['endDate'])
  start_date = new Date(campaign['startDate'])

  status = ''
  done_statuses = ['success', 'failed']
  if(today.getTime() > end_date.getTime()){
    return 'success';
    // return done_statuses[Math.floor(Math.random()*done_statuses.length)];
  }else if(today.getTime() >= start_date.getTime() && today.getTime() <= end_date.getTime()){
    return 'ongoing'
  }else{
    return 'scheduled'
  }
  
}


window.onload = function(){

  populateDropDown(states, states_el, 'State')

  lga_el.innerHTML = ''
  ward_el. innerHTML = ''


  initCampaigns(campaigns)

  saveCampaign.onclick = function(){
    
    
    let form_data = Object.fromEntries(new FormData(addCampaignForm).entries());
    console.log(form_data)

    new_campaign_data = {
        name: form_data['name'],
        type: form_data['type'],
        startDate: form_data['startDate'],
        endDate: form_data['endDate'],
        location: {
          state: form_data['state'],
          lga: form_data['lga'],
          ward: form_data['ward'],
        },
        strategy: form_data['strategy'],
        
      }

      
  // form validation
  validated = true;
  [...formInput].every(input => {
      if (input.value == "") {
        validated = false;
        return false;
      }
      return true
  })
  
  if(validated){
    addCampaign(new_campaign_data);
  }else{
    alert("validation failed")
  }
  
  }

  // // search function
  // function search(e){
  //   for(let i = 0; i < e.length; i++){
      
  //   }
  // }


  // Accordion
tabButtons.forEach(tabButton => {

  tabButton.addEventListener('click', function(e){

    e.preventDefault()
    
    let tab_id = e.target.dataset.id;
    
    tabButtons.forEach(tabButton => {
      tabButton.classList.remove('active-btn')
    })
    e.target.classList.add('active-btn');

    
    tabs.forEach(tab => {
      tab.classList.remove('active-tab')
    })

    selected_tab = document.getElementById(tab_id)
<<<<<<< HEAD
    selected_tab.classList.add('active-tab');
=======
    selected_tab.classList.add('active-tab')

    e.stopPropagation();

>>>>>>> 7d7b99ec85e1b6446845fb285eb66ffa9e05f803
  })

}) 
  

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
btnShowAddCampaignPopup.onclick = function() {
  campaign.style.display = "block";
}

btnClosePopup.onclick = function() {
  campaign.style.display = "none";
}



