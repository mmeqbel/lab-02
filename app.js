'use strict';
console.log("d");
var arr=[];
function Dog(name, img, desc,key) {
  this.name = name;
  this.img = img;
  this.descreption = desc;
  this.key=key;
  arr.push(key);
  
}



Dog.prototype.render = function () {
  let section = $('.template').clone();
  $('.clearfix').append(section);
  section.find('h2').text(this.name);
  section.find('img').attr('src', this.img);
  section.find('p').text(this.descreption);
  section.removeClass('template');
  
  section.addClass(this.key);

};

function populateDogsData() {
  const ajaxSettings = {
    method: 'get',
    dataType: 'json'
  };

  $.ajax('data/page-1.json', ajaxSettings)
    .then(data => {
      data.forEach(element => {
        let jsDog = new Dog(element.title, element.image_url,element.description,element.keyword);
        jsDog.render();
      });

      renderKeywordsOption(arr);
    });
}

function renderKeywordsOption(array) {
    //console.log(array);
    var arraySet=getSet(array);
    //console.log(arraySet);
    $('document').ready(() =>{
        
      arraySet.forEach(element => {
        var option=$('<option></option>');
        option.text(element);
        option.on('click',clickHandler)
        $('#keywords').append(option); 
      });
      function clickHandler() {
        console.log(this.value);
        $('section').find('option')
        var ignordeSections=document.getElementsByTagName('section');
        for (let index = 0; index < ignordeSections.length; index++) {
            ignordeSections[index].classList.add('template');  
        }
        var selectedSection=document.getElementsByClassName(this.value);
        for (let index = 0; index < selectedSection.length; index++) {
            selectedSection[index].classList.remove('template');  
        }
       
         
    }
    $('#keywords').on('change',clickHandler);
      
    });
    

}


function getSet(array) {
    var arraySet=new Set(array);
    return Array.from(arraySet);
}
$('document').ready(populateDogsData);

