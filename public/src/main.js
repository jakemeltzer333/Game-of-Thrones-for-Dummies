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
        let info = data[0];
        if (seeMore === 'daenerys targaryen') {
          info = data[1];
        }
        const got = {

          culture: info.culture,
          titles: info.titles[0],
          aliases: info.aliases[0],
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
