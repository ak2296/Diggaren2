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

    let url= "http://api.sr.se/api/v2/playlists/rightnow?channelid="+id;

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

});

$("#current").click(function(){



});
$("#previous").click(function(){
    alert("You have clicked inside previous!");
    });
$("#next").click(function(){
    alert("You have clicked inside next!");
    });


    const accessToken = getUrlParameter('access_token');

    // AUTHORIZE with Spotify (if needed)
    // *************** REPLACE THESE VALUES! *************************
    let client_id = 'e21b3fc22a1e49c18ac957e87f56b5ce';
    // Use the following site to convert your regular url to the encoded version:
    // https://www.url-encode-decode.com/
    let redirect_uri = 'https%3A%2F%2Fak2296.github.io%2FDiggaren2'; // GitHub Pages URL or whatever your public url to this app is
    // *************** END *************************

    const redirect = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&redirect_uri=${redirect_uri}`;
    // Don't authorize if we have an access token already
    if(accessToken == null || accessToken == "" || accessToken == undefined){
      window.location.replace(redirect);
    }
    let raw_search_query = $('#search-text').val();
    let search_query = encodeURI(raw_search_query);
    // Make Spotify API call
    // Note: We are using the track API endpoint.
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
    }); // End of Spotify ajax call