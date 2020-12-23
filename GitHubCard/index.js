
axios
  .get("https://api.github.com/users/luisabellan")
  .then((res) => {
    // this probably returns a 200 status code
    //console.log(res)

    const name = res.data.name
    const image = res.data.avatar_url
    const userName = res.data.login
    const location = res.data.location
    const url = res.data.html_url
    const followers = res.data.followers
    const following = res.data.following
    const bio = res.data.bio
    //console.log(res.data)

    //GitHubCard()

    const info = {
      image: image,
      name: name,
      userName: userName,
      location: location,
      url: url,
      followers: followers,
      following: following,
      bio: bio
    }

   
  })
  .catch((err) => {
    // this probably returns either a 400 or 500 status code
    console.log('You hit an error: ', err);
  });




const followersArray = []



axios
  .get(`https://api.github.com/users/luisabellan`)
  .then((res) => {
    console.log(res)
    
    const name = res.data.name
    const image = res.data.avatar_url
    const userName = res.data.login
    const location = res.data.location
    const url = res.data.html_url
    const followers = res.data.followers
    const following = res.data.following
    const bio = res.data.bio
    console.log(res.data)

    //GitHubCard()
    
    const info = {
      image: image,
      name: name,
      userName: userName,
      location: location,
      url: url,
      followers: followers,
      following: following,
      bio: bio
    }

    const newGitHubCard = GitHubCard(info)
    cards.appendChild(newGitHubCard)
    


  }).catch((err) => console.log(err));

axios.get(`https://api.github.com/users/luisabellan/followers`)
  .then((res) => {
    // console.log(res.data)
    for (let i = 0; i < res.data.length; i++) {

      followersArray.push(res.data[i].login)

    }


  }).then((res) =>{
    for (let i = 0; i < followersArray.length; i++) {


      axios
        .get(`https://api.github.com/users/${followersArray[i]}`)
        .then((res) => {
          // this probably returns a 200 status code
          console.log(res)
    
          const name = res.data.name
          const image = res.data.avatar_url
          const userName = res.data.login
          const location = res.data.location
          const url = res.data.html_url
          const followers = res.data.followers
          const following = res.data.following
          const bio = res.data.bio
          console.log(res.data)
    
          //GitHubCard()
    
          const info = {
            image: image,
            name: name,
            userName: userName,
            location: location,
            url: url,
            followers: followers,
            following: following,
            bio: bio
          }
    
          const newGitHubCard = GitHubCard(info)
          cards.appendChild(newGitHubCard)
    
    
        })
        .catch((err) => {
          // this probably returns either a 400 or 500 status code
          console.log('You hit an error: ', err);
        });
    }


  })

  .catch((err) => {
   
    console.log('You hit an error: ', err);
  });

console.log(followersArray)

const cards = document.querySelector('.cards')

function GitHubCard(obj) {


  // create elements

  const newGitHubCard = document.createElement('div')
  const imageImg = document.createElement('img')
  const cardInfoDiv = document.createElement('div')
  const nameH3 = document.createElement('h3')
  const userNameP = document.createElement('p')
  const locationP = document.createElement('p')
  const profileP = document.createElement('p')
  const addressA = document.createElement('a')
  const followersP = document.createElement('p')
  const followingP = document.createElement('p')
  const bioP = document.createElement('p')

  // style elements


  newGitHubCard.classList.add('card')
  imageImg.src = obj.image
  cardInfoDiv.classList.add('card-info')
  nameH3.classList.add('name')
  nameH3.textContent = obj.name
  userNameP.classList.add('username')
  userNameP.textContent = obj.userName
  locationP.textContent = `Location: ${obj.location}`
  profileP.textContent = 'Profile:'
  addressA.href = obj.url
  addressA.textContent = obj.url
  followersP.textContent = `Followers: ${obj.followers}`
  followingP.textContent = `Following: ${obj.following}`
  bioP.textContent = `Bio: ${obj.bio}`

  // structure component

  newGitHubCard.appendChild(imageImg)
  newGitHubCard.appendChild(cardInfoDiv)
  cardInfoDiv.appendChild(nameH3)
  cardInfoDiv.appendChild(userNameP)
  cardInfoDiv.appendChild(locationP)
  cardInfoDiv.appendChild(profileP)
  cardInfoDiv.appendChild(followersP)
  cardInfoDiv.appendChild(followingP)
  cardInfoDiv.appendChild(bioP)
  profileP.appendChild(addressA)


  return newGitHubCard



}
