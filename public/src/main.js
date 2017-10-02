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
          born: info.born,
          died: info.died,
          titles: info.titles[randTitle],
          aliases: info.aliases[randAlias],
          father: info.father,
          mother: info.mother,
          spouse: info.spouse,
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
