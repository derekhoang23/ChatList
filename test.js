
var what = function(email) {
  if (email[0] === '@' || email[email.length -1 ] === '@' || !email.includes('@')) {
    return false
  }

  return email.split('@').map(word => {
    console.log(word)
    return word;
  }).some(parts => {
    return /[A-Za-z0-9.]/.test(parts)
  })
}

var checkPhone = function(phone) {
  if (!/[0-9- ]/) {
    return false;
  }


  return phone.split('').map(val => {
    return parseInt(val)
  }).filter(num => {
    return !isNaN(num)
  }).length >= 6;
}
