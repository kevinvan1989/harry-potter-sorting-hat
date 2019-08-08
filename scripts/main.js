let username = ''
let department = "";
let deptInfo = {
    info: '',
    logo: ''
};

const closingBtn = $('.closing');

const showDeptInfo = (data) =>{
  switch(data){
    case "Hufflepuff": 
          deptInfo.info = 'Hufflepuff lorem ipsum';
          deptInfo.logo = '<img src="./img/houses/hufflepuff.png" alt="" class="dept-logo">';
          break;

    case "Slytherin":
          deptInfo.info = 'Slytherin lorem ipsum';
          deptInfo.logo = '<img src="./img/houses/slytherin.png" alt="" class="dept-logo">';
          break;

    case "Ravenclaw":
          deptInfo.info = 'Ravenclaw lorem ipsum';
          deptInfo.logo = '<img src="./img/houses/ravenclaw.png" alt="" class="dept-logo">';
          break;

    case "Gryffindor":
          deptInfo.info = 'Gryffindor lorem ipsum';
          deptInfo.logo = '<img src="./img/houses/gryffindor.png" alt="" class="dept-logo">';
          break;
  }

  console.log(deptInfo.info, deptInfo.logo);
}

const getName = () => {
  username = $("input[name='username']").val();
  return username;
}

const getDepartment = () =>{
  $.get('https://www.potterapi.com/v1/sortingHat')
  .done(function(data){
    $('.lds-default').toggleClass();

    department = data;
    $('.overlay-contentbox').show();
    showDeptInfo(department);
    $('.department-logo').append(deptInfo.logo);

    $('#user').text(username);
    $('.house-name').text(department);
    }
  );
};

// SECTION INPUT
// on click
$('button#sortFirst').on('click', function(e){
  e.preventDefault();

  // Show loading screen
  
  if(getName() != ""){
    $('.overlay-screen').toggleClass('hide-onload');
    getDepartment();
    $("input[name='username']").val('');
    $('#intro').toggleClass('hide-onload');
  }else{
    alert("no valid name")
  }
});

// on enter / return
$("input[name='username']").keydown(function(e){
  if(e.which === 13){
    $('button#sortFirst').click();
  }
});

// SECTION EXIT 
// on click
closingBtn.on('click', function(e){
  $('.department-logo .dept-logo').remove();
  $('.overlay-screen').toggleClass('hide-onload');
  $('#intro').toggleClass('hide-onload');

})