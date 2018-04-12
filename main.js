var loaded = false;

function startFight() {
  loaded = true;
  var left = document.getElementById('left');
  var right = document.getElementById('right');
  left.className = 'left fight-box';
  right.className = 'left fight-box';
}

function pullStudents() {
  if (!loaded) {
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        var users = JSON.parse(xhr.responseText);
        var list = document.getElementById('students')
        users.forEach(function (user) {
          var li = document.createElement('li');
          li.innerText = user.name
          list.append(li);
        })
        loaded = true;
        document.getElementById('load_students').remove();
        startFight();
      }
    }
    xhr.open('GET', 'https://canvas-students.herokuapp.com/api/student_list/58', true);
    xhr.send(null);
  }
}

var button = document.getElementById('loading_zone');
button.addEventListener('click', pullStudents)