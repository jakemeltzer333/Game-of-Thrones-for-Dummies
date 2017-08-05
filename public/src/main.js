$(() => {
  //create event listener that when link is clicked, the name entered previously
  //will be read and sent to the API.
  $('.linkto').click((e) => {
    let seeMore = $(e.target).prev().text();
    let seeMoreId = $(e.target).prev().attr('id');
    //Initial API call to retrieve all the data I want.
    $.ajax({
      url: `https://anapioficeandfire.com/api/characters/?name=${seeMore}`,
      method: 'GET',
      success: (data) => {

        const got = {

          culture: data[0].culture,
          titles: data[0].titles[0],
          aliases: data[0].aliases[0],
          father: data[0].father,
          mother: data[0].mother,
          allegiances: data[0].allegiances[0],
          playedBy: data[0].playedBy[0]
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
