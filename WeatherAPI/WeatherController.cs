 // Essentially JS Imports. 
using Microsoft.AspNetCore.Mvc; //ASP.NET library, contains everything controller related
using System.Net.Http;
using System.Runtime.CompilerServices; //C#'s built in Library for making HTTP request. 


// * ATTRIBUTES * 
[ApiController]   	   //Tells framework this class is a controller that handles API requests
					
[Route("api/weather")] //Tell Framework what route this controller handles.
					   //Define the URL Path for our endpoint

					
								
								
								
								// *INHERITANCE* 
							//ControllerBase=Microsoft built in class
							//Contains all common functions controllers need
							// *Sending back respones, Handling errors, Returning status etc.
public class WeatherController : ControllerBase {
			

			

				//Declare a private variable called string _apiKey
			private	string _apiKey;	
				//*CONSTRUCTOR* - Runs automatically when ASP.Net creates the controller
				//Make it public so ASP.NET can access it. it must have the same name as the class its constructing for 
				//and have no string,void etc before the name
				// just public and the class name
				//The constructor asks for two parameters 
				//Iconfiguration the type of parameter, is a built in ASP.NET type that can read config files.
				//and call it configuration. 
			public WeatherController(IConfiguration configuration)
	{
				//Assign a value to _apiKey
				//Using the configuration object that ASP.NET handed in.
				// Swuare brackets with a key name reads a value from it
				// "??" = *null coalescing operator.* If left side is null use right instead 
			_apiKey = configuration ["WeatherApiKey"] ?? string.Empty;
	}

			 // * ASYNC Method GETWEATHER * 
			 //TASK = Promise. Similar too Await - This method will return a string at somepoint
			 // Methood takes 2 parameters. String, called city. 
			 [HttpGet]
			 //This Method responds to GET requests. 
			 //Httpclient is a C# TOOL for making HTTP Requests possible. Like Fetch in JS.
			 // Create instance of class using "NEW". This creates a new HTTPClient object and stores it in Client.
			 //First you have to create the client, and then use it to make a fetch.
			 //Then use the client objects GetASync method to make the fetch request. await makes this pause until the promise
			 // is completed.
	public async Task<string> GetWeather (string city)
 	{
		var client = new HttpClient();				//In C# Place the $ at the start when inserting a {variable} into a string (Interpolation)
		var response = await client.GetAsync($"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={_apiKey}&units=metric");
		
		//response.Content is the body of the response. ReadAsString - reads it as a string, similar to response.json()
		//This gives us a raw string instead of a parsed object. React can handle the pasing.
		// Response = the full HTTP Response Object. 
		//Content = property of the response object - the body of the response 
		//ReadAsStringAsync = Method belonging to Content. Read the body of the response as a string.
		var content = await response.Content.ReadAsStringAsync();

		return content;
	}
						[HttpGet("forecast")]
		public async Task<string> GetForecast (string city)
{
					
		var client = new HttpClient();
		var response = await client.GetAsync($"https://api.openweathermap.org/data/2.5/forecast?q={city}&appid={_apiKey}&units=metric");
		var content = await response.Content.ReadAsStringAsync();

		return content;
}	
}




// 1) user searches on localhost
//2) Their search is stored in the searchedCity state.
//3) the app sends the fetch request with that search to api/weather. 
//4) the c# server is listening on api/weather
//5) c# server recieves the search and runs the async method WeatherController method
//5.5) we make a method called GetWeather which expects a string called city and promises to return a TASK (Promise) thats a string. 
//6) We use httpclient to make requests possible called client and create an instance. 
//7) We then use the clients GetASync method (made available by calling the method async) to make the fetch request. The code pauses here till the fetch has been completed.
//8) Once completed we establish a var called content 
//9) That also awaits. We then take the fetch (response) look at the body of the content and read it as a String
//10)The string gets sent back to React as the response
//11)React receives it in the fetch on line 23 of App.tsx
//12)response.json() parses it from a raw string into a JavaScript object
//13)That gets stored in weatherData state
//14)React re-renders and passes it to WeatherCard as the data prop