import Avatar from './Avatar';

class App {
  constructor() {
    this.state = {
      loaded: false,
      students: [],
    }
  }

  componentDidMount() {
    const leftFighter = document.getElementById('left');
    const rightFighter = document.getElementById('right');
    leftFighter.addEventListener('click', () => {
      this.winner('left')
    })

    rightFighter.addEventListener('click', () => {
      this.winner('right')
    })
  }

  winner = (position) => {
    const label = document.getElementById('winner');
    const fighter = document.getElementById(`fighter_${position}`)
    const data = fighter.dataset;
    const {name, avatar} = data;
    const student = {name, avatar}
    this.students.push(student)
    label.innerHTML = `Winner: ${data.name}`;
    if (students.length !== 1) {
      const fighting = this.selectStudents();
      this.placeFighters(fighting);
    } else {
      const avatar = Avatar(position, student)
      const div = document.createElement('div')
      div.className = 'winner'
      div.innerHTML = avatar;
      const left = document.getElementById('left');
      const right = document.getElementById('right');
      const fightZone = document.getElementById('fight_zone')
      left.remove();
      right.remove();
      this.fightZone.append(div);
    }
  }

  renderStudents = () => {
    var list = document.getElementById('students');
    list.innerHTML = null;
    this.students.forEach(({name}) => {
      var li = document.createElement('li')
      li.innerText = name;
      list.append(li)
    })
  }

  sample = () => {
    var index = Math.floor(Math.random() * this.students.length)
    const student = this.students[index];
    this.students.splice(index, 1)
    return student;
  }

  selectStudents = () => {
    const left = this.sample();
    const right = this.sample();
    this.renderStudents();
    return [left, right]
  }

  placeFighters = (fighting) => {
    const [leftFighter, rightFighter] = fighting;
    const left = Avatar('left', leftFighter);
    const right = Avatar('right', rightFighter);
    const leftBox = document.getElementById('left');
    const rightBox = document.getElementById('right');
    leftBox.innerHTML = left;
    rightBox.innerHTML = right;
  }

  startFight = () => {
    this.loaded = true;
    const left = document.getElementById('left')
    const right = document.getElementById('right')
    left.className = 'left fight-box';
    right.className = 'left fight-box';
    const fighting = this.selectStudents();
    this.placeFighters(fighting);
  }

  pullStudents() {
    const {students, loaded} = this.state
    if (!loaded) {
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = () => {
        if (xhr.readyState == XMLHttpRequest.DONE) {
          this.setState({students: JSON.parse(xhr.responseText)})
          const list = document.getElementById('students')
          this.students.forEach(({name}) => {
            var li = document.createElement('li')
            li.innerText = name
            list.append(li);
          })
          this.startFight();
          this.componentDidMount()
        }
      }
      var url = 'https://canvas-students.herokuapp.com/api/student_list/58'
      xhr.open('GET', url, true);
      xhr.send()
    }
  }

  render() {
    let app = document.getElementById('app');
    let {students, loaded} = this.state;
    const html = `
    <img src="https://blog.flamingtext.com/blog/2018/04/12/flamingtext_com_1523549800_305821859.gif" border="0" alt="Logo Design by FlamingText.com"
        title="Logo Design by FlamingText.com">
    <div id="loading_zone" class="left">
      ${ !loaded && '<label>Load Students</label>'}
      <ul id="students">
        ${ students.map(student =>
        `<li>${user.name}</li>`
      )}
      </ul>
    </div>
    <div id="fight_zone" class="left">
    <h2 id="winner" class="green center"></h2>
      <div id="left">
      </div>
      <div id="right">
      </div>
    </div>
  `

    app.innerHTML = null;
    app.innerHTML = html;
  }
}

const app = new App();
app.render();
app.pullStudents();