'use strict';
let dogs = [];

function Dog(dog) {
  for (let key in dog) {
    this[key] = dog[key];
  }
}
Dog.prototype.setPageUrl = function (url) {
  this.url = url;
}
Dog.prototype.render = function () {
  let template = $('#template').html();
  return Mustache.render(template, this);
}

function populateDogsData(url) {
  dogs = [];//remove elements
  if (url == 0) {
    url = 'data/page-1.json';
  }
  const ajaxSettings = {
    method: 'get',
    dataType: 'json'
  };

  $.ajax(url, ajaxSettings)
    .then(data => {
      data.forEach(element => {
        let dog = new Dog(element);
        dog.setPageUrl(url);
        dogs.push(dog);
      });
      renderPage(dogs);
      renderKeywordsOption(url);
    });
}
function renderPage(dogs) {
 
  $(".main-container").html('');  //remove sibilings
  dogs.forEach(element => {
    var section = $('<section></section>');
    section.addClass(element.keyword);
    section.addClass("margin-lt-8");
    section.addClass("padding-ltr-8");
    section.append(element.render());
    $('.main-container').append(section);

  });

}
function renderKeywordsOption(url) {
  var keywords = [];
  for (let index = 0; index < dogs.length; index++) {
    if (dogs[index].url == url) {
      keywords.push(dogs[index].keyword);
    }//end if  
  }
  keywords = getSet(keywords);
  $('select').html('');
  var option = $('<option></option>');
  option.text('select filter');
  option.val("select filter");
  $('select').append(option);
  $('document').ready(() => {
    keywords.forEach(element => {
      option = $('<option></option>');
      option.text(element);
      option.on('click', clickHandler)
      $('select').append(option);
    });
    function clickHandler() {
      if(this.value=="select filter") return;
      //bug
      $('section').addClass('template');
      $('.' + this.value).removeClass('template');
    }
    $('select').on('change', clickHandler);
  });
}
function getSet(array) {
  var arraySet = new Set(array);
  return Array.from(arraySet);
}

$('document').ready(() => {

  $('#page1_btn').on('click', () => {
    populateDogsData('data/page-1.json');
  });
  $('#page2_btn').on('click', () => {
    populateDogsData('data/page-2.json');
  });

  $('#sortTitle_btn').on('click', () => {
    sort('title');
  });
  $('#sortHorn_btn').on('click', () => {
    sort('horns');
  });

});

function sort(sortBy) {
  function compare(a, b) {
    if (a[sortBy] < b[sortBy]) {
      return -1;
    } else if (a[sortBy] > b[sortBy]) {
      return 1;
    } else {
      return 0;
    }
  }
  dogs.sort(compare);
  //render
  //$('#select option:nth-child(1)').val();
  var filter = document.getElementById("filter").value;
  if(filter=="select filter") {
    renderPage(dogs);
    return;
  }
  renderFilterdPage(dogs, filter);//depend on selected filter
}
function renderFilterdPage(dogs,filter) {
  console.log('?')
  console.log(filter);
  console.log(dogs.length)
  $(".main-container").html('');  //remove sibilings

  dogs.forEach(element => {
    var section = $('<section></section>');
    section.addClass(element.keyword);
    section.addClass("margin-lt-8");
    section.addClass("padding-ltr-8");
    if (element.keyword!=filter) {
      section.addClass("template");
    }else{
      console.log('else')
      section.removeClass("template");
    }

    section.append(element.render());
    $('.main-container').append(section);
    
    
  });
}
/*exexutable*/
$('document').ready(populateDogsData(0));

