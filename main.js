$( document ).ready(function() {
  // Helper Function to Extract Access Token for URL
 const getUrlParameter = (sParam) => {
   let sPageURL = window.location.search.substring(1),////substring will take everything after the https link and split the #/&
       sURLVariables = sPageURL != undefined && sPageURL.length > 0 ? sPageURL.split('#') : [],
       sParameterName,
       i;
   let split_str = window.location.href.length > 0 ? window.location.href.split('#') : [];
   sURLVariables = split_str != undefined && split_str.length > 1 && split_str[1].length > 0 ? split_str[1].split('&') : [];
   for (i = 0; i < sURLVariables.length; i++) {
       sParameterName = sURLVariables[i].split('=');
       if (sParameterName[0] === sParam) {
           return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
       }
   }
};

 // Get Access Token
 const accessToken = getUrlParameter('access_token');
// AUTHORIZE with Spotify (if needed)
  let client_id = 'e21b3fc22a1e49c18ac957e87f56b5ce';
  let redirect_uri = 'https%3A%2F%2Fak2296.github.io%2FDiggaren2';


  const redirect = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&redirect_uri=${redirect_uri}`;
  // Don't authorize if we have an access token already
  if(accessToken == null || accessToken == "" || accessToken == undefined){
    window.location.replace(redirect);
  }


$("#channel").on("change",function(){
    //Getting Value
    let selValue = $("#channel").val();
    let id=''

        if (selValue==1){
        id=132
        }
        else if(selValue==2){
        id=163

        }
        else if(selValue==3){
        id=164
        }

    let url= "https://api.sr.se/api/v2/playlists/rightnow?channelid="+id;

    console.log(url)
    $.get(url).then((data) => {
        
        console.log(data)
        currentSongTitle = data.getElementsByTagName("title")[1];
        previousSongTitle = data.getElementsByTagName("title")[0];
        nextSongTitle = data.getElementsByTagName("title")[2];
        currentSongArtist = data.getElementsByTagName("artist")[1];
        previousSongArtist = data.getElementsByTagName("artist")[0];
        nextSongArtist = data.getElementsByTagName("artist")[2];
        console.log(currentSongTitle, currentSongArtist);
        console.log(previousSongTitle, previousSongArtist);
        console.log(nextSongTitle, nextSongArtist);

        $('#currentSongTitle').html(currentSongTitle); 
        $('#currentSongArtist').html(currentSongArtist); 
        $('#previousSongTitle').html(previousSongTitle); 
        $('#previousSongArtist').html(previousSongArtist); 
        $('#nextSongTitle').html(nextSongTitle); 
        $('#nextSongArtist').html(nextSongArtist); 


    });



$("#current").click(function(){

  let raw_search_query = $('#currentSongTitle').text();
  let search_query = encodeURI(raw_search_query);
  console.log(raw_search_query);
  console.log(search_query);
  $.ajax({
    url: `https://api.spotify.com/v1/search?q=${search_query}&type=track`,
    type: 'GET',
    headers: {
        'Authorization' : 'Bearer ' + accessToken
    },
    success: function(data) {
      // Load our songs from Spotify into our page
      let num_of_tracks = data.tracks.items.length;
      let count = 0;
          // Max number of songs is 12
          const max_songs = 12;
          while(count < max_songs && count < num_of_tracks){
            // Extract the id of the FIRST song from the data object
            let id = data.tracks.items[count].id;
            // Constructing two different iframes to embed the song
            let src_str = `https://open.spotify.com/embed/track/${id}`;
            let iframe = `<div class='song'><iframe src=${src_str} frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe></div>`;
            let parent_div = $('#song_'+ count);
            parent_div.html(iframe);
            count++;
          }
    }
  });
});

$("#previous").click(function(){
    alert("You have clicked inside previous!");
    });
$("#next").click(function(){
    alert("You have clicked inside next!");
    });

  });
});