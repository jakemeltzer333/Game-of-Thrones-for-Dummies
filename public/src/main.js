$(() => {
  $('.linkto').click((e) => {
    let seeMore = $(e.target).prev().text();
    console.log(seeMore);
    $.ajax({
      url: `https://anapioficeandfire.com/api/characters/?name=${seeMore}`,
      method: 'GET',
      success: (data) => {
        //console.log(data);
        const got = {
          culture: data.culture,
          titles: data.titles,
          aliases: data.aliases,
          father: data.father,
          mother: data.mother,
          allegiances: data.allegiances,
          playedBy: data.playedBy
        }
        sendToDB(got);
      }
    })
  })

  const sendToDB = got => {
    $.ajax({
      url: '/user',
      method: 'POST',
      data: got
    })
  }
})
