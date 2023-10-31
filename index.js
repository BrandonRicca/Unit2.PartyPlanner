const COHORT = '2309-FTB-ET-WEB-FT'
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`

const state = {
  parties: [],
}

const partyList = document.querySelector("#parties")

const addPartyForm = document.querySelector("#addParty")
addPartyForm.addEventListener("submit", addParty)

async function render() {
  await getParties()
  renderParties()
}
render()

async function getParties() {
  try {
    let response = await fetch(API_URL)
    let json = await response.json()

    console.log("json.data:", json.data)
    state.parties = json.data
  } catch (err) {
    console.error(error)
  }
}

function renderParties() {
  if (!state.parties.length) {
    partyList.innerHTML = "<li>No parties.</li>"
    return
  }
  
  const partyCards = state.parties.map((party) => {
    const li = document.createElement("li")
    li.innerHTML = `
    <h2>${party.name}</h2>
    <p>${party.dateTime}</p>
    <p>${party.location}</p>
    <p>${party.description}</p>
    `
    
    const deleteBtn = document.createElement("button")
    deleteBtn.innerText = "DELETE"
    deleteBtn.addEventListener("click", () => {
      deleteParty(party.id)
    })

    li.appendChild(deleteBtn)

    return li
  })
  partyList.replaceChildren(...partyCards)
}

async function addParty(event) {
  event.prevemtDefault()

  let name = addPartyForm.name.value
  let dateTime = addPartyForm.dateTime.value
  let location = addPartyForm.location.value
  let description = addPartyForm.description.value

  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      name,
      dateTime,
      location,
      description,
    }),
  })

  console.log(response)

  render()
}

async function deleteParty(id) {
  const response = await fetch(API_URL + `/${id}`, {
    method: 'DELETE',
  })

  console.log('Deleted?:', response)

  render()
}