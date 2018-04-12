const Avatar = (position, {name, avatar}) => (
  `<h5
    id='fighter_${position}'
    data-name='${name}'
    data-avatar='${avatar}'
    class='center fighter'
   >
     ${name}
   </h5>
   <image
     class='avatar'
     src='${avatar}'
   />`
)

export default Avatar;