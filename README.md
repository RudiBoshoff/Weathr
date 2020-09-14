# Weathr

Mobile First Weathr app that uses open-weather api to update values. The app has City/ Country search functionality and can also search for today's weather at your geolocation. The app has animated icons and can switch between imperial and metric units.

Screen Shots:

<p align="center">
  <img src="https://user-images.githubusercontent.com/30492583/91685943-26e0b280-eb5c-11ea-9632-1bc83229455d.png">
  <img src="https://user-images.githubusercontent.com/30492583/91686338-4af0c380-eb5d-11ea-9833-5330f032f41e.png">
  <img src="https://user-images.githubusercontent.com/30492583/93089929-546d4600-f69c-11ea-8732-c8add92cb614.png">
  <img src="https://user-images.githubusercontent.com/30492583/93090025-78308c00-f69c-11ea-972d-7a919a898212.png">
</p>

Work in progress.
TODO:

1.  Site needs to be hosted on heroku.
2.  Loading animation when opening app
3.  Logo currently doesn't do anything when you click on it.
4.  Implement slow loading of numbers (animation).
5.  Change app colour based on weather and time (rain : blue, snow: white, night: dark etc.)

Limitations:

1.  API does not allow for week prediction at current cost (free)
2.  Sunset and sunrise times do not adjust based on user location. So times are in GMT without accounting for local timezone.
