const elem_1 = document.querySelector(".left");

elem_1.addEventListener("click", function (e) {
  const _target = e.target.value;
  if (_target == "once") {
    console.log("oдин раз");
    document.querySelector(".daily").classList.add("hide");
    document.querySelector(".weekly").classList.add("hide");
    document.querySelector(".monthly").classList.add("hide");
  } else if (_target == "daily") {
    console.log("Ежедневно");
    document.querySelector(".daily").classList.remove("hide");
    document.querySelector(".weekly").classList.add("hide");
    document.querySelector(".monthly").classList.add("hide");
  } else if (_target == "weekly") {
    document.querySelector(".daily").classList.add("hide");
    document.querySelector(".weekly").classList.remove("hide");
    document.querySelector(".monthly").classList.add("hide");
  } else if (_target == "monthly") {
    document.querySelector(".daily").classList.add("hide");
    document.querySelector(".weekly").classList.add("hide");
    document.querySelector(".monthly").classList.remove("hide");
  }
});



const elem_4 = document.getElementById("radio_monthly");
const elem_5 = document.getElementById("radio_monthly2");

elem_4.addEventListener("click", closeDateList);
elem_5.addEventListener("click", closeINdate);
function closeDateList(e) {
  console.log(document.getElementById("radio_monthly").checked);
  if (document.getElementById("radio_monthly").checked) {
    // document.getElementById("radio_monthly").checked = false;
    // document.getElementById("selectID2").disabled = true
    // document.getElementById("selectID3").disabled = true
    elem_5.checked = false
    document.querySelector(".internal_date").classList.remove("hide");
    document.getElementById("input_id_2").classList.add("hide");
    document.getElementById("_id1251_2").classList.add("hide");
    document.getElementById("_id1251").classList.remove("hide");

    document.getElementById("_id1257-2").classList.add("hide");
    document.getElementById("_id1257").classList.remove("hide");
  } else {
    // document.getElementById("radio_monthly").checked = true;
    document.querySelector(".internal_date").classList.add("hide");
    document.getElementById("input_id_2").classList.remove("hide");
  }
}
function closeINdate(){
  elem_4.checked = false
  // document.getElementById("selectID2").disabled = false
  // document.getElementById("selectID3").disabled = false
  document.querySelector(".internal_date").classList.add("hide");
  document.getElementById("_id1251").classList.add("hide");
  document.getElementById("input_id_2").classList.remove("hide");
  document.getElementById("_id1251_2").classList.remove("hide");
  document.getElementById("_id1257").classList.add("hide");
  document.getElementById("_id1257-2").classList.remove("hide");
}
document.getElementById("sendJsonBTN").addEventListener("click", sentJSON)

function getValueFromID(id){
  return document.getElementById(id)
}

function sentJSON(){
  if(getValueFromID("date").value=="" || getValueFromID("time").value==""){
    alert("Не заполнена дата/время начала операции")
    return
  }

  let allFreq = document.querySelectorAll(".freq");
  let msg
  for(let i=0; i<allFreq.length; i++){    
    if(allFreq[i].checked){
      if(allFreq[i].value=="once"){
        msg={}
        msg["VM_name"]=getValueFromID("selectID").value
        msg["date"]=getValueFromID("date").value
        msg["time"]=getValueFromID("time").value
        msg["frequency"]="once"
      }else if(allFreq[i].value=="daily"){
        if(getValueFromID("quantity").value==""){
          alert("Не заполнено поле/поля: 'Повторять каждые:'")
        }
        msg={}
        msg["VM_name"]=getValueFromID("selectID").value
        msg["date"]=getValueFromID("date").value
        msg["time"]=getValueFromID("time").value
        msg["every"]=getValueFromID("quantity").value
        msg["frequency"]="everyday"
      }else if(allFreq[i].value=="weekly"){
        
        msg={}  
        msg["VM_name"]=getValueFromID("selectID").value
        msg["frequency"]="everyweek"
        msg["date"]=getValueFromID("date").value
        msg["time"]=getValueFromID("time").value
        msg["every"]=getValueFromID("quantityWeek").value
        msg["days"]=[]

        document.querySelectorAll(".weeklyDay").forEach(el=>{
          if(el.checked){
            msg["days"].push(el.name)
          }
        })
        if(!msg["days"].length){
          alert("Не указаны дни недели")
          return
        }
      }else if(allFreq[i].value=="monthly"){
        msg={} 
        msg["frequency"]="monthly"
        msg["VM_name"]=getValueFromID("selectID").value
        msg["date"]=getValueFromID("date").value
        msg["time"]=getValueFromID("time").value
        msg["month"]=[]
        let allMonth = document.querySelectorAll(".mon_check");
        allMonth.forEach(el=>{
          if(el.checked){
            msg["month"].push(el.name)
          }
          
        })
        if(!msg["month"].length){
            alert("Не заполнены поля: Месяц операции")
            return
          }
        let isInDays = getValueFromID("radio_monthly")
        
        if(isInDays.checked){
          msg["days"]=[]
          document.querySelectorAll(".dataMonthly").forEach(el=>{
            if(el.checked){
              msg["days"].push(el.name)
            }
          })
          if(!msg["days"].length){
            alert("Не заполнены поля: Дни/В")
            return
          }
        }


        let isInWeeks = getValueFromID("radio_monthly2")
        if(isInWeeks.checked){
          msg["in"]=[]
          document.querySelectorAll(".inWeek").forEach(el=>{
            if(el.checked){
              msg["in"].push(el.name)
            }
            
          })
          msg["daysOfweek"]=[]
          document.querySelectorAll(".dayWeekMonthly").forEach(el=>{
            if(el.checked){
              msg["daysOfweek"].push(el.name)
            }
          })
          if(!msg["in"].length || !msg["daysOfweek"].length){
            alert("Не заполнены поля: Дни/В")
            return
          }

        }
        if(!isInWeeks.checked && !isInDays.checked){
          alert("Не заполнены поля: Дни/В")
          return
        }
      }
      let str= JSON.stringify(msg);
      
      let blob = new Blob([str], {type:"text/plain"})
      let link = document.createElement("a")
      link.setAttribute("href", URL.createObjectURL(blob))
      link.setAttribute("download", "save_JSON")
      link.click()


    }
  }
}


let btnSelectAllWeekDays = document.getElementById("all_days")

function selectAllDays(){
  if(btnSelectAllWeekDays.checked ==true){
    document.querySelectorAll(".dayWeekMonthly").forEach(el=>el.checked = true)
  }else{
    document.querySelectorAll(".dayWeekMonthly").forEach(el=>el.checked = false)
  }
}

document.getElementById("all_days").addEventListener("click", selectAllDays)


