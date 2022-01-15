// to store all the rows
var data=[];

var myForm = document.querySelector('#input-form');

// add event listener to the save button to save the record
var saveBtn = myForm.querySelector('#input-form  #create-mode-flow  .saveBtn');
saveBtn.addEventListener('click',function(e){
    // get form data
    const name = myForm.name.value;
    const age = myForm.age.value;
    const occ = myForm.occupation.value;
    
    // add a new property Serial No
    const sNo = data.length+1;

    // push the recored to the data variable
    data.push({sNo:sNo,name:name,age:age,occ:occ});

    // call displayRecords() for display
    displayRecords();

    // console.table(data);
    e.preventDefault();
})

// display records in the table
var tBody = document.querySelector('tbody');
function displayRecords()
{
    //remove the previous table body
    tBody.innerHTML='';

    data.forEach((eachRecord)=>
    {
        // create DOM node for the table record
        let row = document.createElement('tr');

        // create DOM node for the table columns
        let sNo = document.createElement('td');
        let name = document.createElement('td');
        let age = document.createElement('td');
        let occ = document.createElement('td');
        let editBtnCol = document.createElement('td');
        let DelBtnCol = document.createElement('td');

        // assign values
        sNo.innerText = eachRecord.sNo;
        name.innerText = eachRecord.name;
        age.innerText = eachRecord.age;
        occ.innerText = eachRecord.occ;
        let editBtn = document.createElement('button');
        editBtn.innerText='Edit';
        editBtnCol.appendChild(editBtn);
        let delBtn = document.createElement('button');
        delBtn.innerText='Delete';
        DelBtnCol.appendChild(delBtn);

        // append the columns to the row
        row.appendChild(sNo);
        row.appendChild(name);
        row.appendChild(age);
        row.appendChild(occ);
        row.appendChild(editBtnCol);
        row.appendChild(DelBtnCol);
        
        //append rows to the table body 
        tBody.appendChild(row);
    })
}

