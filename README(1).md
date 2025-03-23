🎵 Music App Library
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

A full-stack MERN (MongoDB, Express, React, Node) application that allows users to register, log in, and create their own personal music playlist. Includes Last.fm integration for music search and album lookup.


🚀 Features
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

🔐 User Auth: Register and login with JWT token-based authentication.

🎶 Add/Edit Songs: Authenticated users can add, edit, delete songs in their library.

🔍 Search Music: Use Last.fm API to search songs and albums.

❤️ Favorites: Mark songs as favorites with a live toggle button.

🎷 Playlist Dashboard: View, manage, and organize all your saved songs.


🛠 Tech Stack
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Frontend: React, React Router, Axios, Toastify

Backend: Node.js, Express, MongoDB, JWT

APIs: Last.fm (no auth required)


🔐 User Flow
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Register → Login → Dashboard

Add / Edit / Delete songs

Favorite songs ❤️

Search music (by track) or albums

Logout 🔓



📆 API Integration
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Last.fm Search Example

/api/search?query=drake

Returns artist, track title, and cover art
