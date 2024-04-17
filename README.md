<h1>Password:adminn</h1>
<p>This project is a web application built with Node.js and Express, designed to manage a collection of anime and movies. It includes features for user authentication, user profiles, and admin capabilities.</p>
<h2>Installation</h2>
<p>To run this project locally, follow these steps:</p>
<ol>
    <li>
        <p>Clone the repository:</p>
        <pre><code>git clone https://github.com/Bekzat158/web2_assig4.git</code></pre>
        <p>This command will create a local copy of the repository on your machine.</p>
    </li>
    <li>
        <p>Navigate to the project directory:</p>
        <pre><code>cd &lt;project-directory&gt;</code></pre>
    </li>
    <li>
        <p>Install dependencies:</p>
        <pre><code>npm install</code></pre>
    </li>
    <li>
        <p>Run the application:</p>
        <pre><code>npm start</code></pre>
    </li>
</ol>
<h2>Project Structure</h2>
<p>The project structure is as follows:</p>
<pre><code>.
├── app.js
├── models
│   ├── anime.js
│   ├── item.js
│   ├── movie.js
│   └── user.js
├── package.json
├── package-lock.json
├── public
│   ├── logo.jpg
│   └── styles.css
├── README.md
├── routes
│   ├── admin.js
│   ├── anime.js
│   ├── history.js
│   ├── index.js
│   ├── language.js
│   ├── login.js
│   ├── logout.js
│   ├── movie.js
│   ├── profile.js
│   └── register.js
├── translations
│   ├── en.json
│   └── ru.json
├── utils
│   ├── middleware.js
│   └── validation.js
└── views
    ├── admin.ejs
    ├── anime.ejs
    ├── footer.ejs
    ├── header.ejs
    ├── history.ejs
    ├── index.ejs
    ├── login.ejs
    ├── movie.ejs
    ├── profile.ejs
    └── register.ejs
</code></pre>
<ul>
    <li><strong>app.js</strong>: Entry point of the application.</li>
    <li><strong>models/</strong>: Directory containing Mongoose models for anime, movie, and user data.</li>
    <li><strong>public/</strong>: Directory for static assets such as images and stylesheets.</li>
    <li><strong>routes/</strong>: Directory containing route handlers for different parts of the application.</li>
    <li><strong>utils/</strong>: Directory containing utility functions, including authentication and validation.</li>
    <li><strong>README.md</strong>: This file, providing an overview of the project and instructions for setup.</li>
</ul>
<h2>Middleware (auth.js)</h2>
<p>The <code>auth.js</code> middleware provides functions for user authentication and authorization.</p>
<ul>
    <li>
        <p><strong>verifyToken</strong>: Verifies the JWT token present in the request cookies. If the token is valid, it sets <code>userId</code> and <code>username</code> in the request object and calls the next middleware. If the token is invalid or missing, it redirects the user to the login page.</p>
    </li>
    <li>
        <p><strong>redirectToHomeIfLoggedIn</strong>: Checks if a user is already logged in by verifying the JWT token. If the token is present and valid, it redirects the user to the home page. If not, it allows the request to proceed to the next middleware.</p>
    </li>
    <li>
        <p><strong>ifAdmin</strong>: Verifies the JWT token and checks if the user is an admin. If the user is an admin, it allows the request to proceed to the next middleware. Otherwise, it returns a 403 Forbidden error.</p>
    </li>
</ul>
<h2>API Endpoints (anime.js and movie.js)</h2>
<p>The <code>anime.js</code> and <code>movie.js</code> files contain API endpoints for fetching anime and movie data from external APIs and storing them in the database.</p>
<h3>anime.js</h3>
<ul>
    <li><strong>GET /anime</strong>: Renders the anime page with an empty animeData array.</li>
    <li><strong>POST /anime</strong>: Handles the POST request to search for anime data. It queries the Jikan API (<code>http://api.jikan.moe/v4/anime</code>) with the search query provided in the request body. It then saves the retrieved anime data to the database, associating it with the user's ID. Finally, it renders the anime page with the retrieved anime data.</li>
</ul>
<h3>movie.js</h3>
<ul>
    <li><strong>GET /movie</strong>: Renders the movie page with an empty movieData array.</li>
    <li><strong>POST /movie</strong>: Handles the POST request to search for movie data. It queries The Movie Database API (<code>https://api.themoviedb.org/3/search/movie</code>) with the search query provided in the request body. It then saves the retrieved movie data to the database, associating it with the user's ID. Finally, it renders the movie page with the retrieved movie data.</li>
</ul>
<p>These APIs utilize JWT tokens for authentication and authorization, ensuring that only authenticated users can access them.</p>
<h2>Usage</h2>
<p>To use the anime and movie APIs:</p>
<ol>
    <li>Make sure the server is running (<code>npm start</code>).</li>
    <li>Send a POST request to <code>/anime</code> with a search query in the request body to search for anime data.</li>
    <li>Send a POST request to <code>/movie</code> with a search query in the request body to search for movie data.</li>
</ol>
<p>The APIs will handle the requests, retrieve data from the external APIs, store them in the database, and render the corresponding pages with the retrieved data.</p>
<h2>Features</h2>
<ul>
    <li>User authentication with JWT tokens.</li>
    <li>Role-based access control (admin and regular user).</li>
    <li>CRUD operations for anime and movies.</li>
    <li>User profile management.</li>
</ul>
<h2>Dependencies</h2>
<ul>
    <li><a target="_new">Express</a>: Web application framework for Node.js.</li>
    <li><a target="_new">Mongoose</a>: MongoDB object modeling tool.</li>
    <li><a target="_new">jsonwebtoken</a>: JSON Web Token implementation for Node.js.</li>
    <li><a target="_new">bcryptjs</a>: Library for hashing passwords.</li>
    <li><a target="_new">dotenv</a>: Loads environment variables from a <code>.env</code> file.</li>
    <li><a target="_new">body-parser</a>: Middleware for parsing incoming request bodies.</li>
    <li><a target="_new">cookie-parser</a>: Middleware for parsing cookies in Express.</li>
    <li><a target="_new">ejs</a>: Embedded JavaScript templates for rendering views.</li>
    <li><a target="_new">axios</a>: Promise-based HTTP client for making requests.</li>
</ul>
<h2>Contributing</h2>
<p>Contributions are welcome! Feel free to open issues or pull requests for any improvements or bug fixes.</p>
<h2>License</h2>
<p>This project is licensed under the MIT License - see the <a target="_new">LICENSE</a> file for details.</p>
