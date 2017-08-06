# Game-of-Thrones-for-Dummies

## Game of Thrones for Dummies

## Wireframes
### Main page to login and register
![index](./project2wireframes/IMG_0807.JPG)

### Register and Login Screens
![register](./project2wireframes/IMG_0808.JPG)

### Main Character List Index
![character-index](./projectwireframes/IMG_0815.JPG)

### Add a character to your list
![got-add](./project2wireframes/IMG_0811.JPG)

### Single Character View
![got-single](./projectwireframe/IMG_0816.JPG)

## What is Game of Thrones For Dummies?

Game of Thrones is the most popular show on television beloved by millions
around the world. There is a group of fans like myself who obsessively keep
track of every character, house, and event that happens throughout the show
and beyond, but there are many more casual viewers who tune in for the spectacle
but struggle to remember all of the countless characters that have 
appeared on the show through its near 7-season run. 

My app will allow these casual viewers and those who have not seen the show who are ready to dip their toes in to do so at their own pace. If there's a character from the show that you're unclear on or just want to learn more about, all you'll have to do is just type in their name and from there, you will have key information associated with that character that you will be able to view, such as titles, aliases, their allegiance, and the name of the actor who portrays them in the show.

The app will also have user authentication, so that each user's list will be password
protected and they can keep their knowledge (or lack thereof) private.

## How Does Game of Thrones For Dummies Work?

When you go to [Game of Thrones For Dummies](gameofthronesfordummies.herokuapp.com),
You will be prompted to register if you are a new user or log in if you are a returning
user. For new users, click on 'Register Here' and you will be guided to a registration page
where you will provide a username, email address, and password. Upon completion, you will
automatically be directed to your very own character list, which, because you've just created
a new account, will have no names on it (yet). If you are a returning user, you can click
'Login Here' from the homepage and it will take you to a screen where you will be prompted to
enter your username and password. Doing so will take you to your character page. No actions
after the home, register, and login screens can take place unless the user is logged in.

Once the user is logged in, he or she can now add a character. Just click on the 'Add Character'
link and a new screen will pop up with an input for the user to type in a character name (i.e. Jon Snow). Click 'Add Character Name' and the user will be redirected to their character list page, where that character's name will now be prominently displayed. 

Under the name will be two prompts: one to see more info and the other to delete the character. When a user clicks 'See More Info', the app will make a call to the API of Ice and Fire and when the page appears, there will be new information associated with that character listed under their name. When the user wants to return to his or her main character page from this view, just click 'See All Characters', and the character index view will show up with the names of every character the user has typed in so far. 

If the user is either confident they know enough about the character or he or she does not want too many characters in their list at once, each character has a 'Delete' button that will remove that character's name from the page and the 'See More Info' and 'Delete' values that appear with each character name will no longer be on the page.

When a user wants to log out, there is a link at the bottom of the page stating 'Until Next Time..The Night is Dark and Full of Terrors.' Users can click on that link and they will be return to the app's home screen where they can log in again if they choose.

## Technologies Used

I set up the functionality of this app primarily through Node.js and the Express framework. I also used several node package modules (npms) to help with certain actions the app needed to run as well as for user authentication.

### List of NPMs used in this project
    `bcryptjs`
    `body-parser`
    `cookie-parser`
    `dotenv`
    `ejs`
    `express`
    `express-session`
    `isomorphic-fetch`
    `method-override`
    `morgan`
    `passport`
    `passport-local`
    `pg-promise`

In order to make my API calls, I used both the `Ajax` and `fetch` methods. I used ajax to make my initial API call to return all the information I wanted for each character. However, some of these character traits, such as allegiances, required another API call to be made to retrieve the name of that allegiance. For this, I used fetch, setting up helper functions retrieve that data and render it on the page as a string instead of as a link, which would've been the case if I had just made my ajax call.

I used CSS for styling the page and instead of HTML, I used 'EJS' to provide the layout of my pages. This allowed me to use simple loops and if statements to control which data I wanted to render on each page.

## Code Examples

Below is my inital `Ajax` call to the API to retrieve the data I wanted. The API takes a character name as a value when you enter it, so I made and event listener on the 'See More Info' link where I would target the text of the previous element, in this case the character name, and that would be entered into the url I wanted to make the API call to.

```
$(() => {
  //create event listener that when link is clicked, the name entered previously
  //will be read and sent to the API.
  $('.linkto').click((e) => {
    let seeMore = $(e.target).prev().text().toLowerCase();
    let seeMoreId = $(e.target).prev().attr('id');

    //Initial API call to retrieve all the data I want.
    $.ajax({
      url: `https://anapioficeandfire.com/api/characters/?name=${seeMore}`,
      method: 'GET',
      success: (data) => {
        //in the API, Daenerys from the show is the second entry in an array of
        //characters with that name.
        //So I created an if statement so that when user
        //enters her name, her info will appear instead of the first Daenerys.
        let info = data[0];
        if (seeMore === 'daenerys targaryen') {
          info = data[1];
        }
        //since titles and aliases are arrays in API, setting these
        //variables allow me to pull a random value from the array of
        //titles/aliases.
        let randTitle = Math.round(Math.random() * info.titles.length);
        let randAlias = Math.round(Math.random() * info.aliases.length);

        const got = {

          culture: info.culture,
          titles: info.titles[randTitle],
          aliases: info.aliases[randAlias],
          father: info.father,
          mother: info.mother,
          allegiances: info.allegiances[0],
          playedBy: info.playedBy[0]
        }
        sendToDB(got, seeMore, seeMoreId);
      }
    })
  })
  //function that allows the data retrieved from the API to render on the
  //single page.
  const sendToDB = (got, seeMore, seeMoreId) => {
    $.ajax({
      url: `/got/${seeMoreId}`,
      method: 'POST',
      data: got,
      success: () => {
        console.log('success!');
      }
    }).done (data => {
      window.location = `/got/${seeMoreId}`;
    })
  }
})
```    
I also did a couple of other things to improve the quality of the data returned by the API. I noticed that when I searched 'Daenerys Targaryen' in the API, it returned two characters with that name, and the one from the show was the second character returned from the API. Each API entry is a large object located within a larger array, so in this case the Daenerys I wanted was the second element of the array, and since I'm anticipating many users typing in her name to learn more about her, I created a simple if statement to say that if a user types in her name, when the API makes its call, it will return `index[1]` of that array.

Another interesting thing about the API is that each character's titles and aliases are located in their own arrays, and since some of these values are more book-specific than show-specific, I decided I wanted to randomize which title or alias is returned for any given character, so I created variables to do just that and added them as the index number I wanted to call for the title and alias of each character that will appear on the page.

I also wanted to show one of my helper functions I made with `fetch`:

```
function getAllegiance (req, res, next) {
  let allegiance = req.body.allegiances;

  fetch(allegiance)
    .then(fetchRes => {
      return fetchRes.json();
    })
    .then(jsonFetchRes => {
      console.log(jsonFetchRes);
      res.locals.allegiance = jsonFetchRes.name;
      next();
    }).catch(err => {
      console.log(err);
      next();
    })
  }
```
As I mentioned earlier, in the API, a character's allegiance (i.e. house) appears as a link to another entry in the API. So what I did here was fetch the url of that allegiance that comes from the `Ajax` call and feed that into the fetch. From there, I only want the name of that house, so when it renders as `res.locals.allegiance`, when I make that API call, I only want to return the name of that allegiance and show that instead of the API link.

### Possible Future Fixes or Additions

In terms of my app's functionality, it does exactly what I want it to do. The only bummer is that the API a little limited in what it can search for. It can only search for characters, houses, and books and not for specific events or regions or places. If it could do that, my app would be incredible! The API is also not updated for season 7 of the show, so some of the information is either absent or not up to date, so I wish that either the creator of the API would go back in and update some of the info for the show's biggest characters or I would go in and do it myself (it is open source, after all). It would be nice if I could target specific information in the API for certain characters. Also, it would be awesome to provide links to their more detailed character pages on the Wiki of Ice and Fire if a user wants to learn more than just the basics of their character.

### Downloading the Code & Running it on Localhost

Clone this github repo to your terminal then open it up in your text editor (Sublime, Atom, VS, etc.). If you do not have the npms used in this app's `package.json` file, run `npm install --save` and then list all of the npms as they are written in the `package.json` in this repo in your terminal. Once that is done, type `npm run dev` in your terminal and in your browser, type `localhost:3000` in the url search bar and you can begin your journey towards understanding Game of Thrones just a little better.
