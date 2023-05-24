// ********* GLOBAL VARIABLE ********
const darkLightBtn = document.querySelector('.dark-light-toggle')
const head = document.querySelector('.head')
const searchInput = document.querySelector('.search input')
const search = document.querySelector('.search')
const filterSelected = document.querySelector('.filter-selected')
const filterItem = document.querySelector('.filter-item')
const displayMain = document.querySelector('.container')
const body = document.querySelector('body')
const backbtn = document.querySelector('.btn-back')


// ********* COUNTRY DETAILS ********

// ********* FUNCTION ********
const getCountryData = async ()=>{
    try{
        const response = await fetch('data.json')
        if(!response.ok){
            throw new Error('REQUEST FAILED');  
        }
        const data = await response.json()
        return data
    }catch(error){
        displayMain.innerHTML = error
    }
}
function displayItem(items){
    const display = items.map(item=>{
        return `<article class="country">
        <img src="${item.flags.png}" alt="countryflag" class="countryflag">
        <div class="country-info">
        <h3 class="countyname">${item.name}</h3>
        <div class="population">
        <p>population:</p>
        <span>${addComma(item.population)}</span>
        </div>
        <div class="region">
        <p>region:</p>
        <span>${item.region}</span>
        </div>
        <div class="capital">
        <p>capital:</p>
        <span>${item.capital}</span>
        </div>
        </div>
        </article>`
    }).join("")
    displayMain.innerHTML = display
    displayMain.querySelectorAll('article').forEach(items=>{
        items.addEventListener('click',displayDetails)
    })
}
// ********* DISPLAY ALL COUNTRIES IN HOME ********
const displayHome = async ()=>{
    const data = await getCountryData()
    displayItem(data)
}
//********** FILTER COUNTRIES BY REGION ********
const openFilter = ()=>{
    if(!filterItem.classList.contains('show')){
        filterItem.classList.add('show')
    }else{
        filterItem.classList.remove('show')
    }
}
const filterByRegion = async (e) =>{
    filterItem.classList.remove('show')
   const data = await getCountryData()
   const region = e.target.dataset.id
   const regionItem = data.filter(item=>{
    if(item.region === region){
        return item
    }
   })
   
   if(region === "All"){
    displayItem(data)
    // filterSelected.innerHTML =` <p>Filter by Region</p>
    // <i class="fa-sharp fa-solid fa-chevron-down fa-beat"></i>`
   }
   else{
    displayItem(regionItem)
    // filterSelected.innerHTML =` <p>${region}</p>
    // <i class="fa-sharp fa-solid fa-chevron-down fa-beat"></i>`
   }
}
//**********DISPLAY FILTER ITEM BTN********
const Filterbtn = async ()=>{
    const data = await getCountryData()
    const btns = data.reduce((value,item)=>{
        if(!value.includes(item.region)){
          value.push(item.region)
        }
        return value
    },["All"])
    const btn = btns.map(item=>{
        return `<p data-id="${item}">${item}</p>`
    }).join('')
    filterItem.innerHTML = btn
    filterItem.querySelectorAll('p').forEach(item=>{
        item.addEventListener('click',filterByRegion)
    })

}

// ********* SEARCH FOR COUNTRIES********
const searchCountry = async (e)=>{
    const data = await getCountryData()
    const inputText = firstLower(e.target.value)
    const regionItem = data.filter(item=>{
        if(firstLower(item.name).indexOf(inputText) !== -1 ){
            return item
        }
       })
      if(!searchInput.value){
        displayItem(data)
        filterSelected.innerHTML =` <p>Filter by Region</p>
        <i class="fa-sharp fa-solid fa-chevron-down fa-beat"></i>`
      }
      else{
          displayItem(regionItem)
      }
      console.log(inputText)
}


// ********* DISPLAY FILTER ALPHABETIC ORDER ********
// function displayAlphabeticOrder(arr) {
  //     const sortedArr = arr.sort();
  //     for (let i = 0; i = 1; i++) {
    //      return sortedArr[i]
    //     }
    //   }
    
    // ********* DISPLAY DETAILS ********
    const displayDetails = async (e)=>{
      const countryName = e.currentTarget.querySelector('h3').textContent
      const data = await getCountryData()
      data.filter(item=>{
        if(item.name === countryName){
          // for displaying detail
          displayMain.innerHTML = `<img src="${item.flags.svg}" alt="country flag" class="detailflag" />
          <div class="countrydetail">
          <h3 class="country-name">${item.name}</h3>
          <div class="country-detail-name">
          <div class="Native-name detail">
          <p>Native Name:</p>
          <span class="light-color">${item.nativeName}</span>
          </div>
          <div class="detail-population detail">
          <p>Population:</p>
          <span class="light-color">${addComma(item.population)}</span>
          </div>
          <div class="detail-region detail">
          <p>Region:</p>
          <span class="light-color">${item.region}</span>
          </div>
          <div class="detail-subregion detail">
          <p>Sub Region:</p>
          <span class="light-color">${item.subregion}</span>
          </div>
          <div class="detail-capital detail">
          <p>Capital:</p>
          <span class="light-color">${item.capital}</span>
          </div>
          </div>
          <div class="country-current">
          <div class="detail-top detail">
          <p>Top Level Domain:</p>
          <span class="light-color">${item.topLevelDomain}</span>
          </div>
          <div class="detail-currencies detail">
          <p>Currencies:</p>
          <span class="light-color">${item.currencies[0].name}</span>
          </div>
          <div class="detail-language detail">
          <p>Languages:</p>
          <span class="light-color">
          ${item.languages.map(items=>items.name)}</span>
          </div>
          </div>
          <div class="country-relative">
          <p>Border Countries:</p>
          </div>
          </div>`
          item.borders.forEach(item=>{
            const span = document.createElement('span')
            span.textContent = item
            span.classList.add('border-name')
            document.querySelector('.country-relative').appendChild(span)
          })
        }
      })
      displayMain.classList.add('for-detail')
      document.querySelector('.search-filter').style.display = "none"
      backbtn.style.display = "block"
    }
    // *********BACK BTN ********
    const displaybtn = async ()=>{
      const data = await getCountryData()
      displayItem(data)
      displayMain.classList.remove('for-detail')
      document.querySelector('.search-filter').style.display = "flex"
      backbtn.style.display = "none"
    }
    
 // ********* DARK MODE AND LIGHT ********
    const toggle = ()=>{
        if(head.style.backgroundColor !== "var(--color-white)"){
            displayMain.querySelectorAll("article").forEach(item=>{
                item.style.backgroundColor ="var(--color-white)"
                item.style.boxShadow = '0px 0px 20px  hsl(0, 0%, 70%)'
                item.querySelector('h3').style.color = "hsl(200, 15%, 8%)"
                item.querySelectorAll('p').forEach(items=>items.style.color = "hsl(200, 15%, 8%)")
            })
            body.style.backgroundColor = "hsl(0,0%,98%)"
            head.style.backgroundColor = "var(--color-white)"
            head.style.boxShadow = ' 0px 0px 20px  hsl(0, 0%, 70%)'
            head.style.color = 'hsl(200, 15%, 8%)'
            search.style.backgroundColor = "var(--color-white)"
            search.style.boxShadow = ' 0px 0px 20px  hsl(0, 0%, 70%)'
            search.querySelector('i').style.color = "hsl(0, 0%, 52%)"
            searchInput.setAttribute('id','add')
            searchInput.style.backgroundColor = "var(--color-white)"
            searchInput.style.color = "hsl(0, 0%, 52%)"
            filterSelected.style.backgroundColor = "var(--color-white)"
            filterSelected.style.boxShadow = ' 0px 0px 20px  hsl(0, 0%, 70%)'
            filterSelected.style.color = 'hsl(200, 15%, 8%)'
            filterItem.style.backgroundColor = "var(--color-white)"
            filterItem.style.color = "hsl(200, 15%, 8%)"
            darkLightBtn.innerHTML = `<i class="fa-solid fa-moon"></i>
            <p class="toggle-txt">Light Mode</p>`
            backbtn.style.backgroundColor = "var(--color-white)"
            backbtn.style.boxShadow = ' 0px 0px 20px  hsl(0, 0%, 70%)'
            backbtn.style.color = "hsl(200, 15%, 8%)"
            displayMain.querySelector('img').style.boxShadow = '0px 0px 20px  hsl(0, 0%, 70%)'
            displayMain.querySelector('.country-name').style.color = 'hsl(200, 15%, 8%)'
            displayMain.querySelectorAll('p').forEach(item=>{
              item.style.color = 'hsl(200, 15%, 8%)'
            })
            displayMain.querySelectorAll('.border-name').forEach(item=>{
              item.style.color = 'hsl(200, 15%, 8%)'
              item.style.backgroundColor = "var(--color-white)"
              item.style.boxShadow = '0px 0px 20px  hsl(0, 0%, 70%)'
            })
        }
        else{
            displayMain.querySelectorAll("article").forEach(item=>{
                item.style.backgroundColor ="var(--dark-blue-element)"
                item.style.boxShadow = 'var(--shadow)"'
                item.querySelector('h3').style.color = "var(--color-white)"
                item.querySelectorAll('p').forEach(items=>items.style.color = "var(--color-white)")
            })
            body.style.backgroundColor = "hsl(207, 26%, 17%)"
            head.style.backgroundColor = "var(--dark-blue-element)"
            head.style.boxShadow = "var(--shadow)"
            head.style.color = 'var(--color-white)'
            search.style.backgroundColor = "var(--dark-blue-element)"
            search.style.boxShadow = "var(--shadow)"
            search.querySelector('i').style.color = "var(--color-white)"
            searchInput.removeAttribute('id','add')
            searchInput.style.backgroundColor = "var(--dark-blue-element)"
            searchInput.style.color = "var(--color-white)"
            filterSelected.style.backgroundColor = "var(--dark-blue-element)"
            filterSelected.style.boxShadow = "var(--shadow)"
            filterSelected.style.color = 'var(--color-white)'
            filterItem.style.backgroundColor = "var(--dark-blue-element)"
            filterItem.style.color = "var(--color-white)"
            darkLightBtn.innerHTML = `<i class="fa-solid fa-moon"></i>
             <p class="toggle-txt">Dark Mode</p>`
             backbtn.style.backgroundColor = "var(--dark-blue-element)"
             backbtn.style.boxShadow = 'var(--shadow)'
             backbtn.style.color = "var(--color-white)"
             displayMain.querySelector('img').style.boxShadow = 'var(--shadow)'
             displayMain.querySelector('.country-name').style.color = 'var(--color-white)'
             displayMain.querySelectorAll('p').forEach(item=>{
               item.style.color = 'var(--color-white)'
             })
             displayMain.querySelectorAll('.border-name').forEach(item=>{
               item.style.color = 'var(--color-white)'
               item.style.backgroundColor = "var(--dark-blue-element)"
               item.style.boxShadow = 'var(--shadow)'
             })
        }
    }

// ********* ADDING COMMA ********
function addComma(number) {
    const numberStr = String(number);
    let result = "";
    let digitCount = 0;
  
    for (let i = numberStr.length - 1; i >= 0; i--) {
      result = numberStr[i] + result;
      digitCount++;
  
      if (digitCount % 3 === 0 && i !== 0) {
        result = ',' + result;
      }
    }
  
    return result;
  }

  function firstLower(word){
    const words = word.split(' ');
    word = word.trim();
    // Iterate through each word and capitalize the first letter
    for (let i = 0; i < words.length; i++) {
      const currentWord = words[i];
      const capitalizedWord = currentWord.charAt(0).toUpperCase() + currentWord.slice(1);
      words[i] = capitalizedWord;
    }
  
    // Join the words back together and return the modified string
    let modifiedSentence = words.join(' ');
    return modifiedSentence;
  }


// ********* EVENT LISTENERS ********
darkLightBtn.addEventListener('click',toggle)
filterSelected.addEventListener('click',openFilter)
window.addEventListener('DOMContentLoaded',displayHome)
searchInput.addEventListener('input',searchCountry)
Filterbtn()
backbtn.addEventListener('click',displaybtn)