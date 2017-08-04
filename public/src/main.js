$(() => {
  $('.linkto').click((e) => {
    let seeMore = $(e.target).prev().text();
    let seeMoreId = $(e.target).prev().attr('id');
    console.log(seeMore);
    console.log('live on heroku!')
    $.ajax({
      url: `https://anapioficeandfire.com/api/characters/?name=${seeMore}`,
      method: 'GET',
      success: (data) => {
        //console.log(data);

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

  const sendToDB = (got, seeMore, seeMoreId) => {
    console.log('getting shit');
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
