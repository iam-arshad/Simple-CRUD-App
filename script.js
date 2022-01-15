// to store all the rows
var data=[];
var myForm = document.querySelector('#input-form');
var table = document.querySelector('table');

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
    // reset the form
    myForm.reset();
    e.preventDefault();
})

// ************************************Dynamically create a record(tr) with columns(td) to display in the table using ****************************
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
        editBtn.className='editRecord';
        editBtnCol.appendChild(editBtn);
        let delBtn = document.createElement('button');
        delBtn.innerText='Delete';
        delBtn.className='delRecord';
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


// add event listener to all the Edit buttons on all the records
table.addEventListener('click',function(e){
    // add an if condition to prevent event bubbling
    if(e.target.className == 'editRecord')
    {
        const recToEdit = e.target.parentElement.parentElement;

        // get the existing values of the record
        sNoOfExisRec = recToEdit.firstElementChild.innerText;
        // (we made this variable global so that the event listener of update button can use this to find the record to update )
        const nameOfExisRec = recToEdit.firstElementChild.nextElementSibling.innerText;
        const ageOfExisRec = recToEdit.firstElementChild.nextElementSibling.nextElementSibling.innerText;
        const occOfExisRec = recToEdit.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling.innerText;
        
        // prefill the form with existing values
        myForm.name.value = nameOfExisRec;
        myForm.age.value = ageOfExisRec;
        myForm.occupation.value = occOfExisRec;

    }
    e.preventDefault();
    
});


/*
Every time when a record is deleted,
to adjust the below record's serial number inorder
we just update the sNo of every remaining object in the data array
so that it will also be easy to display records in the table
*/
function updateSNo()
{
    for(let i=0;i<data.length;i++)
    {
        data[i].sNo = i+1;
    }
}


// **************************************add event listener to the delete buttons on all the records********************************
/*
Here the event lister is added to the table node for 2 reasons
1.To prevent event bubbling
2.Delete buttons will be created dynamically after loading the document(i.e.; after loading the script file)
*/
table.addEventListener('click',function(e){
        // add an if condition to prevent event bubbling
        if(e.target.className == 'delRecord')
        {
            let recToDel = e.target.parentElement.parentElement;
            let sNoOfRec = recToDel.firstElementChild.innerText;
            
            // remove that record from the data array
            data.splice(sNoOfRec-1,1);
            
            //update the SNo(in data array) & table(in the HTML) 
            updateSNo();
            displayRecords();
            
        }
        e.preventDefault();
});


// save the new data of the existing record after 'update' button is clicked
var updateBtn = document.querySelector('.updateBtn');
updateBtn.addEventListener('click',function(e){
    // get the new updated data from the form
    const updatedName = myForm.name.value;
    const updatedAge = myForm.age.value;
    const updatedOccupation = myForm.occupation.value;

    data.forEach((eachRecord)=>{
        // 'sNoOfExisRec' is global variable created in the event listener of edit buttons
        if(eachRecord.sNo == sNoOfExisRec)
        {
            eachRecord.name = updatedName;
            eachRecord.age = updatedAge;
            eachRecord.occ = updatedOccupation;
        }
    });

    // call displayRecords() to update in the html table
    displayRecords();

    // reset the form
    myForm.reset();

    e.preventDefault();
})

// adding the event listener to the cancel button after editing
var cancelEditBtn = document.querySelector('.cancelEditBtn');
cancelEditBtn.addEventListener('click',function(e){
    // remove the value of the variable sNoOfExisRec, assigned when edit button is pressed
    sNoOfExisRec = Infinity;

    // reset the form
    myForm.reset();

    e.preventDefault();
})