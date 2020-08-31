# Weathr
Mobile First Weathr app that uses open-weather api to update values. The app has City/ Country search functionality and can also search for today's weather at your geolocation. The app has animated icons and can switch between imperial and metric units.

Screen Shots:
<p align="center">
  <img src="https://user-images.githubusercontent.com/30492583/91685943-26e0b280-eb5c-11ea-9632-1bc83229455d.png">
  <img src="https://user-images.githubusercontent.com/30492583/91686338-4af0c380-eb5d-11ea-9833-5330f032f41e.png">
</p>

Work in progress.
TODO: 
 1. JS needs to be refactored.
 2. Desktop styling needs to be adjusted with media queries. (search bar is ugly)
 3. Site needs to be hosted on heroku. 
 4. Loading animation when opening app
 5. Menu and Logo currently don't do anything when you click on them.

Limitations: 
 1. API does not allow for week prediction at current cost (free)
 2. Sunset and sunrise times do not adjust based on user location. So times are in GMT without accounting for local timezone.
