# URL Shortener

* Client-Side
	* Visual Studio Code: latest version
	* Built using React library
	* services/ApiConfiguration is store the endpoint of the Web API

* Server-side
	* Visual Studio 2022 Version
	* .Net 6 with C# 10
	* SSSMS and SqlServer

	* For data storage part you can use InMemoryDatabase or SqlServer Database

	* To configure the InMemoryDatabase make sure that in the UrlShortener.WebApi\appsettings.json the "UseInMemoryDatabase" option is set on true,
	  but if you want to use the SqlServer database, set the "UseInMemoryDatabase" on false. For the SqlServer the migrations are already in the project, just run the Update-	   Database command to apply them.
