$(() => {
  $('.linkto').click((e) => {
    let seeMore = $(e.target).prev().text();
    console.log(seeMore);
    $.ajax({
      url: `https://anapioficeandfire.com/api/characters/?name=${seeMore}`,
      method: 'GET',
      success: (data) => {
        console.log(data);
      }
    })
  })

  const sendToDB = got => {
    $.ajax({
      url: '/got',
      method: 'POST',
      data: got
    })
  }
})
