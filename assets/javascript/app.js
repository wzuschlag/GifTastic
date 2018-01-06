// Load page
$(document).ready(function()
{
	// Initial array of topics to use
	var topics = ['Superman', 'Wonderwoman', 'Batman', 'Spiderman', 'Catwoman', 'Thor', 'Black Widow', 'Joker', 'Harley Quinn'];
	// Function for creating the buttons and html data needed 
	function createButtons()
	{
		// Start by clearing any of the topics & Buttons added in prior operation
		$('#topicsView').empty();

		// Loop through the array var topics to start program
		for (var i = 0; i < topics.length; i++)
		{
			// Generate a button for each topic in the topics array in html format
			var z = $('<button type="button">');
			z.addClass('topicsButton btn btn-primary');   
			z.attr('data-name', topics[i]);
			z.text(topics[i]); 
			$('#topicsView').append(z); 
		}
	}

	// Function to create the html to display the still image giphys
	function displayGif()
	{
		$('#gifView').empty();
		var topic = $(this).attr('data-name');

		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=B1spPx9YkcBmoa3km0mtVQKa1E0qSYul&limit=10";

		$.ajax({
			url: queryURL, 
			method: 'GET'
		})
		.done(function(response){

			// Creates a generic div to hold the topics
			var topicDiv = $('<div class="topicImage">');

			for (i=0; i < response.data.length; i++) 
			{
				var stillImage = response.data[i].images.fixed_width_still.url;	//Get the still url to use			
				var playImage = response.data[i].images.fixed_width.url; //Get the animate url to use
				var rating = response.data[i].rating; //Get the rating of the giphy
				// Creates an html element to display the rating and the images
				var pRating = $("<p>").text("Rating: " + rating.toUpperCase());
				var image = $("<img>").attr({"src":stillImage,"playsrc":playImage,"stillsrc":stillImage});								
				topicDiv.append(pRating, image);
				image.addClass('clickedGif');
				$('#gifView').append(topicDiv);
			}	
		});
	}

	function flipGif()
	{
		var playImage = $(this).attr('playsrc'); // Starts playing the Image 
		var stopImage = $(this).attr('stillsrc'); // Stops playing the Image
		
		if ($(this).attr('playsrc') == $(this).attr('src')) //flip between start/stop images
		{
			$(this).attr('src', stopImage);
		}
		else
		{
			$(this).attr('src', playImage);
		}
	}

	// This function manages the add new topic button when clicked
	$('#addTopic').on('click', function(){

		// This line gets the input from the textbox
		var topic = $('#topicInput').val().trim();

		if (topic != "")
		{			
			topics.push(topic); // Add topic entered in the textbox into the topics array
			$('#topicInput').val("");
		}
		else
		{
			$('#topicInput').attr("placeholder", "Enter a topic to search.");
		}
		createButtons();
	});
	// This calls the createButtons() function
	createButtons();
	// Generic function for displaying the Gif and animation
	$(document).on('click', '.topicsButton', displayGif);
	$(document).on('click', '.clickedGif', flipGif);

});

