var infos = [
  { name: "ccb", friends: ["abc", "cba"] },
  { name: "kobe", friends: ["nba", "cba"] },
  { name: "james", friends: ["nba", "cba", "abc"] }
]

var filters = ["abc", "cba"]

var filterInfos = infos.filter(function(item) {
  var isFlag = true
  var friends = item.friends

  for (var filterItemEl of filters) {
    if (!friends.includes(filterItemEl)) {
      isFlag = false
      break
    }
  }
  return isFlag
})

console.log(filterInfos)

// 输出👇🏻结果
// [
//   { name: 'ccb', friends: [ 'abc', 'cba' ] },
//   { name: 'james', friends: [ 'nba', 'cba', 'abc' ] }
// ]