//console.log('Client side javascript file loaded!!!')
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne= document.querySelector('#message-one')
const messagetwo = document.querySelector('#message-two')
const messagethree = document.querySelector('#message-three')
messagetwo.textContent=''
weatherForm.addEventListener('submit',(e)=>{
  e.preventDefault()
  const location = search.value;
  //const weatherFor= 'http://localhost:3000/weather?address='+location
  fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
       if(data.error){
          messageOne.textContent='Unable to find location!!!'
          messagetwo.textContent=''
          messagethree.textContent=''
       }else{
           messageOne.textContent=''
           messagetwo.textContent=data.forecast
           //messagetwo.textContent=data.forecast.summery
           messagethree.textContent=data.location
       }
    })
  })
  console.log(location)
})