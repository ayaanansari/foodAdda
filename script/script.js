// on load page
$(document).ready(function() {
  var url = "https://www.themealdb.com/api/json/v1/1/filter.php?a=indian";
  var method = "GET";
  var food = new XMLHttpRequest();
  food.open(method, url);
  food.onload = function() {
    if (food.status == 200) {
      callBack("#foods", JSON.parse(food.response).meals, 8);
    }
  };
  food.send();
  //random foods on page//

  // first
  var random1 = new XMLHttpRequest();
  var randomUrl1 = "https://www.themealdb.com/api/json/v1/1/random.php";
  random1.open("GET", randomUrl1);
  random1.onload = function() {
    if (random1.status == 200) {
      callBack("#randomFoods", JSON.parse(random1.response).meals, 1);
    }
  };
  random1.send();

  // second
  var random2 = new XMLHttpRequest();
  var randomUrl2 = "https://www.themealdb.com/api/json/v1/1/random.php";
  random2.open("GET", randomUrl2);
  random2.onload = function() {
    if (random2.status == 200) {
      callBack("#randomFoods", JSON.parse(random2.response).meals, 1);
    }
  };
  random2.send();

  //third

  var random3 = new XMLHttpRequest();
  var randomUrl3 = "https://www.themealdb.com/api/json/v1/1/random.php";
  random3.open("GET", randomUrl3);
  random3.onload = function() {
    if (random3.status == 200) {
      callBack("#randomFoods", JSON.parse(random3.response).meals, 1);
    }
  };
  random3.send();
  // fourth
  var random4 = new XMLHttpRequest();
  var randomUrl4 = "https://www.themealdb.com/api/json/v1/1/random.php";
  random4.open("GET", randomUrl4);
  random4.onload = function() {
    if (random4.status == 200) {
      callBack("#randomFoods", JSON.parse(random4.response).meals, 1);
    }
  };
  random4.send();
});

// callBack Function

function callBack(location, data, dataSize) {
  var locationPlace = $(location);
  for (var i = 0; i < dataSize; i++) {
    var div = document.createElement("div");
    div.setAttribute(
      "class",
      "col-lg-3 col-md-4 col-sm-6 col-12 font-weight-bold text-center"
    );
    para = document.createElement("a");
    para.textContent = data[i].strMeal;
    para.setAttribute(
      "href",
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${data[i].idMeal}`
    );
    var img = document.createElement("img");
    imgSrc = data[i].strMealThumb;
    img.setAttribute("src", imgSrc);
    img.setAttribute("alt", "foods");
    img.setAttribute(
      "class",
      "img-fluid border border-dark rounded shadow p-1 bg-white rounded"
    );
    div.append(img);
    div.append(para);
    $(locationPlace).append(div);
    addList();
  }
}

//search function

$("#searchBtn").click(function() {
  $("#foods").empty();
  var searchInput = $("#searchForm").val();
  var link = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;
  var searchXhr = new XMLHttpRequest();
  searchXhr.open("GET", link);
  searchXhr.onload = function() {
    if (searchXhr.status == 200) {
      callBack(
        "#foods",
        JSON.parse(searchXhr.response).meals,
        JSON.parse(searchXhr.response).meals.length
      );
      $("#type").html(searchInput.toUpperCase());
    }
  };
  searchXhr.send();
});

//filter

$("#country").change(function() {
  $("#foods").empty();
  var countryValue = $("#country").val();
  var countrylink = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${countryValue}`;

  var catXhr = new XMLHttpRequest();
  catXhr.open("GET", countrylink);
  catXhr.onload = function() {
    if (catXhr.status == 200) {
      callBack(
        "#foods",
        JSON.parse(catXhr.response).meals,
        JSON.parse(catXhr.response).meals.length
      );
      $("#type").html(countryValue.toUpperCase());
    }
  };
  catXhr.send();
});

//search by letter

$(".letter").click(function() {
  $("#foods").empty();
  var letterVal = $(this).val();
  var letterLink = `https://www.themealdb.com/api/json/v1/1/search.php?f=${letterVal}`;
  var letterXhr = new XMLHttpRequest();
  letterXhr.open("GET", letterLink);
  letterXhr.onload = function() {
    if (letterXhr.status == 200) {
      callBack(
        "#foods",
        JSON.parse(letterXhr.response).meals,
        JSON.parse(letterXhr.response).meals.length
      );
      $("#type").html(`Search for "${letterVal}"`);
    }
  };
  letterXhr.send();
});

//details page
function addList() {
  document.querySelectorAll("a").forEach(function(a) {
    a.addEventListener("click", showDetail);
  });
}
function showDetail(e) {
  e.preventDefault();
  var attr = e.target.getAttribute("href");
  attr.toString();
  localStorage.setItem("href", attr);
  location.href = "/details.html";
}
