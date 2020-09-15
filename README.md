# Weathr

Mobile First Weathr app that uses open-weather api to update values. The app has City/ Country search functionality and can also search for today's weather at your geolocation. The app has animated icons and can switch between imperial and metric units.

Screen Shots:

<p align="center">
  <img src="https://user-images.githubusercontent.com/30492583/93090745-7fa46500-f69d-11ea-8bfa-d7d2a535dbfe.png">
  <img src="https://user-images.githubusercontent.com/30492583/93091116-fd687080-f69d-11ea-8fe3-68dbbb7df181.png">
  <img src="https://user-images.githubusercontent.com/30492583/93089929-546d4600-f69c-11ea-8732-c8add92cb614.png">
  <img src="https://user-images.githubusercontent.com/30492583/93090025-78308c00-f69c-11ea-972d-7a919a898212.png">
</p>

Work in progress.
TODO:

1.  Site needs to be hosted on heroku. (implemented) [Weathr](https://rudi-boshoff-weathr.herokuapp.com/)
2.  Loading animation of numbers (implemented)
3.  Logo currently doesn't do anything when you click on it.
4.  Change app colour based on weather and time (rain : blue, snow: white, night: dark etc.)

Limitations:

1.  API does not allow for week prediction at current cost (free)
2.  Sunset and sunrise times do not adjust based on user location. So times are in GMT without accounting for local timezone.
