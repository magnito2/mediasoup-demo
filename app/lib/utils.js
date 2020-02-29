import axios from 'axios';

let mediaQueryDetectorElem;

export function initialize()
{
	// Media query detector stuff.
	mediaQueryDetectorElem =
		document.getElementById('mediasoup-demo-app-media-query-detector');

	return Promise.resolve();
}

export function isDesktop()
{
	return Boolean(mediaQueryDetectorElem.offsetParent);
}

export function isMobile()
{
	return !mediaQueryDetectorElem.offsetParent;
}

export function setAuthToken(token)
{
	if (token)
	{
		// Apply authorization token to every request if logged in
		axios.defaults.headers.common['Authorization'] = token;
	}
	else
	{
		// Delete auth header
		delete axios.defaults.headers.common['Authorization'];
	}
}
